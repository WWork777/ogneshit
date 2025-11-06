import { Montserrat, Manrope } from 'next/font/google';
import './globals.css';

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
  title: 'СПО «ОГНЕЩИТ» - Огнезащита, которой доверяют по всей России',
  description:
    'Производство и монтаж сертифицированных противопожарных конструкций. Комплексные решения для обеспечения пожарной безопасности.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='ru'>
      <body className={`${montserrat.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
