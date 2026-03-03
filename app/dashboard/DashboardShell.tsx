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
    <div className="flex min-h-screen text-white">

      {/* SIDEBAR */}
      <aside
        className={`
          ${collapseSidebar ? "w-20" : "w-64"}
          transition-all duration-500 ease-in-out
          bg-white/[0.03]
          backdrop-blur-2xl
          border-r border-white/10
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
              const isStudio = item.special;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center justify-between
                    px-4 py-2 rounded-xl
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-white/10 border border-white/20 text-white"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  {!collapseSidebar && (
                    <span className="text-sm font-medium">
                      {item.name}
                    </span>
                  )}

                  {isStudio && !collapseSidebar && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-indigo-400/40 text-indigo-300">
                      AI
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
            className="mt-10 px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-sm font-medium transition"
          >
            Logout
          </button>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-12 py-20">
          {children}
        </div>
      </main>
    </div>
  );
}