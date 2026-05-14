import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Poppins } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    default: 'ShopSmart — Sell Smarter. Manage Better. Grow Faster.',
    template: '%s | ShopSmart',
  },
  description:
    'ShopSmart is the all-in-one vendor commerce platform. Manage your storefront, inventory, POS, attendants, and analytics from one powerful dashboard.',
  keywords: ['ShopSmart', 'vendor platform', 'POS system', 'marketplace', 'inventory management', 'SaaS'],
  authors: [{ name: 'ShopSmart' }],
  creator: 'ShopSmart',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://shopsmart.ng',
    siteName: 'ShopSmart',
    title: 'ShopSmart — Sell Smarter. Manage Better. Grow Faster.',
    description: 'The all-in-one commerce platform for vendors. Storefront + POS + Inventory + Analytics.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShopSmart — Commerce Platform',
    description: 'Run your entire business from one dashboard.',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#16A34A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${poppins.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="min-h-full antialiased text-gray-900"
        style={{ fontFamily: "var(--font-body, 'Poppins', system-ui, sans-serif)" }}
      >
        {children}
      </body>
    </html>
  );
}
