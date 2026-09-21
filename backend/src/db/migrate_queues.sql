-- ═══════════════════════════════════════════════════════════════════════════
-- MediFlow AI — Queue Management Migration (Module 5)
-- Creates queues table with RLS, triggers, and constraints
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────
-- 1. QUEUES TABLE
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.queues (
  id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  queue_number            INTEGER     NOT NULL,
  patient_id              UUID        NOT NULL REFERENCES public.patients(id) ON DELETE RESTRICT,
  appointment_id          UUID        NOT NULL REFERENCES public.appointments(id) ON DELETE RESTRICT,
  doctor_id               UUID        NOT NULL REFERENCES public.doctors(id) ON DELETE RESTRICT,
  department_id           UUID        NOT NULL REFERENCES public.departments(id) ON DELETE RESTRICT,
  queue_date              DATE        NOT NULL DEFAULT CURRENT_DATE,
  status                  TEXT        NOT NULL DEFAULT 'waiting'
                          CHECK (status IN ('waiting', 'called', 'in_consultation', 'completed', 'cancelled', 'no_show')),
  priority                TEXT        NOT NULL DEFAULT 'normal'
                          CHECK (priority IN ('normal', 'priority')),
  check_in_time           TIMESTAMPTZ DEFAULT now(),
  called_at               TIMESTAMPTZ,
  consultation_started_at TIMESTAMPTZ,
  completed_at            TIMESTAMPTZ,
  created_at              TIMESTAMPTZ DEFAULT now(),
  updated_at              TIMESTAMPTZ DEFAULT now(),
  
  -- Unique constraint: queue_number is unique per department per date
  CONSTRAINT unique_queue_number_per_dept_date UNIQUE (department_id, queue_date, queue_number),
  
  -- Prevent duplicate queue entries for same appointment
  CONSTRAINT unique_appointment_queue UNIQUE (appointment_id)
);

-- ─────────────────────────────────────────────────────────────────────────
-- 2. INDEXES FOR PERFORMANCE
-- ─────────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_queues_patient_id      ON public.queues (patient_id);
CREATE INDEX IF NOT EXISTS idx_queues_appointment_id  ON public.queues (appointment_id);
CREATE INDEX IF NOT EXISTS idx_queues_doctor_id       ON public.queues (doctor_id);
CREATE INDEX IF NOT EXISTS idx_queues_department_id   ON public.queues (department_id);
CREATE INDEX IF NOT EXISTS idx_queues_queue_date      ON public.queues (queue_date);
CREATE INDEX IF NOT EXISTS idx_queues_status          ON public.queues (status);
CREATE INDEX IF NOT EXISTS idx_queues_priority        ON public.queues (priority);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_queues_dept_date_status 
  ON public.queues (department_id, queue_date, status);
CREATE INDEX IF NOT EXISTS idx_queues_doctor_date_status 
  ON public.queues (doctor_id, queue_date, status);
CREATE INDEX IF NOT EXISTS idx_queues_dept_date_number 
  ON public.queues (department_id, queue_date, queue_number);

-- ─────────────────────────────────────────────────────────────────────────
-- 3. AUTO-UPDATE TIMESTAMP TRIGGER
-- ─────────────────────────────────────────────────────────────────────────
DROP TRIGGER IF EXISTS set_queues_updated_at ON public.queues;
CREATE TRIGGER set_queues_updated_at
  BEFORE UPDATE ON public.queues
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ─────────────────────────────────────────────────────────────────────────
-- 4. QUEUE NUMBER GENERATION FUNCTION
-- Thread-safe queue number generation per department per date
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION generate_queue_number(
  p_department_id UUID,
  p_queue_date DATE
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_next_number INTEGER;
BEGIN
  -- Lock row to prevent concurrent generation
  -- Get the maximum queue number for this department and date
  SELECT COALESCE(MAX(queue_number), 0) + 1
  INTO v_next_number
  FROM public.queues
  WHERE department_id = p_department_id
    AND queue_date = p_queue_date
  FOR UPDATE;
  
  RETURN v_next_number;
END;
$$;

-- ─────────────────────────────────────────────────────────────────────────
-- 5. VALIDATE DOCTOR-DEPARTMENT CONSISTENCY
-- Ensure queue's doctor belongs to queue's department
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION validate_queue_doctor_department()
RETURNS TRIGGER AS $$
DECLARE
  v_doctor_department_id UUID;
BEGIN
  SELECT department_id INTO v_doctor_department_id
  FROM public.doctors WHERE id = NEW.doctor_id;
  
  IF v_doctor_department_id IS NULL THEN
    RAISE EXCEPTION 'Doctor with id % does not exist', NEW.doctor_id;
  END IF;
  
  IF v_doctor_department_id <> NEW.department_id THEN
    RAISE EXCEPTION 'Doctor % does not belong to department %', NEW.doctor_id, NEW.department_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validate_queue_doctor_department ON public.queues;
CREATE TRIGGER trg_validate_queue_doctor_department
  BEFORE INSERT OR UPDATE OF doctor_id, department_id ON public.queues
  FOR EACH ROW
  EXECUTE FUNCTION validate_queue_doctor_department();

-- ─────────────────────────────────────────────────────────────────────────
-- 6. VALIDATE APPOINTMENT CONSISTENCY
-- Ensure queue's appointment matches patient, doctor, department
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION validate_queue_appointment()
RETURNS TRIGGER AS $$
DECLARE
  v_apt_patient_id UUID;
  v_apt_doctor_id UUID;
  v_apt_department_id UUID;
BEGIN
  SELECT patient_id, doctor_id, department_id
  INTO v_apt_patient_id, v_apt_doctor_id, v_apt_department_id
  FROM public.appointments
  WHERE id = NEW.appointment_id;
  
  IF v_apt_patient_id IS NULL THEN
    RAISE EXCEPTION 'Appointment with id % does not exist', NEW.appointment_id;
  END IF;
  
  IF v_apt_patient_id <> NEW.patient_id THEN
    RAISE EXCEPTION 'Queue patient_id does not match appointment patient_id';
  END IF;
  
  IF v_apt_doctor_id <> NEW.doctor_id THEN
    RAISE EXCEPTION 'Queue doctor_id does not match appointment doctor_id';
  END IF;
  
  IF v_apt_department_id <> NEW.department_id THEN
    RAISE EXCEPTION 'Queue department_id does not match appointment department_id';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validate_queue_appointment ON public.queues;
CREATE TRIGGER trg_validate_queue_appointment
  BEFORE INSERT OR UPDATE OF appointment_id, patient_id, doctor_id, department_id ON public.queues
  FOR EACH ROW
  EXECUTE FUNCTION validate_queue_appointment();

-- ─────────────────────────────────────────────────────────────────────────
-- 7. ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────────────────────────────────
ALTER TABLE public.queues ENABLE ROW LEVEL SECURITY;

-- ── PATIENT POLICIES ──

-- Patients can view their own queue entries
DROP POLICY IF EXISTS "Patients can view own queue" ON public.queues;
CREATE POLICY "Patients can view own queue"
  ON public.queues FOR SELECT
  USING (
    patient_id IN (
      SELECT p.id FROM public.patients p
      INNER JOIN public.users u ON p.user_id = u.id
      WHERE u.clerk_user_id = auth.jwt() ->> 'sub'
    )
  );

-- Patients cannot create, update, or delete queue entries directly
-- (Queue creation happens via backend API with check-in authorization)

-- ── DOCTOR POLICIES ──

-- Doctors can view queue entries assigned to them
DROP POLICY IF EXISTS "Doctors can view own queue" ON public.queues;
CREATE POLICY "Doctors can view own queue"
  ON public.queues FOR SELECT
  USING (
    doctor_id IN (
      SELECT d.id FROM public.doctors d
      INNER JOIN public.users u ON d.user_id = u.id
      WHERE u.clerk_user_id = auth.jwt() ->> 'sub'
    )
  );

-- Doctors can update status of their queue entries
DROP POLICY IF EXISTS "Doctors can update own queue" ON public.queues;
CREATE POLICY "Doctors can update own queue"
  ON public.queues FOR UPDATE
  USING (
    doctor_id IN (
      SELECT d.id FROM public.doctors d
      INNER JOIN public.users u ON d.user_id = u.id
      WHERE u.clerk_user_id = auth.jwt() ->> 'sub'
    )
  );

-- ── STAFF POLICIES ──

-- Staff can view all queue entries
DROP POLICY IF EXISTS "Staff can view all queues" ON public.queues;
CREATE POLICY "Staff can view all queues"
  ON public.queues FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE clerk_user_id = auth.jwt() ->> 'sub' 
      AND role = 'staff'
    )
  );

-- Staff can create queue entries (check-in patients)
DROP POLICY IF EXISTS "Staff can create queues" ON public.queues;
CREATE POLICY "Staff can create queues"
  ON public.queues FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE clerk_user_id = auth.jwt() ->> 'sub' 
      AND role = 'staff'
    )
  );

-- Staff can update queue entries
DROP POLICY IF EXISTS "Staff can update queues" ON public.queues;
CREATE POLICY "Staff can update queues"
  ON public.queues FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE clerk_user_id = auth.jwt() ->> 'sub' 
      AND role = 'staff'
    )
  );

-- ── ADMIN POLICIES ──

-- Admins can view all queue entries
DROP POLICY IF EXISTS "Admins can view all queues" ON public.queues;
CREATE POLICY "Admins can view all queues"
  ON public.queues FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE clerk_user_id = auth.jwt() ->> 'sub' 
      AND role = 'admin'
    )
  );

-- Admins can create queue entries
DROP POLICY IF EXISTS "Admins can create queues" ON public.queues;
CREATE POLICY "Admins can create queues"
  ON public.queues FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE clerk_user_id = auth.jwt() ->> 'sub' 
      AND role = 'admin'
    )
  );

-- Admins can update queue entries
DROP POLICY IF EXISTS "Admins can update queues" ON public.queues;
CREATE POLICY "Admins can update queues"
  ON public.queues FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE clerk_user_id = auth.jwt() ->> 'sub' 
      AND role = 'admin'
    )
  );

-- Admins can delete queue entries
DROP POLICY IF EXISTS "Admins can delete queues" ON public.queues;
CREATE POLICY "Admins can delete queues"
  ON public.queues FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE clerk_user_id = auth.jwt() ->> 'sub' 
      AND role = 'admin'
    )
  );

-- ─────────────────────────────────────────────────────────────────────────
-- 8. APPEND TO SCHEMA.SQL
-- ─────────────────────────────────────────────────────────────────────────
-- After running this migration, append the queues table definition to
-- backend/src/db/schema.sql under "Module 5: Queue Management"

COMMENT ON TABLE public.queues IS 'Module 5: Queue Management - Patient queue tracking after check-in';
COMMENT ON COLUMN public.queues.queue_number IS 'Sequential number per department per date (e.g., 1, 2, 3...)';
COMMENT ON COLUMN public.queues.status IS 'Current queue status: waiting, called, in_consultation, completed, cancelled, no_show';
COMMENT ON COLUMN public.queues.priority IS 'Queue priority: normal or priority (assigned by staff)';
COMMENT ON CONSTRAINT unique_queue_number_per_dept_date ON public.queues IS 'Ensures queue_number is unique within department and date';
COMMENT ON CONSTRAINT unique_appointment_queue ON public.queues IS 'Prevents duplicate queue entries for same appointment';
