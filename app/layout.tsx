import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-heading-geist",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-ui-geist",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ঘরোয়া স্বাদ রেস্টুরেন্ট — ডিজিটাল মেনু",
  description: "মহিলা কলেজ রোড, খাগড়াছড়ি সদর। ঘরে তৈরি খাঁটি স্ন্যাকস, জুস, পাস্তা ও ডিনার ডিজিটাল মেনু।",
  openGraph: {
    title: "ঘরোয়া স্বাদ রেস্টুরেন্ট — ডিজিটাল মেনু",
    description: "মহিলা কলেজ রোড, খাগড়াছড়ি সদর। ঘরে তৈরি খাঁটি স্ন্যাকস, জুস, পাস্তা ও ডিনার ডিজিটাল মেনু।",
    type: "website",
    locale: "bn_BD",
  },
};

export const viewport: Viewport = {
  themeColor: "#151515",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable}`}
    >
      <body className="antialiased font-sans bg-[var(--bg-base)] text-[var(--tone-strong)]">
        {children}
      </body>
    </html>
  );
}
