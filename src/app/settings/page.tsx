import { SettingsForm } from "@/components/settings/settings-form";

export const metadata = {
  title: "Settings | User Management App",
  description: "Manage your account settings and preferences",
};

export default function SettingsPage() {
  return (
    <main className="container mx-auto py-10 max-w-5xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        <SettingsForm />
      </div>
    </main>
  );
} 