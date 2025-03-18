import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-background sticky top-0 z-10 w-full border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <div className="flex-1">
            <span className="font-bold text-xl">User App</span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link 
              href="/login"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Login
            </Link>
            <Button asChild size="sm">
              <Link href="/register">
                Register
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      
      <div className="flex-1 flex items-center">
        <div className="container px-4 md:px-6 space-y-10 py-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              User Management Application
            </h1>
            <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
              A modern web application with authentication, dashboard, and profile management
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Login to Your Account</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Authentication</h3>
              <p className="text-muted-foreground">Secure user authentication with email and password.</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Dashboard</h3>
              <p className="text-muted-foreground">User-friendly dashboard with personal information and statistics.</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">API Access</h3>
              <p className="text-muted-foreground">RESTful API endpoints to access and manage user data.</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16 px-4 sm:px-6">
          <p className="text-sm text-muted-foreground">
            © 2025 User Management App. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link 
              href="/login"
              className="text-sm text-muted-foreground hover:underline"
            >
              Login
            </Link>
            <Link 
              href="/register"
              className="text-sm text-muted-foreground hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
