import { createClient } from '@supabase/supabase-js';

// Database types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// User table types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
          avatar_url: string | null
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
          avatar_url?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
          avatar_url?: string | null
        }
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

// Check Supabase environment variables
function validateSupabaseConfig() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
    return false;
  }
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
    return false;
  }
  
  return true;
}

// Create a Supabase client for use on the client-side
export const createSupabaseClient = () => {
  const isValid = validateSupabaseConfig();
  
  if (!isValid) {
    throw new Error('Supabase configuration is invalid. Check console for details.');
  }
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  try {
    console.log(`Creating Supabase client with URL: ${url.substring(0, 10)}...`);
    return createClient<Database>(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    throw new Error('Failed to initialize Supabase client');
  }
}; 