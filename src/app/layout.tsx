import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/style/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.site_title || "QrMenu",
  description: "DinamikUp QrMenu | Ali TEK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning suppressContentEditableWarning
      >
        {children}
      </body>
    </html>
  );
}
