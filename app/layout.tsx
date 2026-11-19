import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import type { Metadata, Viewport } from "next";
import PwaServiceWorker from "@/components/PwaServiceWorker";
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
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ঘরোয়া স্বাদ রেস্টুরেন্ট — ডিজিটাল মেনু",
  description: "মহিলা কলেজ রোড, খাগড়াছড়ি সদর। ঘরে তৈরি খাঁটি স্ন্যাকস, জুস, পাস্তা ও ডিনার ডিজিটাল মেনু।",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ঘরোয়া স্বাদ",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
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
  maximumScale: 5,
  viewportFit: "cover",
};

const themeInitScript = `(function(){try{var s=localStorage.getItem('gs-dark');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='true'||(s===null&&p)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`;
const themeScriptObj = { dangerouslySetInnerHTML: { __html: themeInitScript } };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable}`}
    >
      <head>
        <script {...themeScriptObj} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ঘরোয়া স্বাদ" />
      </head>
      <body className="antialiased font-sans bg-[var(--bg-base)] text-[var(--tone-strong)]">
        <PwaServiceWorker />
        {children}
      </body>
    </html>
  );
}
