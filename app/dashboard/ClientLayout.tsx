"use client";

import { usePathname } from "next/navigation";
import DashboardShell from "./DashboardShell";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Collapse sidebar automatically for Cortex
  const collapseSidebar = pathname.includes("/dashboard/cortex");

  return (
    <DashboardShell collapseSidebar={collapseSidebar}>
      {children}
    </DashboardShell>
  );
}