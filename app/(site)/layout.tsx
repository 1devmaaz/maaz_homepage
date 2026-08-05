import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { buildSiteGraph, getSiteUrl } from "@/lib/jsonld";

const siteUrl = getSiteUrl();

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd data={buildSiteGraph(siteUrl)} />
      <ScrollProgress />
      <CustomCursor />
      <div className="page-noise" aria-hidden="true" />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
