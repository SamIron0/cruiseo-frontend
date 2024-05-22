import getListings from '@/db/listings';
import SupabaseProvider from './supabase-provider';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/navbar/NavBar';
import { cn } from '@/utils/helpers';
import { PropsWithChildren } from 'react';
import 'styles/main.css';
import { ListingsProvider, useListings } from './providers/ListingProvider';
import ToasterProvider from './providers/ToasterProvider';
import ClientOnly from '@/components/ClientOnly';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import SearchModal from '@/components/modals/SearchModal';
import "./globals.css"
const meta = {
  title: 'Cruiseo Ride Share',
  description: 'Brought to you by Samuel.',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: 'https://cruiseo.xyz',
  type: 'website'
};

export const metadata = {
  title: meta.title,
  description: meta.description,
  robots: meta.robots,
  favicon: meta.favicon,
  url: meta.url,
  type: meta.type,
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    type: meta.type,
    site_name: meta.title
  },
  twitter: {
    card: 'summary_large_image',
    site: '@getcruiseo',
    title: meta.title,
    description: meta.description
  }
};
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LSKBCKW7SS"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-LSKBCKW7SS');
              `
          }}
        ></script>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.css"
          rel="stylesheet"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <SupabaseProvider>
          <ListingsProvider>
            <ClientOnly>
              <ToasterProvider />
            </ClientOnly>
            <div className="bg-black flex flex-row justify-center">
              {children}
            </div>
            <SpeedInsights />
            <Analytics />
            <Footer />
          </ListingsProvider>
        </SupabaseProvider>
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}
