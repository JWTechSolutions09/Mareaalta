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
const usingSecretKeyInFrontend = supabasePublicKey.startsWith("sb_secret_");

if (!supabaseUrl || !supabasePublicKey) {
  // Keep runtime explicit: app can render but data actions will fail with clear message.
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars missing: VITE_SUPABASE_URL and (VITE_SUPABASE_ANON_KEY or VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY)"
  );
}

if (usingSecretKeyInFrontend) {
  // eslint-disable-next-line no-console
  console.error("Configuración inválida: estás usando sb_secret en frontend. Usa ANON o PUBLISHABLE.");
}

// Avoid runtime crash when env vars are missing in hosted environments.
// Real operations are still protected by ensureSupabaseConfigured().
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabasePublicKey || "placeholder-anon-key"
);

export const ensureSupabaseConfigured = () => {
  if (!supabaseUrl || !supabasePublicKey) {
    throw new Error(
      "Faltan variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY (o VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY)"
    );
  }
  if (usingSecretKeyInFrontend) {
    throw new Error("Configuración inválida: no uses SUPABASE service role/secret en frontend.");
  }
};
