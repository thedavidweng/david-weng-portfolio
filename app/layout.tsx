import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Outfit, Manrope, Noto_Sans_SC } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "react-photo-album/rows.css";
import "./globals.css";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true
});

const homeZh = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-home-zh",
  weight: ["400", "700", "900"],
  display: "swap",
  preload: false
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false
});

const siteUrl = "https://davidweng.eu.org";

export const metadata: Metadata = {
  title: "David Weng | Visual Storytelling, Design, and Creative Systems",
  description:
    "Portfolio of David Weng — video editing, photography, graphic design, and content operations.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      zh: "/zh/"
    }
  },
  openGraph: {
    type: "website",
    locale: "en",
    alternateLocale: "zh",
    siteName: "David Weng",
    title: "David Weng | Visual Storytelling, Design, and Creative Systems",
    description:
      "Portfolio of David Weng — video editing, photography, graphic design, and content operations.",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "David Weng — Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "David Weng | Visual Storytelling, Design, and Creative Systems",
    description:
      "Portfolio of David Weng — video editing, photography, graphic design, and content operations.",
    images: ["/brand/og-image.png"]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "David Weng"
  },
  icons: {
    icon: "/brand/favicon.png",
    shortcut: "/brand/favicon.png",
    apple: "/brand/favicon.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#070607"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${homeZh.variable} ${mono.variable}`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
