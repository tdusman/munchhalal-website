import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { SeedInitializer } from './seed-initializer';

export const metadata: Metadata = {
  title: 'Munchhalal – Find Halal Restaurants in Canada',
  description: 'Discover certified halal restaurants near you across Canada. Browse by city, cuisine, and halal certification.',
  keywords: 'halal restaurants, halal food canada, halal near me, certified halal',
  openGraph: {
    title: 'Munchhalal – Find Halal Restaurants in Canada',
    description: 'Discover certified halal restaurants near you across Canada. Browse by city, cuisine, and halal certification.',
    url: 'https://munchhalal.ca',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <SeedInitializer />
        {children}
        {/* TODO: Replace G-XXXXXXXXXX with actual GA4 Measurement ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX');`}
        </Script>
      </body>
    </html>
  );
}
