import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Comment Crunch",
  description: "Extract key insights from YouTube comments using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-50 dark:bg-gray-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-slate-900 dark:text-slate-50 bg-white dark:bg-gray-900 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
