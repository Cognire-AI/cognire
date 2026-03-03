import { ReactNode } from "react";

export default function GlassCard({ children, className = "" }: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        bg-white/[0.04]
        backdrop-blur-2xl
        border border-white/10
        rounded-3xl
        shadow-[0_0_80px_rgba(99,102,241,0.12)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}