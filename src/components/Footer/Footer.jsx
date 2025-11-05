'use client';

import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>🔥</div>
            <span className={styles.logoText}>СПО «ОГНЕЩИТ»</span>
          </div>
          <div className={styles.contactInfo}>
            <a href='tel:+78005559691' className={styles.phone}>
              8 800 555 96 91
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
            <a href='#catalog' className={styles.navLink}>
              Каталог продукции
            </a>
            <a href='#directions' className={styles.navLink}>
              Услуги
            </a>
            <a href='#portfolio' className={styles.navLink}>
              Портфолио
            </a>
            <a href='#certificates' className={styles.navLink}>
              Сертификаты
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
