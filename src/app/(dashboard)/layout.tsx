import { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";

export const metadata: Metadata = {
  title: {
    default: "Meet_ai Agent",
    template: "%s | Meet_ai Agent",
  },
};
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="bg-muted flex h-screen w-screen flex-col">
        {children}
      </main>
    </SidebarProvider>
  );
}
