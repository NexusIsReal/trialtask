"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuthStore();

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
    {
      href: "/profile",
      label: "Profile",
      active: pathname === "/profile",
    },
  ];

  return (
    <header className="bg-background sticky top-0 z-10 w-full border-b">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <span className="font-bold text-xl">User App</span>
        </Link>

        {user && (
          <nav className="ml-auto flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    route.active
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium hidden md:inline">
                  {user.full_name || user.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut()}
                aria-label="Log out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
} 