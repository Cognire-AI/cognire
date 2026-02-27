"use client";

import { usePathname } from "next/navigation";
import DashboardShell from "./dashboard/DashboardShell";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const collapseSidebar = pathname.includes("/dashboard/cortex");

  return (
    <DashboardShell collapseSidebar={collapseSidebar}>
      {children}
    </DashboardShell>
  );
}