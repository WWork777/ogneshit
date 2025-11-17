'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const handleNavClick = (e, href) => {
    e.preventDefault();

    // Если мы на главной странице, скроллим к элементу
    if (pathname === '/') {
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setIsMobileMenuOpen(false);
      }
    } else {
      // Если мы на другой странице, переходим на главную с якорем
      // Используем window.location для правильной обработки якоря
      window.location.href = `/${href}`;
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Находим Hero блок - это первый section на странице
      const heroElement =
        document.querySelector('section:first-of-type') ||
        document.querySelector('[class*="hero"]') ||
        document.querySelector('.hero');

      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        const heroBottom = heroRect.bottom;

        // Если нижняя граница Hero прошла верх экрана (с небольшим запасом), значит покинули Hero блок
        setIsScrolled(heroBottom < 100); // -100 для небольшого запаса
      } else {
        // Если Hero не найден, используем простое условие по скроллу
        setIsScrolled(window.scrollY > 100);
      }
    };

    // Проверяем при монтировании
    handleScroll();

    // Добавляем обработчик скролла
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href='/' className={styles.logoIcon}>
          <Image
            src='/icons/Header/logo-fire.svg'
            alt='Огнещит'
            width={64}
            height={64}
            priority
          />
        </Link>
        <nav
          className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}
        >
          <a
            href='#about'
            className={styles.navLink}
            onClick={(e) => handleNavClick(e, '#about')}
          >
            О компании
          </a>
          <a
            href='#catalog'
            className={styles.navLink}
            onClick={(e) => handleNavClick(e, '#catalog')}
          >
            Каталог продукции
          </a>
          <a
            href='#directions'
            className={styles.navLink}
            onClick={(e) => handleNavClick(e, '#directions')}
          >
            Направления
          </a>
          <a
            href='#portfolio'
            className={styles.navLink}
            onClick={(e) => handleNavClick(e, '#portfolio')}
          >
            Портфолио
          </a>
          <a
            href='#contacts'
            className={styles.navLink}
            onClick={(e) => handleNavClick(e, '#contacts')}
          >
            Контакты
          </a>
        </nav>
        <div className={styles.contactInfo}>
          <a href='tel:+7900000000' className={styles.phone}>
            +7900000000
          </a>
          <a href='mailto:zakaz@ogneshit.ru' className={styles.email}>
            zakaz@ogneshit.ru
          </a>
        </div>
        <button
          className={`${styles.mobileMenuButton} ${
            isMobileMenuOpen ? styles.open : ''
          }`}
          onClick={toggleMobileMenu}
          aria-label='Toggle menu'
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
