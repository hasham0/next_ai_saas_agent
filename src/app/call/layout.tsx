import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: {
    default: "Meet_ai Agent",
    template: "%s | Meet_ai Agent",
  },
};
export default async function CallLayout({
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

  return <main className="h-screen bg-black">{children}</main>;
}
