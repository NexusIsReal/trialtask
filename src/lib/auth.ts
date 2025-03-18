import { createSupabaseClient } from './supabase';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  id: string;
  email: string;
  full_name?: string | null;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
};

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, fullName: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

// Create auth store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      
      signIn: async (email, password) => {
        console.log('Sign in process started');
        set({ loading: true, error: null });
        
        try {
          const supabase = createSupabaseClient();
          console.log('Authenticating with Supabase...');
          
          const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (signInError) {
            console.error('Sign in error:', signInError);
            set({ error: signInError.message, loading: false });
            return false;
          }
          
          console.log('Authentication successful, checking user data');
          
          if (authData.user) {
            // Create a simplified user object from the auth data
            // This doesn't rely on a custom users table
            const userData: User = {
              id: authData.user.id,
              email: authData.user.email || '',
              full_name: authData.user.user_metadata?.full_name || null,
              created_at: authData.user.created_at,
              updated_at: authData.user.updated_at
            };
            
            console.log('User data created from auth response');
            set({ 
              user: userData,
              loading: false 
            });
            
            return true;
          } else {
            console.error('No user data in response');
            set({ error: 'Authentication failed', loading: false });
            return false;
          }
        } catch (error: unknown) {
          console.error('Login process error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({ error: errorMessage, loading: false });
          return false;
        }
      },
      
      signUp: async (email, password, fullName) => {
        console.log('Sign up process started');
        set({ loading: true, error: null });
        
        try {
          const supabase = createSupabaseClient();
          console.log('Creating account with Supabase...');
          
          const { data: authData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
              }
            }
          });
          
          if (signUpError) {
            console.error('Sign up error:', signUpError);
            set({ error: signUpError.message, loading: false });
            return false;
          }
          
          console.log('Account created successfully');
          
          if (authData.user) {
            // Create user object directly from auth data
            const userData: User = {
              id: authData.user.id,
              email: authData.user.email || '',
              full_name: fullName,
              created_at: authData.user.created_at,
              updated_at: authData.user.updated_at
            };
            
            console.log('User profile created successfully');
            set({ 
              user: userData,
              loading: false 
            });
            
            return true;
          } else {
            console.error('No user data in response');
            set({ error: 'Registration failed', loading: false });
            return false;
          }
        } catch (error: unknown) {
          console.error('Registration process error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Registration failed';
          set({ error: errorMessage, loading: false });
          return false;
        }
      },
      
      signOut: async () => {
        set({ loading: true });
        
        try {
          const supabase = createSupabaseClient();
          await supabase.auth.signOut();
          set({ user: null, loading: false, error: null });
        } catch (error: unknown) {
          console.error('Sign out error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Sign out failed';
          set({ error: errorMessage, loading: false });
        }
      },
      
      loadUser: async () => {
        set({ loading: true });
        
        try {
          const supabase = createSupabaseClient();
          console.log('Checking auth state...');
          
          const { data: authData, error: authError } = await supabase.auth.getUser();
          
          if (authError) {
            console.error('Auth state error:', authError);
            set({ user: null, loading: false });
            return;
          }
          
          if (authData.user) {
            console.log('User is authenticated, creating user data from auth');
            
            // Create user object from auth data without relying on custom table
            const userData: User = {
              id: authData.user.id,
              email: authData.user.email || '',
              full_name: authData.user.user_metadata?.full_name || null,
              created_at: authData.user.created_at,
              updated_at: authData.user.updated_at
            };
            
            console.log('User data created successfully');
            set({ 
              user: userData, 
              loading: false 
            });
          } else {
            console.log('No authenticated user found');
            set({ user: null, loading: false });
          }
        } catch (error: unknown) {
          console.error('Load user error:', error);
          set({ user: null, loading: false });
        }
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
); 