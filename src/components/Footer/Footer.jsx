'use client';
import Image from 'next/image';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Image
                src='/icons/Header/logo-fire.svg'
                alt='Огнещит'
                width={64}
                height={64}
                priority
              />
            </div>
            <span className={styles.logoText}>
              СПО «ОГНЕЩИТ»
              <sup className={styles.trademark}>®</sup>
            </span>
          </div>
          <div className={styles.contactInfo}>
            <a href='tel:+78003339591' className={styles.phone}>
              +7 (800) 333-95-91
            </a>
            <a href='tel:+73832898058' className={styles.phone}>
              +7 (383) 28-98-058
            </a>
            <p className={styles.address}>
              Новосибирск, ул. Богдана Хмельницкого 90/3
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <nav className={styles.nav}>
            <a href='#about' className={styles.navLink}>
              О компании
            </a>
            <a href='#portfolio' className={styles.navLink}>
              Портфолио
            </a>
            <a href='#directions' className={styles.navLink}>
              Направления
            </a>
            <a href='#catalog' className={styles.navLink}>
              Каталог продукции
            </a>
            <a href='#contacts' className={styles.navLink}>
              Контакты
            </a>
          </nav>
          <div className={styles.copyright}>
            <p>Copyright 2023 ООО «СПО «Огнещит»</p>
            <div className={styles.links}>
              <a href='#' className={styles.footerLink}>
                Пользовательское соглашение
              </a>
              <a href='#' className={styles.footerLink}>
                Политика конфиденциальности
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
