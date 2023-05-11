import type { Metadata } from "next";

// These styles apply to every route in the application
import "./globals.css";

export const metadata: Metadata = {
  title: "Optimal React Test App",
  description: "Optimal React Test App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50">{children}</body>
    </html>
  );
}
