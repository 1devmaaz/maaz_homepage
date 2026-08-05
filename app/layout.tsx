import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { themeInitScript } from "@/lib/theme-script";
import { site } from "@/data/site";
import { getSiteUrl } from "@/lib/jsonld";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: siteUrl,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/maazwebsitesocialshare.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — Software Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/maazwebsitesocialshare.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
