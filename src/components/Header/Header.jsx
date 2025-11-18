'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  const pagesWithScrollEffect = [
    '/',
    '/projects/expo-2017',
    '/projects/vladivostok-hotel',
  ];

  const shouldApplyScrollEffect = pagesWithScrollEffect.includes(pathname);

  const handleNavClick = (e, href) => {
    e.preventDefault();

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
      // Если мы не на главной странице, переходим на главную с якорем
      window.location.href = `/${href}`;
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (!shouldApplyScrollEffect) {
      setIsScrolled(true);
      setScrollProgress(1);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerHeight = 100;
      const maxHeight = 300;

      const progress = Math.min(
        (scrollY - triggerHeight) / (maxHeight - triggerHeight),
        1
      );
      setScrollProgress(Math.max(0, progress));
      setIsScrolled(scrollY > triggerHeight);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [shouldApplyScrollEffect]);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${
        !shouldApplyScrollEffect ? styles.alwaysOpaque : ''
      }`}
      style={
        shouldApplyScrollEffect
          ? {
              '--scroll-progress': scrollProgress,
            }
          : undefined
      }
    >
      <div className={styles.container}>
        <Link href='/' className={styles.logoIcon}>
          <Image
            src='/icons/Header/logo-fire.svg'
            alt='Огнещит'
            width={50}
            height={50}
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
            href='#portfolio'
            className={styles.navLink}
            onClick={(e) => handleNavClick(e, '#portfolio')}
          >
            Портфолио
          </a>
          <a
            href='#directions'
            className={styles.navLink}
            onClick={(e) => handleNavClick(e, '#directions')}
          >
            Направления
          </a>
          <a
            href='#catalog'
            className={styles.navLink}
            onClick={(e) => handleNavClick(e, '#catalog')}
          >
            Каталог продукции
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
          <a href='tel:+78003339591' className={styles.phone}>
            +7 (800) 333-95-91
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
