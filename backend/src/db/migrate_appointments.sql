-- ═══════════════════════════════════════════════════════════════════════════
-- MediFlow AI — Module 4: Appointment Management Migration
-- Creates appointments table with proper constraints, indexes, RLS, and conflict prevention
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────
-- 1. CREATE APPOINTMENT NUMBER SEQUENCE
-- ─────────────────────────────────────────────────────────────────────────
CREATE SEQUENCE IF NOT EXISTS appointment_number_seq START WITH 100001;

-- ─────────────────────────────────────────────────────────────────────────
-- 2. CREATE APPOINTMENTS TABLE
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.appointments (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_number  TEXT        UNIQUE NOT NULL DEFAULT ('APT-' || LPAD(nextval('appointment_number_seq')::TEXT, 6, '0')),
  patient_id          UUID        NOT NULL REFERENCES public.patients(id) ON DELETE RESTRICT,
  doctor_id           UUID        NOT NULL REFERENCES public.doctors(id) ON DELETE RESTRICT,
  department_id       UUID        NOT NULL REFERENCES public.departments(id) ON DELETE RESTRICT,
  appointment_date    DATE        NOT NULL,
  start_time          TIME        NOT NULL,
  end_time            TIME        NOT NULL,
  appointment_type    TEXT        NOT NULL DEFAULT 'consultation'
                      CHECK (appointment_type IN ('consultation', 'follow_up', 'routine_checkup')),
  reason              TEXT,
  status              TEXT        NOT NULL DEFAULT 'scheduled'
                      CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
  notes               TEXT,
  created_by          UUID        REFERENCES public.users(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT valid_time_range CHECK (start_time < end_time)
);

-- ─────────────────────────────────────────────────────────────────────────
-- 3. CREATE INDEXES FOR QUERY OPTIMIZATION
-- ─────────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id       ON public.appointments (patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id        ON public.appointments (doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_department_id    ON public.appointments (department_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date             ON public.appointments (appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status           ON public.appointments (status);
CREATE INDEX IF NOT EXISTS idx_appointments_appointment_number ON public.appointments (appointment_number);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_date      ON public.appointments (doctor_id, appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_date     ON public.appointments (patient_id, appointment_date);

-- ─────────────────────────────────────────────────────────────────────────
-- 4. AUTO UPDATE TIMESTAMP TRIGGER
-- ─────────────────────────────────────────────────────────────────────────
DROP TRIGGER IF EXISTS set_appointments_updated_at ON public.appointments;
CREATE TRIGGER set_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ─────────────────────────────────────────────────────────────────────────
-- 5. VALIDATION TRIGGER: Doctor belongs to selected department
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION validate_doctor_department()
RETURNS TRIGGER AS $$
DECLARE
  v_doctor_department_id UUID;
BEGIN
  -- Get doctor's department
  SELECT department_id INTO v_doctor_department_id
  FROM public.doctors
  WHERE id = NEW.doctor_id;

  IF v_doctor_department_id IS NULL THEN
    RAISE EXCEPTION 'Doctor with id % does not exist', NEW.doctor_id;
  END IF;

  IF v_doctor_department_id <> NEW.department_id THEN
    RAISE EXCEPTION 'Doctor % does not belong to department %', NEW.doctor_id, NEW.department_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validate_doctor_department ON public.appointments;
CREATE TRIGGER trg_validate_doctor_department
  BEFORE INSERT OR UPDATE OF doctor_id, department_id ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION validate_doctor_department();

-- ─────────────────────────────────────────────────────────────────────────
-- 6. CONFLICT PREVENTION FUNCTION: Check for overlapping appointments
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION check_appointment_conflicts()
RETURNS TRIGGER AS $$
DECLARE
  v_doctor_conflict_count INT;
  v_patient_conflict_count INT;
BEGIN
  -- Check for doctor conflicts (excluding current appointment if UPDATE)
  SELECT COUNT(*) INTO v_doctor_conflict_count
  FROM public.appointments
  WHERE doctor_id = NEW.doctor_id
    AND appointment_date = NEW.appointment_date
    AND status NOT IN ('cancelled', 'no_show')
    AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::UUID)
    AND (
      -- Overlapping time ranges
      (NEW.start_time, NEW.end_time) OVERLAPS (start_time, end_time)
    );

  IF v_doctor_conflict_count > 0 THEN
    RAISE EXCEPTION 'Doctor already has an appointment during this time slot';
  END IF;

  -- Check for patient conflicts (excluding current appointment if UPDATE)
  SELECT COUNT(*) INTO v_patient_conflict_count
  FROM public.appointments
  WHERE patient_id = NEW.patient_id
    AND appointment_date = NEW.appointment_date
    AND status NOT IN ('cancelled', 'no_show')
    AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::UUID)
    AND (
      -- Overlapping time ranges
      (NEW.start_time, NEW.end_time) OVERLAPS (start_time, end_time)
    );

  IF v_patient_conflict_count > 0 THEN
    RAISE EXCEPTION 'Patient already has an appointment during this time slot';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_appointment_conflicts ON public.appointments;
CREATE TRIGGER trg_check_appointment_conflicts
  BEFORE INSERT OR UPDATE OF doctor_id, patient_id, appointment_date, start_time, end_time ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION check_appointment_conflicts();

-- ─────────────────────────────────────────────────────────────────────────
-- 7. ENABLE ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────────────────
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────────────────────────────
-- 8. RLS POLICIES
-- ─────────────────────────────────────────────────────────────────────────

-- Patients can read their own appointments
DROP POLICY IF EXISTS "Patients can view own appointments" ON public.appointments;
CREATE POLICY "Patients can view own appointments"
  ON public.appointments FOR SELECT
  USING (
    patient_id IN (
      SELECT p.id FROM public.patients p
      INNER JOIN public.users u ON p.user_id = u.id
      WHERE u.clerk_user_id = auth.jwt() ->> 'sub'
    )
  );

-- Patients can create appointments for themselves
DROP POLICY IF EXISTS "Patients can create own appointments" ON public.appointments;
CREATE POLICY "Patients can create own appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (
    patient_id IN (
      SELECT p.id FROM public.patients p
      INNER JOIN public.users u ON p.user_id = u.id
      WHERE u.clerk_user_id = auth.jwt() ->> 'sub'
    )
  );

-- Patients can update their own appointments (limited fields)
DROP POLICY IF EXISTS "Patients can update own appointments" ON public.appointments;
CREATE POLICY "Patients can update own appointments"
  ON public.appointments FOR UPDATE
  USING (
    patient_id IN (
      SELECT p.id FROM public.patients p
      INNER JOIN public.users u ON p.user_id = u.id
      WHERE u.clerk_user_id = auth.jwt() ->> 'sub'
    )
  );

-- Doctors can view their own appointments
DROP POLICY IF EXISTS "Doctors can view own appointments" ON public.appointments;
CREATE POLICY "Doctors can view own appointments"
  ON public.appointments FOR SELECT
  USING (
    doctor_id IN (
      SELECT d.id FROM public.doctors d
      INNER JOIN public.users u ON d.user_id = u.id
      WHERE u.clerk_user_id = auth.jwt() ->> 'sub'
    )
  );

-- Doctors can update their own appointments (status changes)
DROP POLICY IF EXISTS "Doctors can update own appointments" ON public.appointments;
CREATE POLICY "Doctors can update own appointments"
  ON public.appointments FOR UPDATE
  USING (
    doctor_id IN (
      SELECT d.id FROM public.doctors d
      INNER JOIN public.users u ON d.user_id = u.id
      WHERE u.clerk_user_id = auth.jwt() ->> 'sub'
    )
  );

-- Staff can view all appointments (for operational purposes)
DROP POLICY IF EXISTS "Staff can view all appointments" ON public.appointments;
CREATE POLICY "Staff can view all appointments"
  ON public.appointments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE clerk_user_id = auth.jwt() ->> 'sub' 
      AND role = 'staff'
    )
  );

-- Staff can update appointments (operational management)
DROP POLICY IF EXISTS "Staff can update appointments" ON public.appointments;
CREATE POLICY "Staff can update appointments"
  ON public.appointments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE clerk_user_id = auth.jwt() ->> 'sub' 
      AND role = 'staff'
    )
  );

-- Admins can view all appointments
DROP POLICY IF EXISTS "Admins can view all appointments" ON public.appointments;
CREATE POLICY "Admins can view all appointments"
  ON public.appointments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE clerk_user_id = auth.jwt() ->> 'sub' 
      AND role = 'admin'
    )
  );

-- Admins can update any appointment
DROP POLICY IF EXISTS "Admins can update appointments" ON public.appointments;
CREATE POLICY "Admins can update appointments"
  ON public.appointments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE clerk_user_id = auth.jwt() ->> 'sub' 
      AND role = 'admin'
    )
  );

-- Admins can delete appointments
DROP POLICY IF EXISTS "Admins can delete appointments" ON public.appointments;
CREATE POLICY "Admins can delete appointments"
  ON public.appointments FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE clerk_user_id = auth.jwt() ->> 'sub' 
      AND role = 'admin'
    )
  );

-- ─────────────────────────────────────────────────────────────────────────
-- 9. VERIFICATION QUERIES
-- ─────────────────────────────────────────────────────────────────────────

-- Verify table exists
SELECT 'appointments table created' AS status
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'appointments');

-- Verify constraints
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'appointments'
ORDER BY constraint_type, constraint_name;

-- Verify indexes
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'appointments'
ORDER BY indexname;

-- Verify RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'appointments';

-- Verify RLS policies
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'appointments'
ORDER BY policyname;

-- Verify triggers
SELECT trigger_name, event_manipulation, action_statement
FROM information_schema.triggers
WHERE event_object_table = 'appointments'
ORDER BY trigger_name;

