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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://baomovies.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "BaoMovies - Xem Phim Rạp, Phim Bộ Trực Tuyến Miễn Phí Chất Lượng Cao",
    template: "%s | BaoMovies",
  },
  
  description:
    "BaoMovies - Nền tảng xem phim trực tuyến hàng đầu. Trải nghiệm điện ảnh đỉnh cao với kho phim rạp bom tấn, phim bộ, anime vietsub và thuyết minh chất lượng Full HD, cập nhật liên tục mỗi ngày.",
  
  keywords: [
    "BaoMovies",
    "xem phim online",
    "phim hay",
    "phim rạp",
    "phim bộ",
    "phim hành động",
    "phim vietsub",
    "phim thuyết minh",
    "phim chiếu rạp mới nhất",
    "phim netflix",
    "xem phim full hd",
    "phim anime",
    "tv series",
    "web xem phim miễn phí"
  ],

  authors: [{ name: "BaoMovies Team", url: SITE_URL }],
  creator: "BaoMovies",
  publisher: "BaoMovies",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: "BaoMovies - Trải nghiệm điện ảnh đỉnh cao",
    description:
      "Khám phá hàng ngàn bộ phim bom tấn chất lượng cao hoàn toàn miễn phí. BaoMovies - Rạp phim tại nhà của bạn.",
    url: SITE_URL,
    siteName: "BaoMovies",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BaoMovies - Xem Phim Chất Lượng Cao",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },

  //Khung xem trước khi share Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "BaoMovies - Trải nghiệm điện ảnh đỉnh cao",
    description: "Cập nhật liên tục các bộ phim rạp, TV series hot nhất với chất lượng Full HD.",
    creator: "@baomovies",
    images: ["/assets/og-image.jpg"],
  },

  //Cấu hình cho Bot của Google
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  //Cấu hình  icon cho Apple (iPhone/iPad)
  icons: {
    apple: [
      { url: "/assets/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  //Các cấu hình tối ưu thêm cho Trình duyệt & Thiết bị di động
  category: "Entertainment & Movies",
  classification: "Entertainment",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: "Next.js",
  applicationName: "BaoMovies",
  appleWebApp: {
    title: "BaoMovies",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/jpeg",
  },
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