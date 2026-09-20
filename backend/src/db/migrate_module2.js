import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

async function migrate() {
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

  console.log(`Connecting to db.${ref}.supabase.co...`);
  await client.connect();
  console.log('Connected to PostgreSQL successfully.');

  try {
    // 1. Verify public.users exists
    const usersCheck = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users' AND table_schema = 'public'
      ORDER BY ordinal_position;
    `);
    console.log('Confirmed public.users columns:', usersCheck.rows.map(r => `${r.column_name} (${r.data_type})`).join(', '));

    // 2. Create departments table
    console.log('Creating public.departments table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.departments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL UNIQUE,
        code TEXT UNIQUE,
        description TEXT,
        location TEXT,
        status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE INDEX IF NOT EXISTS idx_departments_status ON public.departments(status);
    `);

    // 3. Create doctors table
    console.log('Creating public.doctors table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.doctors (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
        department_id UUID NOT NULL REFERENCES public.departments(id) ON DELETE RESTRICT,
        employee_id TEXT UNIQUE,
        specialization TEXT,
        qualification TEXT,
        license_number TEXT,
        room_number TEXT,
        phone TEXT,
        working_status TEXT DEFAULT 'available' CHECK (working_status IN ('available', 'busy', 'unavailable', 'on_leave')),
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE INDEX IF NOT EXISTS idx_doctors_user_id ON public.doctors(user_id);
      CREATE INDEX IF NOT EXISTS idx_doctors_department_id ON public.doctors(department_id);
      CREATE INDEX IF NOT EXISTS idx_doctors_working_status ON public.doctors(working_status);
    `);

    // 4. Create staff table
    console.log('Creating public.staff table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.staff (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
        department_id UUID REFERENCES public.departments(id) ON DELETE RESTRICT,
        employee_id TEXT UNIQUE,
        staff_type TEXT,
        phone TEXT,
        working_status TEXT DEFAULT 'available' CHECK (working_status IN ('available', 'busy', 'unavailable', 'on_leave')),
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE INDEX IF NOT EXISTS idx_staff_user_id ON public.staff(user_id);
      CREATE INDEX IF NOT EXISTS idx_staff_department_id ON public.staff(department_id);
      CREATE INDEX IF NOT EXISTS idx_staff_working_status ON public.staff(working_status);
    `);

    // 5. Role consistency triggers
    console.log('Creating role consistency triggers...');
    await client.query(`
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
    `);

    // 6. Updated_at auto-triggers
    console.log('Attaching updated_at triggers...');
    await client.query(`
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
    `);

    // 7. Enable RLS and setup policies
    console.log('Enabling Row Level Security & Policies...');
    await client.query(`
      ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;

      -- Departments RLS
      DROP POLICY IF EXISTS "Allow public read active departments" ON public.departments;
      CREATE POLICY "Allow public read active departments"
        ON public.departments FOR SELECT
        USING (status = 'active');

      -- Doctors RLS (Read-only for public/patients/staff)
      DROP POLICY IF EXISTS "Allow public read doctors" ON public.doctors;
      CREATE POLICY "Allow public read doctors"
        ON public.doctors FOR SELECT
        USING (true);

      -- Staff RLS
      DROP POLICY IF EXISTS "Allow public read staff" ON public.staff;
      CREATE POLICY "Allow public read staff"
        ON public.staff FOR SELECT
        USING (true);
    `);

    // 8. Seed standard hospital departments if empty
    console.log('Checking seed departments...');
    const seedDepts = [
      { name: 'Cardiology', code: 'CARD', description: 'Heart and cardiovascular system care', location: 'Wing A, 2nd Floor' },
      { name: 'Neurology', code: 'NEUR', description: 'Brain, spinal cord, and nervous system disorders', location: 'Wing B, 3rd Floor' },
      { name: 'Orthopedics', code: 'ORTH', description: 'Musculoskeletal system, bones, and joints care', location: 'Wing A, 1st Floor' },
      { name: 'General Medicine', code: 'GENMED', description: 'Comprehensive primary and internal health care', location: 'Ground Floor, Suite 101' },
      { name: 'Pediatrics', code: 'PED', description: 'Medical care for infants, children, and adolescents', location: 'Wing C, 1st Floor' },
      { name: 'Dermatology', code: 'DERM', description: 'Skin, hair, and nail health treatments', location: 'Wing B, 2nd Floor' },
      { name: 'Emergency', code: 'EMERG', description: '24/7 Acute and emergency trauma care', location: 'Emergency Bay, Ground Floor' },
    ];

    for (const d of seedDepts) {
      await client.query(`
        INSERT INTO public.departments (name, code, description, location, status)
        VALUES ($1, $2, $3, $4, 'active')
        ON CONFLICT (name) DO NOTHING;
      `, [d.name, d.code, d.description, d.location]);
    }

    console.log('✅ Module 2 database migration and seed completed successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    throw err;
  } finally {
    await client.end();
  }
}

migrate().catch((e) => {
  console.error(e);
  process.exit(1);
});
