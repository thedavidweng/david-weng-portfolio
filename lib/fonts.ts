import localFont from "next/font/local";

export const display = localFont({
  src: "../public/fonts/outfit-latin-wght-normal.woff2",
  variable: "--font-display",
  display: "swap",
  preload: true
});

export const body = localFont({
  src: "../public/fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
  preload: true
});

export const homeZh = localFont({
  src: [
    {
      path: "../public/fonts/noto-sans-sc-chinese-simplified-400-normal.woff2",
      weight: "400"
    },
    {
      path: "../public/fonts/noto-sans-sc-chinese-simplified-700-normal.woff2",
      weight: "700"
    },
    {
      path: "../public/fonts/noto-sans-sc-chinese-simplified-900-normal.woff2",
      weight: "900"
    }
  ],
  variable: "--font-home-zh",
  display: "swap",
  preload: false
});

export const mono = localFont({
  src: [
    {
      path: "../public/fonts/ibm-plex-mono-latin-400-normal.woff2",
      weight: "400"
    },
    {
      path: "../public/fonts/ibm-plex-mono-latin-500-normal.woff2",
      weight: "500"
    },
    {
      path: "../public/fonts/ibm-plex-mono-latin-600-normal.woff2",
      weight: "600"
    }
  ],
  variable: "--font-mono",
  display: "swap",
  preload: false
});