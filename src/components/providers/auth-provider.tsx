"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

const publicRoutes = ["/", "/login", "/register"];
const authRoutes = ["/login", "/register"];

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, loading, loadUser } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Initial load of user data
  useEffect(() => {
    const init = async () => {
      console.log("AuthProvider: Initializing and loading user data");
      try {
        await loadUser();
        console.log("AuthProvider: User load complete", { hasUser: !!user });
      } catch (error) {
        console.error("AuthProvider: Error loading user:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    
    init();
  }, [loadUser, user]);
  
  // Handle redirections based on auth state
  useEffect(() => {
    if (isLoaded && !loading) {
      const isPublicRoute = publicRoutes.includes(pathname);
      const isAuthRoute = authRoutes.includes(pathname);
      
      console.log("AuthProvider: Checking navigation", {
        isLoaded,
        loading,
        hasUser: !!user,
        pathname,
        isPublicRoute,
        isAuthRoute
      });
      
      // If user is logged in and trying to access login/register pages
      if (user && isAuthRoute) {
        console.log("AuthProvider: Redirecting authenticated user from auth route to dashboard");
        router.push("/dashboard");
        return;
      }
      
      // If user is not logged in and trying to access protected routes
      if (!user && !isPublicRoute) {
        console.log("AuthProvider: Redirecting unauthenticated user to login");
        router.push("/login");
        return;
      }
      
      console.log("AuthProvider: No redirection needed");
    }
  }, [user, loading, pathname, router, isLoaded]);
  
  // Show nothing until initial auth state is determined
  if (!isLoaded) {
    console.log("AuthProvider: Still loading, rendering nothing");
    return null;
  }
  
  console.log("AuthProvider: Rendering children", {
    isLoaded,
    loading,
    hasUser: !!user,
    pathname
  });
  
  return <>{children}</>;
} 