"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const navRef = useRef(null);
  const mobileContactRef = useRef(null);

  const pagesWithScrollEffect = [
    "/",
    "/projects/expo-2017",
    "/projects/vladivostok-hotel",
  ];

  const shouldApplyScrollEffect = pagesWithScrollEffect.includes(pathname);

  const resetAnimations = () => {
    // Сбрасываем анимации при открытии/закрытии мобильного меню
    if (navRef.current && mobileContactRef.current) {
      const elements = [
        navRef.current,
        mobileContactRef.current,
        ...navRef.current.querySelectorAll(`.${styles.navLink}`),
        ...mobileContactRef.current.querySelectorAll(
          `.${styles.mobilePhone}, .${styles.mobileEmail}`
        ),
      ];

      elements.forEach((element) => {
        if (element) {
          element.classList.add(styles.resetAnimation);
          void element.offsetWidth; // Принудительный reflow
          element.classList.remove(styles.resetAnimation);
        }
      });
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();

    if (pathname === "/") {
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
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
    if (!isMobileMenuOpen) {
      // При открытии меню сбрасываем анимации
      resetAnimations();
    }
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [shouldApplyScrollEffect]);

  return (
    <header
      className={`${styles.header} ${
        !shouldApplyScrollEffect ? styles.alwaysOpaque : ""
      } ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}
      style={
        shouldApplyScrollEffect && isScrolled
          ? {
              background: "rgba(40, 40, 40, 0.45)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 2px 20px rgba(0, 0, 0, 0.49)",
            }
          : shouldApplyScrollEffect
          ? {
              background: "rgba(40, 40, 40, 0)",
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(0px)",
            }
          : {
              background: "rgba(40, 40, 40, 0.45)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 2px 20px rgba(0, 0, 0, 0.49)",
            }
      }
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logoIcon}>
          <Image
            src="/icons/Header/logo-fire.svg"
            alt="Огнещит"
            width={50}
            height={50}
            priority
          />
        </Link>
        <nav
          ref={navRef}
          className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ""}`}
        >
          <a
            href="#about"
            className={styles.navLink}
            onClick={(e) => handleNavClick(e, "#about")}
          >
            О компании
          </a>
          <a
            href="#portfolio"
            className={styles.navLink}
            onClick={(e) => handleNavClick(e, "#portfolio")}
          >
            Портфолио
          </a>
          <a
            href="#directions"
            className={styles.navLink}
            onClick={(e) => handleNavClick(e, "#directions")}
          >
            Направления
          </a>
          <a
            href="#catalog"
            className={styles.navLink}
            onClick={(e) => handleNavClick(e, "#catalog")}
          >
            Каталог продукции
          </a>
          <a
            href="#contacts"
            className={styles.navLink}
            onClick={(e) => handleNavClick(e, "#contacts")}
          >
            Контакты
          </a>

          {/* Мобильные контакты */}
          <div ref={mobileContactRef} className={styles.mobileContactInfo}>
            <a href="tel:+78003339591" className={styles.mobilePhone}>
              +7 (800) 333-95-91
            </a>
            <a href="mailto:zakaz@ogneshit.ru" className={styles.mobileEmail}>
              zakaz@ogneshit.ru
            </a>
          </div>
        </nav>
        <div className={styles.contactInfo}>
          <a href="tel:+78003339591" className={styles.phone}>
            +7 (800) 333-95-91
          </a>
          <a href="mailto:zakaz@ogneshit.ru" className={styles.email}>
            zakaz@ogneshit.ru
          </a>
        </div>
        <button
          className={`${styles.mobileMenuButton} ${
            isMobileMenuOpen ? styles.open : ""
          }`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
