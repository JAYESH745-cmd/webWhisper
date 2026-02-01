import Sidebar from "@/components/dashboard/sidebar";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "webWhisper - Dashboard",
  description: "Instantly resolve customer questions with AI-powered support.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies(); // ✅ NO await
  const metadataCookie = cookieStore.get("metadata");

  return (
    <div className="bg-[#050509] min-h-screen font-sans antialiased text-white flex">
      {/* Sidebar only if metadata exists */}
      {metadataCookie?.value && <Sidebar />}

      {/* MAIN CONTENT ALWAYS RENDERS */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
