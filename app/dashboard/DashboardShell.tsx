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

      {/* Cosmic Background Glow */}
      <div className="fixed inset-0 -z-20 bg-[#070B1A]" />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-250px] left-[-200px] w-[800px] h-[800px] 
          bg-indigo-600/20 rounded-full blur-[200px]" />
        <div className="absolute bottom-[-250px] right-[-200px] w-[900px] h-[900px] 
          bg-purple-600/20 rounded-full blur-[220px]" />
      </div>

      {/* SIDEBAR */}
        <aside
          className={`
            ${collapseSidebar ? "w-20" : "w-64"}
            transition-all duration-500 ease-in-out
            backdrop-blur-xl
            bg-black/30 backdrop-blur-2xl border-r border-white/10
            border-r border-white/10
            p-6 flex flex-col justify-between
          `}
        >
                <div>
          {!collapseSidebar && (
            <h2 className="text-lg font-semibold tracking-wide mb-8 text-white/80">
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
                    px-3 py-2 rounded-lg
                    transition-all duration-300
                    ${isActive
                      ? "bg-indigo-500/20 text-white border border-indigo-400/30"
                      : "text-white/60 hover:text-white hover:bg-white/5"}
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
            className="mt-10 px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-sm font-medium transition"
          >
            Logout
          </button>
        )}
      </aside>

      {/* MAIN */}
      <main className="flex-1 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}