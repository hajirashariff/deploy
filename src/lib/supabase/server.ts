import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client
export const createServerClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://brrxycurclfueamhiico.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJycnh5Y3VyY2xmdWVhbWhpaWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNTM4MzUsImV4cCI6MjA3NDkyOTgzNX0.z1HgDrMgAajdwWSQtbov6MEB6fbwOtEAJt6OFom_r_I'
  )
}

// Legacy export for backward compatibility
export const createServerSupabaseClient = createServerClient

