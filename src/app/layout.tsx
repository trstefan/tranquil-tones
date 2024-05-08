import type { Metadata } from "next";
import { ThemeProvider } from "@/components/Theme-Provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Sleep Serenade",
  description:
    "Sleep Serenade is an app with nature sounds to help you focus, sleep, relax and relieve stress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
