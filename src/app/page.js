'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Directions from '@/components/Directions';
import ProductCatalog from '@/components/ProductCatalog';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    // Обработка якоря при загрузке страницы
    const scrollToAnchor = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }, 100);
      }
    };

    // Скроллим при монтировании
    scrollToAnchor();

    // Также слушаем изменения hash
    window.addEventListener('hashchange', scrollToAnchor);

    return () => {
      window.removeEventListener('hashchange', scrollToAnchor);
    };
  }, []);

  return (
    <>
      <main>
        <Hero />
        <About />
        <Projects />
        <Directions />
        <ProductCatalog />
        <Contacts />
      </main>
    </>
  );
}
