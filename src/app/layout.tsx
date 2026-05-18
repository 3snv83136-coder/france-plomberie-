import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Trouvez un artisan qualifié près de chez vous`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Trouvez en quelques secondes un artisan qualifié et vérifié près de chez vous : plombier, électricien, chauffagiste, menuisier… Devis gratuits et avis clients certifiés partout en France.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "artisan",
    "artisans",
    "plombier",
    "électricien",
    "chauffagiste",
    "devis artisan",
    "annuaire artisans",
    "France",
  ],
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <StructuredData data={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
