import { Navbar } from "@/components/navigation/navbar";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <DashboardContent />
      </main>
    </div>
  );
} 