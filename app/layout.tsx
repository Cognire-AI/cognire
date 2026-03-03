import "./globals.css";
import { ReactNode } from "react";
import CosmicCanvas from "@/components/CosmicCanvas";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white">
        <CosmicCanvas />
        {children}
      </body>
    </html>
  );
}