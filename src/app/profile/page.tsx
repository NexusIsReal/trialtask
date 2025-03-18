import { Navbar } from "@/components/navigation/navbar";
import { ProfileForm } from "@/components/profile/profile-form";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <ProfileForm />
      </main>
    </div>
  );
} 