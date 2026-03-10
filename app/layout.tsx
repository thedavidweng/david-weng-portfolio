import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400"
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
    "Portfolio homepage for David Weng, a cross-media creative working across video editing, photography, design, and AI-integrated creative workflows."
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
