"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/auth";

// Define form schema with Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { signIn, error, loading, user, clearError } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Login form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Clear errors when form values change
  useEffect(() => {
    const subscription = form.watch(() => {
      if (formError) setFormError(null);
      if (error) clearError();
    });
    return () => subscription.unsubscribe();
  }, [form, formError, error, clearError]);

  // Handle successful authentication
  useEffect(() => {
    if (user && !loading) {
      // Navigate to dashboard
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  // Handle login form submission
  async function onSubmit(values: LoginFormValues) {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormError(null);
    
    try {
      console.log("Starting login process...");
      const success = await signIn(values.email, values.password);
      
      if (success) {
        console.log("Login successful, redirecting...");
      } else {
        console.log("Login unsuccessful");
        setFormError("Login failed. Please check your credentials and try again.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setFormError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {(error || formError) && (
          <p className="text-sm font-medium text-destructive">
            {error || formError}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={loading || isSubmitting}>
          {loading || isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
} 