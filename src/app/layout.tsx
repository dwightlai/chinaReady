import type { Metadata } from "next";
import { Lora, Manrope } from "next/font/google";
import Script from "next/script";

import { siteConfig } from "@/lib/site";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";

import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const display = Lora({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <head>
        <link href="https://cloud.umami.is" rel="preconnect" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="4a540b7a-e978-4d3b-9cb3-c585c9e42fea"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
