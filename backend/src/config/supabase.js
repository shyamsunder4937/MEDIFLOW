// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Supabase Client Configuration
// Single shared client instance for all backend database operations
// Uses service role key (bypasses RLS for trusted server-side operations)
// ═══════════════════════════════════════════════════════════════════════════

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY) are required.');
  process.exit(1);
}

/**
 * Supabase admin client (service role)
 * Use this for all backend DB operations — it bypasses Row Level Security.
 */
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    // Disable Supabase Auth auto-refresh on the server; we use Clerk for auth
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Test database connectivity — used in health checks
 */
export const pingDB = async () => {
  const { error } = await supabase.from('users').select('id').limit(1);
  return !error;
};
