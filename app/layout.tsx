import type { Metadata, Viewport } from "next";
import { StrictMode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { body, display, homeZh, mono } from "@/lib/fonts";
import { buildWebSiteSchema, buildPersonSchema } from "@/lib/jsonld";
import "react-photo-album/rows.css";
import "./globals.css";

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
        <StrictMode>{children}</StrictMode>
        <JsonLd data={buildPersonSchema("en")} />
        <JsonLd data={buildWebSiteSchema("en")} />
      </body>
    </html>
  );
}
