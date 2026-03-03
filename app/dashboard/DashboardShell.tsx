"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { ReactNode } from "react";

export default function DashboardShell({
  children,
  collapseSidebar = false,
}: {
  children: ReactNode;
  collapseSidebar?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Cortex", href: "/dashboard/cortex", special: true },
    { name: "Cover Letter", href: "/dashboard/cover-letter" },
    { name: "Interview Prep", href: "/dashboard/interview-prep" },
  ];

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="flex min-h-screen text-white relative z-10">

      {/* Sidebar */}
      <aside
        className={`
          ${collapseSidebar ? "w-20" : "w-64"}
          transition-all duration-500 ease-in-out
          cosmic-glass
          p-6 flex flex-col justify-between
        `}
      >
        <div>
          {!collapseSidebar && (
            <h2 className="text-lg font-semibold tracking-wide mb-10 text-white/80">
              Cognire
            </h2>
          )}

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center justify-between
                    px-4 py-2 rounded-xl transition-all
                    ${isActive
                      ? "bg-indigo-500/20 border border-indigo-400/30"
                      : "hover:bg-white/5 text-white/60 hover:text-white"}
                  `}
                >
                  {!collapseSidebar && (
                    <span className="text-sm font-medium">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {!collapseSidebar && (
          <button
            onClick={handleLogout}
            className="mt-10 px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </aside>

      {/* Main */}
      <main className="flex-1 p-16">
        {children}
      </main>
    </div>
  );
}