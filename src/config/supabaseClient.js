import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kxmfzmrieykihlcuenrb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bWZ6bXJpZXlraWhsY3VlbnJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MjU2ODgsImV4cCI6MjAxODUwMTY4OH0.Yx_N-JB0OpnTFAyz3Q4v85vTfmWrsUOHIyrCcoNkdS8";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
