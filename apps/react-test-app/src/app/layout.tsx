import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

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
      <body className="font-sans bg-gray-100/80">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
