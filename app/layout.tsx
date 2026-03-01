import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden text-white">

        {/* 🌌 GLOBAL COSMIC BACKGROUND */}

        {/* Deep Space Base */}
        <div className="fixed inset-0 -z-50 bg-[#050816]" />

        {/* Main Cosmic Gradient */}
        <div className="fixed inset-0 -z-40 bg-gradient-to-br 
          from-[#0B1026] 
          via-[#0A0F1F] 
          to-[#050816]" 
        />

        {/* Top Left Nebula */}
        <div className="fixed -top-64 -left-64 w-[1000px] h-[1000px]
          bg-indigo-600/30 rounded-full blur-[250px] -z-30"
        />

        {/* Bottom Right Nebula */}
        <div className="fixed -bottom-80 -right-64 w-[1100px] h-[1100px]
          bg-purple-600/30 rounded-full blur-[260px] -z-30"
        />

        {/* Center Soft Glow */}
        <div className="fixed inset-0 
          bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_60%)] 
          -z-20"
        />

        {children}
      </body>
    </html>
  );
}