import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True si las variables de Supabase están definidas (auth opcional). */
export const isSupabaseConfigured =
  Boolean(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient | null = null;

if (isSupabaseConfigured && supabaseUrl && supabaseAnonKey) {
  client = createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Cliente de Supabase. Solo disponible cuando NEXT_PUBLIC_SUPABASE_URL y
 * NEXT_PUBLIC_SUPABASE_ANON_KEY están definidos. Usar isSupabaseConfigured
 * antes de llamar a métodos de auth.
 */
export const supabase = client;

/** Devuelve el cliente solo si está configurado (útil en route handlers). */
export function getSupabase(): SupabaseClient | null {
  return client;
}

/** Cliente para uso en páginas auth; lanza si Supabase no está configurado. */
export function getSupabaseOrThrow(): SupabaseClient {
  if (!client) throw new Error("Supabase is not configured");
  return client;
}
