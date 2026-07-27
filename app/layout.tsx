import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SiteJsonLd } from '@/components/seo/SiteJsonLd';
import { AnalyticsScripts } from '@/components/analytics/AnalyticsScripts';
import { analyticsConfig } from '@/lib/config/env';
import { siteConfig } from '@/lib/config/site';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT', 'WONK'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Penny and Planet — Money & Sustainable Living',
    template: '%s | Penny and Planet',
  },
  description:
    'Penny and Planet helps you build financial wellbeing while living more sustainably — practical guides on budgeting, saving, investing, and eco-friendly living.',
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: 'Penny and Planet',
    title: 'Penny and Planet — Money & Sustainable Living',
    description:
      'Practical, research-driven guidance for building wealth and living more sustainably.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Penny and Planet — Money & Sustainable Living',
    description:
      'Practical, research-driven guidance for building wealth and living more sustainably.',
  },
  icons: {
    icon: '/favicon.ico',
  },
  ...(analyticsConfig.googleSiteVerification
    ? { verification: { google: analyticsConfig.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: '#1F3D2E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteJsonLd />
        <AnalyticsScripts />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
