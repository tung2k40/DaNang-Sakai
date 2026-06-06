import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eilpnevunmpxudchxiav.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.warn("VITE_SUPABASE_ANON_KEY is missing in frontend/.env!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey || 'dummy-key-to-prevent-crash');
