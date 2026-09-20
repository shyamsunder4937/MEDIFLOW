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

