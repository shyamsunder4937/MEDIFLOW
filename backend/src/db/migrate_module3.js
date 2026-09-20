import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

async function migrateModule3() {
  const url = process.env.SUPABASE_URL;
  const ref = url ? new URL(url).hostname.split('.')[0] : '';
  const password = process.env.SUPABASE_PASSWORD;

  if (!ref || !password) {
    console.error('Missing SUPABASE_URL or SUPABASE_PASSWORD in environment');
    process.exit(1);
  }

  const client = new Client({
    host: `db.${ref}.supabase.co`,
    port: 5432,
    user: 'postgres',
    password,
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
  });

  console.log(`Connecting to db.${ref}.supabase.co for Module 3 migration...`);
  await client.connect();
  console.log('Connected to PostgreSQL successfully.');

  try {
    // 1. Create patient ID sequence
    console.log('Creating patient_id_seq sequence...');
    await client.query(`
      CREATE SEQUENCE IF NOT EXISTS patient_id_seq START WITH 100001;
    `);

    // 2. Create patients table
    console.log('Creating public.patients table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.patients (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
        patient_id TEXT UNIQUE NOT NULL DEFAULT ('PAT-' || LPAD(nextval('patient_id_seq')::TEXT, 6, '0')),
        date_of_birth DATE,
        gender TEXT CHECK (gender IS NULL OR gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
        blood_group TEXT CHECK (blood_group IS NULL OR blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
        phone TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        postal_code TEXT,
        emergency_contact_name TEXT,
        emergency_contact_phone TEXT,
        emergency_contact_relation TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE INDEX IF NOT EXISTS idx_patients_user_id ON public.patients(user_id);
      CREATE INDEX IF NOT EXISTS idx_patients_patient_id ON public.patients(patient_id);
    `);

    // 3. Create role consistency trigger
    console.log('Creating check_patient_user_role trigger...');
    await client.query(`
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
    `);

    // 4. Attach updated_at trigger
    console.log('Attaching updated_at trigger for patients...');
    await client.query(`
      DROP TRIGGER IF EXISTS set_patients_updated_at ON public.patients;
      CREATE TRIGGER set_patients_updated_at
        BEFORE UPDATE ON public.patients
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);

    // 5. Enable Row Level Security (RLS)
    console.log('Enabling Row Level Security for patients...');
    await client.query(`
      ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

      -- Default deny all anon access (enforced via server API with service role)
      DROP POLICY IF EXISTS "Deny direct public modification on patients" ON public.patients;
    `);

    console.log('✅ Module 3 database migration completed successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    throw err;
  } finally {
    await client.end();
  }
}

migrateModule3().catch((e) => {
  console.error(e);
  process.exit(1);
});
