import { createClient } from "@supabase/supabase-js";

const normalizeEnv = (value: string | undefined) => {
  if (!value) return "";
  return value.trim().replace(/^['"]|['"]$/g, "");
};

const supabaseUrl = normalizeEnv(import.meta.env.VITE_SUPABASE_URL as string | undefined);
const supabaseAnonKey = normalizeEnv(import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);
const supabasePublishableKey = normalizeEnv(
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string | undefined
);
const supabasePublicKey = supabaseAnonKey || supabasePublishableKey;

if (!supabaseUrl || !supabasePublicKey) {
  // Keep runtime explicit: app can render but data actions will fail with clear message.
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars missing: VITE_SUPABASE_URL and (VITE_SUPABASE_ANON_KEY or VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY)"
  );
}

if (supabasePublicKey.startsWith("sb_secret_")) {
  throw new Error("No uses SUPABASE secret key en frontend. Usa ANON o PUBLISHABLE.");
}

export const supabase = createClient(supabaseUrl || "", supabasePublicKey || "");

export const ensureSupabaseConfigured = () => {
  if (!supabaseUrl || !supabasePublicKey) {
    throw new Error(
      "Faltan variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY (o VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY)"
    );
  }
};
