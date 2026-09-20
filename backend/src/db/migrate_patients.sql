-- ═══════════════════════════════════════════════════════════════════════════
-- MediFlow AI — Module 3: Patient Management Migration
-- Creates patients table with proper constraints, indexes, and RLS policies
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────
-- 1. CREATE PATIENT ID SEQUENCE
-- ─────────────────────────────────────────────────────────────────────────
CREATE SEQUENCE IF NOT EXISTS patient_id_seq START WITH 100001;

-- ─────────────────────────────────────────────────────────────────────────
-- 2. CREATE PATIENTS TABLE
-- ─────────────────────────────────────────────────────────────────────────
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

-- ─────────────────────────────────────────────────────────────────────────
-- 3. CREATE INDEXES
-- ─────────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_patients_user_id    ON public.patients (user_id);
CREATE INDEX IF NOT EXISTS idx_patients_patient_id ON public.patients (patient_id);

-- ─────────────────────────────────────────────────────────────────────────
-- 4. AUTO UPDATE TIMESTAMP TRIGGER
-- ─────────────────────────────────────────────────────────────────────────
DROP TRIGGER IF EXISTS set_patients_updated_at ON public.patients;
CREATE TRIGGER set_patients_updated_at
  BEFORE UPDATE ON public.patients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ─────────────────────────────────────────────────────────────────────────
-- 5. ROLE CONSISTENCY TRIGGER
-- Ensures only users with role='patient' can have a patient record
-- ─────────────────────────────────────────────────────────────────────────
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

-- ─────────────────────────────────────────────────────────────────────────
-- 6. ENABLE ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────────────────
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────────────────────────────
-- 7. RLS POLICIES
-- ─────────────────────────────────────────────────────────────────────────

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
-- 8. VERIFICATION QUERIES
-- ─────────────────────────────────────────────────────────────────────────

-- Verify table exists
SELECT 'patients table created' AS status
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'patients');

-- Verify constraints
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'patients'
ORDER BY constraint_type, constraint_name;

-- Verify indexes
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'patients'
ORDER BY indexname;

-- Verify RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'patients';

-- Verify RLS policies
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'patients'
ORDER BY policyname;

