import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    template: "%s | DIY Tuin",
    default: "DIY Tuin",
  },
  description: "Plan en visualiseer uw droomtuin met DIY Tuin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable} suppressHydrationWarning>
        <header>
          <Navbar />
        </header>
        <main>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </main>
        <footer className="footer">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
