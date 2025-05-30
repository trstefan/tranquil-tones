import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

export const metadata: Metadata = {
  title: "Tranquil Tones",
  description:
    " Enhance Relaxation, Improve Sleep, and Boost Focus with Soothing Audio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-gradient-to-b from-lime-200 to-green-800">
        {children}
      </body>
    </html>
  );
}
