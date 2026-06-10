import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Polla Mundial 2026",
  description: "Predice los marcadores del Mundial 2026 con tus amigos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} antialiased`}>
      <body>
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
