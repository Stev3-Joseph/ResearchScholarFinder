const { createClient } = require("@supabase/supabase-js");
require("dotenv").config(); // Make sure this comes before accessing env vars

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key are required.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
