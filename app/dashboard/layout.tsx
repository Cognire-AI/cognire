"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Intelligence Studio", href: "/dashboard/studio", special: true },
    { name: "Cover Letter", href: "/dashboard/cover-letter" },
    { name: "Interview Prep", href: "/dashboard/interview-prep" },
  ];

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* ───────── Sidebar ───────── */}
      <aside className="w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-lg font-semibold tracking-wide mb-8 text-white/90">
            AI Job OS
          </h2>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isStudio = item.special;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group relative flex items-center justify-between px-4 py-2.5 rounded-lg
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <span className="text-sm font-medium tracking-wide">
                    {item.name}
                  </span>

                  {/* AI Badge for Studio */}
                  {isStudio && (
                    <span
                      className={`
                        text-[10px] px-2 py-0.5 rounded-full
                        border border-indigo-400/40
                        text-indigo-300
                        ${
                          !isActive
                            ? "opacity-70 group-hover:opacity-100"
                            : ""
                        }
                      `}
                    >
                      AI
                    </span>
                  )}

                  {/* Subtle glow indicator for Studio */}
                  {isStudio && (
                    <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-indigo-400/70 blur-sm animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 px-4 py-2 rounded-lg bg-red-600/90 hover:bg-red-600 text-sm font-medium transition"
        >
          Logout
        </button>
      </aside>

      {/* ───────── Main Content ───────── */}
      <main className="flex-1 p-12 bg-black">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}