import { Montserrat, Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata = {
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/favicon/favicon.svg',
      },
    ],
    shortcut: '/favicon/favicon.svg',
    apple: '/favicon/favicon.svg',
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang='ru'>
      <body className={`${montserrat.variable} ${manrope.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
