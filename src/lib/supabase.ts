import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const getSupabaseConfig = () => {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  return {
    supabaseUrl,
    supabasePublishableKey,
  };
};

export const createSupabaseClient = () => {
  const { supabaseUrl, supabasePublishableKey } = getSupabaseConfig();
  const isBrowser = typeof window !== "undefined";

  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      persistSession: isBrowser,
      autoRefreshToken: isBrowser,
      detectSessionInUrl: isBrowser,
    },
  });
};

export const supabase = createSupabaseClient();
