import { supabase } from "./src/lib/supabase";

async function run() {
  const { data, error } = await supabase.from('posts').select('*').limit(1);
  console.log("Posts Data:", data);
  if (error) console.error("Error:", error);
}

run();
