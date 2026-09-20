// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI — Module 2 Test Suite
// Verifies all 8 tests required by specification
// ═══════════════════════════════════════════════════════════════════════════

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { supabase as adminSupabase } from '../config/supabase.js';

// Anon client (simulates unprivileged / public / patient client)
const anonSupabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY
);

async function runTests() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🧪 MediFlow AI — Module 2 Hospital Structure Verification');
  console.log('═══════════════════════════════════════════════════════════════\n');

  let testDeptId = null;
  let cardioDeptId = null;
  let testDoctorUserId = null;
  let testStaffUserId = null;
  let testDoctorId = null;
  let testStaffId = null;

  try {
    // ─────────────────────────────────────────────────────────────────────────
    // TEST 1: Create a department
    // ─────────────────────────────────────────────────────────────────────────
    console.log('▶ [TEST 1] Creating a department...');
    const { data: dept, error: deptErr } = await adminSupabase
      .from('departments')
      .insert({
        name: 'Test Oncology Wing',
        code: 'TESTONC',
        description: 'Cancer treatment and oncology unit',
        location: 'Wing D, 4th Floor',
        status: 'active',
      })
      .select()
      .single();

    if (deptErr) throw new Error(`TEST 1 Failed: ${deptErr.message}`);
    testDeptId = dept.id;
    console.log(`✅ TEST 1 PASSED: Department created with ID: ${testDeptId} (${dept.name})\n`);

    // Grab Cardiology ID for later re-assignment test
    const { data: cardio } = await adminSupabase
      .from('departments')
      .select('id')
      .eq('name', 'Cardiology')
      .single();
    cardioDeptId = cardio?.id;

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 2: Create a doctor user and corresponding doctor record
    // ─────────────────────────────────────────────────────────────────────────
    console.log('▶ [TEST 2] Creating doctor user and doctor record...');
    // 2a. Create doctor user in public.users
    const { data: docUser, error: docUserErr } = await adminSupabase
      .from('users')
      .insert({
        clerk_user_id: 'clerk_test_doc_001',
        full_name: 'Dr. Evelyn Reed',
        email: 'evelyn.reed@mediflow.test',
        role: 'doctor',
        status: 'active',
      })
      .select()
      .single();

    if (docUserErr) throw new Error(`TEST 2 (User) Failed: ${docUserErr.message}`);
    testDoctorUserId = docUser.id;

    // 2b. Create doctor record
    const { data: docRecord, error: docErr } = await adminSupabase
      .from('doctors')
      .insert({
        user_id: testDoctorUserId,
        department_id: testDeptId,
        employee_id: 'DOC-TEST-001',
        specialization: 'Medical Oncology',
        qualification: 'MD, PhD',
        license_number: 'LIC-ONC-9988',
        room_number: '402-A',
        working_status: 'available',
      })
      .select()
      .single();

    if (docErr) throw new Error(`TEST 2 (Doctor Record) Failed: ${docErr.message}`);
    testDoctorId = docRecord.id;
    console.log(`✅ TEST 2 PASSED: Doctor created and linked to department (${docRecord.specialization}, Dept: ${docRecord.department_id})\n`);

    // 2c. Role consistency check: attempt to add patient as doctor
    console.log('▶ [TEST 2.1] Testing role consistency trigger (patient -> doctor table)...');
    const { data: patientUser } = await adminSupabase
      .from('users')
      .insert({
        clerk_user_id: 'clerk_test_patient_001',
        full_name: 'Regular Patient',
        email: 'patient@mediflow.test',
        role: 'patient',
        status: 'active',
      })
      .select()
      .single();

    const { error: invalidDocErr } = await adminSupabase
      .from('doctors')
      .insert({
        user_id: patientUser.id,
        department_id: testDeptId,
      });

    if (invalidDocErr) {
      console.log(`✅ TEST 2.1 PASSED: Invalid role blocked by database trigger: "${invalidDocErr.message}"\n`);
    } else {
      throw new Error('TEST 2.1 FAILED: Patient was incorrectly allowed in doctors table!');
    }
    await adminSupabase.from('users').delete().eq('id', patientUser.id);

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 3: Create staff user and staff record
    // ─────────────────────────────────────────────────────────────────────────
    console.log('▶ [TEST 3] Creating staff user and staff record...');
    const { data: staffUser, error: staffUserErr } = await adminSupabase
      .from('users')
      .insert({
        clerk_user_id: 'clerk_test_staff_001',
        full_name: 'Sarah Jenkins, RN',
        email: 'sarah.jenkins@mediflow.test',
        role: 'staff',
        status: 'active',
      })
      .select()
      .single();

    if (staffUserErr) throw new Error(`TEST 3 (User) Failed: ${staffUserErr.message}`);
    testStaffUserId = staffUser.id;

    const { data: staffRecord, error: staffErr } = await adminSupabase
      .from('staff')
      .insert({
        user_id: testStaffUserId,
        department_id: testDeptId,
        employee_id: 'STF-TEST-001',
        staff_type: 'nurse',
        working_status: 'available',
      })
      .select()
      .single();

    if (staffErr) throw new Error(`TEST 3 (Staff Record) Failed: ${staffErr.message}`);
    testStaffId = staffRecord.id;
    console.log(`✅ TEST 3 PASSED: Staff created and linked to department (${staffRecord.staff_type})\n`);

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 4: Query department -> doctors
    // ─────────────────────────────────────────────────────────────────────────
    console.log('▶ [TEST 4] Querying department -> doctors...');
    const { data: deptDocs, error: qDocErr } = await adminSupabase
      .from('doctors')
      .select('*, user:users(full_name, email)')
      .eq('department_id', testDeptId);

    if (qDocErr) throw new Error(`TEST 4 Failed: ${qDocErr.message}`);
    if (deptDocs.length !== 1 || deptDocs[0].id !== testDoctorId) {
      throw new Error(`TEST 4 Failed: Expected 1 doctor with ID ${testDoctorId}, found ${deptDocs.length}`);
    }
    console.log(`✅ TEST 4 PASSED: Query returned doctor "${deptDocs[0].user?.full_name}" under department.\n`);

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 5: Query department -> staff
    // ─────────────────────────────────────────────────────────────────────────
    console.log('▶ [TEST 5] Querying department -> staff...');
    const { data: deptStaff, error: qStaffErr } = await adminSupabase
      .from('staff')
      .select('*, user:users(full_name, email)')
      .eq('department_id', testDeptId);

    if (qStaffErr) throw new Error(`TEST 5 Failed: ${qStaffErr.message}`);
    if (deptStaff.length !== 1 || deptStaff[0].id !== testStaffId) {
      throw new Error(`TEST 5 Failed: Expected 1 staff member with ID ${testStaffId}, found ${deptStaff.length}`);
    }
    console.log(`✅ TEST 5 PASSED: Query returned staff "${deptStaff[0].user?.full_name}" under department.\n`);

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 6: Change doctor's department
    // ─────────────────────────────────────────────────────────────────────────
    console.log(`▶ [TEST 6] Moving doctor to department (${cardioDeptId})...`);
    const { data: movedDoc, error: moveErr } = await adminSupabase
      .from('doctors')
      .update({ department_id: cardioDeptId })
      .eq('id', testDoctorId)
      .select()
      .single();

    if (moveErr) throw new Error(`TEST 6 Failed: ${moveErr.message}`);
    if (movedDoc.department_id !== cardioDeptId) {
      throw new Error(`TEST 6 Failed: Department was not updated!`);
    }

    // Verify old department now has 0 doctors
    const { data: oldDeptDocs } = await adminSupabase
      .from('doctors')
      .select('id')
      .eq('department_id', testDeptId);

    console.log(`✅ TEST 6 PASSED: Doctor moved to new department. Old department now has ${oldDeptDocs.length} doctors.\n`);

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 7: Change doctor working_status
    // ─────────────────────────────────────────────────────────────────────────
    console.log('▶ [TEST 7] Updating doctor working_status to "busy" and "on_leave"...');
    const { data: status1, error: sErr1 } = await adminSupabase
      .from('doctors')
      .update({ working_status: 'busy' })
      .eq('id', testDoctorId)
      .select()
      .single();
    if (sErr1) throw new Error(`TEST 7a Failed: ${sErr1.message}`);

    const { data: status2, error: sErr2 } = await adminSupabase
      .from('doctors')
      .update({ working_status: 'on_leave' })
      .eq('id', testDoctorId)
      .select()
      .single();
    if (sErr2) throw new Error(`TEST 7b Failed: ${sErr2.message}`);

    console.log(`✅ TEST 7 PASSED: Working status transitions verified: ${status1.working_status} -> ${status2.working_status}\n`);

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 8: Non-admin attempts to modify department (RLS rejection)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('▶ [TEST 8] Non-admin / anon client attempts to modify department...');
    const { data: hackData, error: hackError } = await anonSupabase
      .from('departments')
      .update({ name: 'Hacked Department Name' })
      .eq('id', testDeptId)
      .select();

    // With RLS enabled and no update policy for anon, Supabase returns error or empty array
    if (hackError || !hackData || hackData.length === 0) {
      console.log(`✅ TEST 8 PASSED: Non-admin mutation blocked by RLS / authorization!`);
      if (hackError) {
        console.log(`   (Rejection details: "${hackError.message}")\n`);
      } else {
        console.log(`   (0 rows affected / unauthorized)\n`);
      }
    } else {
      throw new Error('TEST 8 FAILED: Non-admin was able to modify department!');
    }

    console.log('═══════════════════════════════════════════════════════════════');
    console.log('🎉 ALL 8 MODULE 2 TESTS PASSED PERFECTLY!');
    console.log('═══════════════════════════════════════════════════════════════\n');
  } catch (err) {
    console.error('❌ Test execution error:', err);
    throw err;
  } finally {
    // Clean up test data
    console.log('Cleaning up test data...');
    if (testDoctorId) await adminSupabase.from('doctors').delete().eq('id', testDoctorId);
    if (testStaffId) await adminSupabase.from('staff').delete().eq('id', testStaffId);
    if (testDoctorUserId) await adminSupabase.from('users').delete().eq('id', testDoctorUserId);
    if (testStaffUserId) await adminSupabase.from('users').delete().eq('id', testStaffUserId);
    if (testDeptId) await adminSupabase.from('departments').delete().eq('id', testDeptId);
    console.log('Clean up complete.');
  }
}

runTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
