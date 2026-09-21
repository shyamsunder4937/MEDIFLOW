-- ═══════════════════════════════════════════════════════════════════════════
-- MediFlow AI — Supabase PostgreSQL Schema
-- Modules 1 & 2: Users & Hospital Structure
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────
-- 1. USERS TABLE
-- Mirrors Clerk user records. Synced via /api/users/sync after login.
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id  TEXT        UNIQUE NOT NULL,
  full_name      TEXT        NOT NULL,
  email          TEXT        UNIQUE NOT NULL,
  phone          TEXT,
  role           TEXT        NOT NULL DEFAULT 'patient'
                 CHECK (role IN ('patient', 'doctor', 'staff', 'admin')),
  status         TEXT        NOT NULL DEFAULT 'active'
                 CHECK (status IN ('active', 'inactive', 'suspended')),
  avatar_url     TEXT,
  metadata       JSONB       DEFAULT '{}',
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_clerk_user_id ON public.users (clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_users_role_status    ON public.users (role, status);
CREATE INDEX IF NOT EXISTS idx_users_created_at     ON public.users (created_at DESC);

-- ─────────────────────────────────────────────────────────────────────────
-- 2. DEPARTMENTS TABLE (Module 2)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.departments (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL UNIQUE,
  code        TEXT        UNIQUE,
  description TEXT,
  location    TEXT,
  status      TEXT        NOT NULL DEFAULT 'active'
              CHECK (status IN ('active', 'inactive')),
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_departments_status ON public.departments (status);

-- ─────────────────────────────────────────────────────────────────────────
-- 3. DOCTORS TABLE (Module 2)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.doctors (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID        UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  department_id  UUID        NOT NULL REFERENCES public.departments(id) ON DELETE RESTRICT,
  employee_id    TEXT        UNIQUE,
  specialization TEXT,
  qualification  TEXT,
  license_number TEXT,
  room_number    TEXT,
  phone          TEXT,
  working_status TEXT        DEFAULT 'available'
                 CHECK (working_status IN ('available', 'busy', 'unavailable', 'on_leave')),
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_doctors_user_id        ON public.doctors (user_id);
CREATE INDEX IF NOT EXISTS idx_doctors_department_id  ON public.doctors (department_id);
CREATE INDEX IF NOT EXISTS idx_doctors_working_status ON public.doctors (working_status);

-- ─────────────────────────────────────────────────────────────────────────
-- 4. STAFF TABLE (Module 2)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.staff (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID        UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  department_id  UUID        REFERENCES public.departments(id) ON DELETE RESTRICT,
  employee_id    TEXT        UNIQUE,
  staff_type     TEXT,
  phone          TEXT,
  working_status TEXT        DEFAULT 'available'
                 CHECK (working_status IN ('available', 'busy', 'unavailable', 'on_leave')),
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_staff_user_id        ON public.staff (user_id);
CREATE INDEX IF NOT EXISTS idx_staff_department_id  ON public.staff (department_id);
CREATE INDEX IF NOT EXISTS idx_staff_working_status ON public.staff (working_status);

-- ─────────────────────────────────────────────────────────────────────────
-- 5. TRIGGER FUNCTIONS: AUTO-UPDATE updated_at
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_users_updated_at ON public.users;
CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_departments_updated_at ON public.departments;
CREATE TRIGGER set_departments_updated_at
  BEFORE UPDATE ON public.departments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_doctors_updated_at ON public.doctors;
CREATE TRIGGER set_doctors_updated_at
  BEFORE UPDATE ON public.doctors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_staff_updated_at ON public.staff;
CREATE TRIGGER set_staff_updated_at
  BEFORE UPDATE ON public.staff
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ─────────────────────────────────────────────────────────────────────────
-- 6. ROLE CONSISTENCY TRIGGER FUNCTIONS
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION check_doctor_user_role()
RETURNS TRIGGER AS $$
DECLARE
  v_role TEXT;
BEGIN
  SELECT role INTO v_role FROM public.users WHERE id = NEW.user_id;
  IF v_role IS NULL THEN
    RAISE EXCEPTION 'Referenced user with id % does not exist', NEW.user_id;
  END IF;
  IF v_role <> 'doctor' THEN
    RAISE EXCEPTION 'User % has role %, but only users with role "doctor" can be added to doctors table', NEW.user_id, v_role;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_doctor_user_role ON public.doctors;
CREATE TRIGGER trg_check_doctor_user_role
  BEFORE INSERT OR UPDATE OF user_id ON public.doctors
  FOR EACH ROW
  EXECUTE FUNCTION check_doctor_user_role();

CREATE OR REPLACE FUNCTION check_staff_user_role()
RETURNS TRIGGER AS $$
DECLARE
  v_role TEXT;
BEGIN
  SELECT role INTO v_role FROM public.users WHERE id = NEW.user_id;
  IF v_role IS NULL THEN
    RAISE EXCEPTION 'Referenced user with id % does not exist', NEW.user_id;
  END IF;
  IF v_role <> 'staff' THEN
    RAISE EXCEPTION 'User % has role %, but only users with role "staff" can be added to staff table', NEW.user_id, v_role;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_staff_user_role ON public.staff;
CREATE TRIGGER trg_check_staff_user_role
  BEFORE INSERT OR UPDATE OF user_id ON public.staff
  FOR EACH ROW
  EXECUTE FUNCTION check_staff_user_role();

-- ─────────────────────────────────────────────────────────────────────────
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ─────────────────────────────────────────────────────────────────────────
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;

-- Read policies for public/patients/staff
DROP POLICY IF EXISTS "Allow public read active departments" ON public.departments;
CREATE POLICY "Allow public read active departments"
  ON public.departments FOR SELECT
  USING (status = 'active');

DROP POLICY IF EXISTS "Allow public read doctors" ON public.doctors;
CREATE POLICY "Allow public read doctors"
  ON public.doctors FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public read staff" ON public.staff;
CREATE POLICY "Allow public read staff"
  ON public.staff FOR SELECT
  USING (true);

-- ─────────────────────────────────────────────────────────────────────────
-- 8. PATIENT MANAGEMENT (Module 3)
-- ─────────────────────────────────────────────────────────────────────────
CREATE SEQUENCE IF NOT EXISTS patient_id_seq START WITH 100001;

CREATE TABLE IF NOT EXISTS public.patients (
  id                         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                    UUID        UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  patient_id                 TEXT        UNIQUE NOT NULL DEFAULT ('PAT-' || LPAD(nextval('patient_id_seq')::TEXT, 6, '0')),
  date_of_birth              DATE,
  gender                     TEXT        CHECK (gender IS NULL OR gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  blood_group                TEXT        CHECK (blood_group IS NULL OR blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  phone                      TEXT,
  address                    TEXT,
  city                       TEXT,
  state                      TEXT,
  postal_code                TEXT,
  emergency_contact_name     TEXT,
  emergency_contact_phone    TEXT,
  emergency_contact_relation TEXT,
  created_at                 TIMESTAMPTZ DEFAULT now(),
  updated_at                 TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_patients_user_id    ON public.patients (user_id);
CREATE INDEX IF NOT EXISTS idx_patients_patient_id ON public.patients (patient_id);

-- Auto updated_at for patients
DROP TRIGGER IF EXISTS set_patients_updated_at ON public.patients;
CREATE TRIGGER set_patients_updated_at
  BEFORE UPDATE ON public.patients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Role consistency for patients: must correspond to users.role = 'patient'
CREATE OR REPLACE FUNCTION check_patient_user_role()
RETURNS TRIGGER AS $$
DECLARE
  v_role TEXT;
BEGIN
  SELECT role INTO v_role FROM public.users WHERE id = NEW.user_id;
  IF v_role IS NULL THEN
    RAISE EXCEPTION 'Referenced user with id % does not exist', NEW.user_id;
  END IF;
  IF v_role <> 'patient' THEN
    RAISE EXCEPTION 'User % has role %, but only users with role "patient" can be added to patients table', NEW.user_id, v_role;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_patient_user_role ON public.patients;
CREATE TRIGGER trg_check_patient_user_role
  BEFORE INSERT OR UPDATE OF user_id ON public.patients
  FOR EACH ROW
  EXECUTE FUNCTION check_patient_user_role();

-- RLS for patients
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;


-- ─────────────────────────────────────────────────────────────────────────
-- 9. ROW LEVEL SECURITY POLICIES FOR PATIENTS
-- ─────────────────────────────────────────────────────────────────────────

-- Note: RLS policies work in conjunction with Clerk authentication
-- Backend middleware validates Clerk tokens and maps to Supabase user_id
-- These policies provide defense-in-depth at the database layer

-- Patients can read their own record
DROP POLICY IF EXISTS "Patients can view own profile" ON public.patients;
CREATE POLICY "Patients can view own profile"
  ON public.patients FOR SELECT
  USING (user_id IN (SELECT id FROM public.users WHERE clerk_user_id = auth.jwt() ->> 'sub'));

-- Patients can update their own allowed fields
DROP POLICY IF EXISTS "Patients can update own profile" ON public.patients;
CREATE POLICY "Patients can update own profile"
  ON public.patients FOR UPDATE
  USING (user_id IN (SELECT id FROM public.users WHERE clerk_user_id = auth.jwt() ->> 'sub'));

-- Admins can read all patient records
DROP POLICY IF EXISTS "Admins can view all patients" ON public.patients;
CREATE POLICY "Admins can view all patients"
  ON public.patients FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.users 
    WHERE clerk_user_id = auth.jwt() ->> 'sub' 
    AND role = 'admin'
  ));

-- Admins can update patient records
DROP POLICY IF EXISTS "Admins can update patients" ON public.patients;
CREATE POLICY "Admins can update patients"
  ON public.patients FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.users 
    WHERE clerk_user_id = auth.jwt() ->> 'sub' 
    AND role = 'admin'
  ));

-- System can insert patient records (during signup/profile creation)
DROP POLICY IF EXISTS "System can create patient profiles" ON public.patients;
CREATE POLICY "System can create patient profiles"
  ON public.patients FOR INSERT
  WITH CHECK (true);


-- ─────────────────────────────────────────────────────────────────────────
-- 10. APPOINTMENT MANAGEMENT (Module 4)
-- ─────────────────────────────────────────────────────────────────────────
CREATE SEQUENCE IF NOT EXISTS appointment_number_seq START WITH 100001;

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

CREATE INDEX IF NOT EXISTS idx_appointments_patient_id       ON public.appointments (patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id        ON public.appointments (doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_department_id    ON public.appointments (department_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date             ON public.appointments (appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status           ON public.appointments (status);
CREATE INDEX IF NOT EXISTS idx_appointments_appointment_number ON public.appointments (appointment_number);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_date      ON public.appointments (doctor_id, appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_date     ON public.appointments (patient_id, appointment_date);

DROP TRIGGER IF EXISTS set_appointments_updated_at ON public.appointments;
CREATE TRIGGER set_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Validation: Doctor belongs to department
CREATE OR REPLACE FUNCTION validate_doctor_department()
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

DROP TRIGGER IF EXISTS trg_validate_doctor_department ON public.appointments;
CREATE TRIGGER trg_validate_doctor_department
  BEFORE INSERT OR UPDATE OF doctor_id, department_id ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION validate_doctor_department();

-- Conflict prevention: Overlapping appointments
CREATE OR REPLACE FUNCTION check_appointment_conflicts()
RETURNS TRIGGER AS $$
DECLARE
  v_doctor_conflict_count INT;
  v_patient_conflict_count INT;
BEGIN
  SELECT COUNT(*) INTO v_doctor_conflict_count
  FROM public.appointments
  WHERE doctor_id = NEW.doctor_id
    AND appointment_date = NEW.appointment_date
    AND status NOT IN ('cancelled', 'no_show')
    AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::UUID)
    AND (NEW.start_time, NEW.end_time) OVERLAPS (start_time, end_time);

  IF v_doctor_conflict_count > 0 THEN
    RAISE EXCEPTION 'Doctor already has an appointment during this time slot';
  END IF;

  SELECT COUNT(*) INTO v_patient_conflict_count
  FROM public.appointments
  WHERE patient_id = NEW.patient_id
    AND appointment_date = NEW.appointment_date
    AND status NOT IN ('cancelled', 'no_show')
    AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::UUID)
    AND (NEW.start_time, NEW.end_time) OVERLAPS (start_time, end_time);

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

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
