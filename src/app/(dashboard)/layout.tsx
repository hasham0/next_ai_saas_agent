import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import DashboardNavbar from "@/modules/dashboard/ui/components/dashboard-navbar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";

export const metadata: Metadata = {
  title: {
    default: "Meet_ai Agent",
    template: "%s | Meet_ai Agent",
  },
};
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="bg-muted flex h-screen w-screen flex-col">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
