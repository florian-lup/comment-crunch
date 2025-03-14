import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UI_CONSTANTS } from "@/config";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${UI_CONSTANTS.APP_NAME}`,
    default: UI_CONSTANTS.APP_NAME,
  },
  description: UI_CONSTANTS.APP_DESCRIPTION,
  keywords: UI_CONSTANTS.DEFAULT_TAGS,
  authors: [
    {
      name: "Comment Crunch Team",
    },
  ],
  creator: "Comment Crunch Team",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body
        className={`${inter.variable} antialiased text-[#37352f] bg-white min-h-screen`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
