"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BotIcon, StarIcon, VideoIcon, type LucideIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import DashboardUserButton from "@/modules/dashboard/ui/components/dashboard-user-button";

type SectionTS = {
  icon: LucideIcon;
  label: string;
  href: string;
};

const firstSection: Array<SectionTS> = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];
const startSection: Array<SectionTS> = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href={"/"} className="flex items-center gap-2 pt-2">
          <Image src="/assets/logo.svg" alt="Meet AI" width={32} height={32} />
          <p className="text-2xl font-semibold">Meet.AI</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="text-[#5D6B68] opacity-10" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      "from-sidebar-accent via-sidebar/50 to-sidebar/50 h-10 border border-transparent from-5% via-30% hover:border-[#5D6B68]/10 hover:bg-linear-to-r/oklch",
                      pathname === item.href &&
                        "border-[#5D6B68]/10 bg-linear-to-r/oklch"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-4 py-2">
          <Separator className="text-[#5D6B68] opacity-10" />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {startSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      "from-sidebar-accent via-sidebar/50 to-sidebar/50 h-10 border border-transparent from-5% via-30% hover:border-[#5D6B68]/10 hover:bg-linear-to-r/oklch",
                      pathname === item.href &&
                        "border-[#5D6B68]/10 bg-linear-to-r/oklch"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-4 text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
