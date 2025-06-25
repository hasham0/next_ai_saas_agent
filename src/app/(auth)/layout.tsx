import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Meet_ai Agent",
    template: "%s | Meet_ai Agent",
  },
};
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
    </div>
  );
}
