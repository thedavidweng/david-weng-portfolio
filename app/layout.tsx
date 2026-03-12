import type { Metadata, Viewport } from "next";
import { Playfair_Display, IBM_Plex_Mono, Manrope } from "next/font/google";
import "react-photo-album/rows.css";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "David Weng | Visual Storytelling, Design, and Creative Systems",
  description:
    "Portfolio homepage for David Weng, a cross-media creative working across video editing, photography, design, and AI-integrated creative workflows.",
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
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
