'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
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
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
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
