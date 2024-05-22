import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/Context/AppContext";
import App from "next/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yet Another Client",
  description: "yet another client for farcaster",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppProvider>
        <body className={inter.className}>{children}</body>
      </AppProvider>
    </html>
  );
}
