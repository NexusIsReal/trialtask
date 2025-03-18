import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md px-4 py-8 mx-auto">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>
        
        <LoginForm />
        
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
} 