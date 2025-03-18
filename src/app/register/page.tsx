import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md px-4 py-8 mx-auto">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your information to create an account
          </p>
        </div>
        
        <RegisterForm />
        
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
} 