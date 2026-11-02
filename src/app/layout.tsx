import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { BookingProvider } from "@/components/booking/BookingDrawer";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { resort } from "@/content/resort";
import { siteUrl } from "@/lib/config";
import { resortJsonLd } from "@/lib/seo";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${resort.name} | Beach Resort on the ECR, Mahabalipuram`,
    template: `%s | ${resort.name}`,
  },
  description: resort.description,
  applicationName: resort.name,
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: { siteName: resort.name, locale: "en_IN", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#12232f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
      <head>
        <noscript>
          {/* Without JavaScript, show content that would otherwise be revealed on scroll. */}
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>
        <BookingProvider>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
          <MobileBookBar />
        </BookingProvider>
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(resortJsonLd()) }}
        />
      </body>
    </html>
  );
}
