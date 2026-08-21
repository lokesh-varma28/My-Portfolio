// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl =
//   import.meta.env.VITE_SUPABASE_URL || 'https://pynykkwggnksyvgarlin.supabase.co';

// const supabaseAnonKey =
//   import.meta.env.VITE_SUPABASE_ANON_KEY ||
//   import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
//   'sb_publishable_5y3qxozkdwGGHR7EqBts0g_q_F637fq';

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// export default supabase;


import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;