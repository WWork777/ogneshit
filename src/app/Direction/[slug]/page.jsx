'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './DirectionSingle.module.scss';
import { getDirectionBySlug } from '@/data/directions';

export default function DirectionSinglePage() {
  const params = useParams();
  const direction = getDirectionBySlug(params.slug);

  if (!direction) {
    return (
      <div className={styles.notFound}>
        <h1>Направление не найдено</h1>
        <Link href='/'>Вернуться на главную</Link>
      </div>
    );
  }

  return (
    <main className={styles.directionSingle}>
      <section className={styles.hero}>
        <div className={styles.imageContainer}>
          <Image
            src={direction.image}
            alt={direction.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes='100vw'
          />
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>{direction.title}</h1>
            <div className={styles.divider}></div>
          </div>
        </div>
      </section>

      <div className={styles.contentSection}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs}>
            <Link href='/'>Главная</Link>
            <span> / </span>
            <Link href='/#directions'>Направления</Link>
            <span> / </span>
            <span>{direction.title}</span>
          </nav>

          <section className={styles.content}>
            <div className={styles.description}>
              <h2>О направлении</h2>
              <div
                className={styles.descriptionText}
                dangerouslySetInnerHTML={{ __html: direction.description }}
              />
            </div>
          </section>

          <div className={styles.backButton}>
            <Link href='/#directions' className={styles.backLink}>
              ← Назад к направлениям
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
