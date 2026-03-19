import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Cấu hình SEO cơ bản
export const metadata: Metadata = {
  title: "BaoMovies - Xem phim thả ga",
  description: "Dự án web info với Next.js",
};

// Layout chính của ứng dụng
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black-main text-white flex flex-col min-h-screen overflow-x-hidden`}
      >
        <QueryProvider>
          {/* Header */}
          <Header />
          
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}