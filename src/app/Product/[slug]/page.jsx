'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './ProductSingle.module.scss';
import { getProductBySlug } from '@/data/products';

export default function ProductSinglePage() {
  const params = useParams();
  const product = getProductBySlug(params.slug);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Продукт не найден</h1>
        <Link href='/'>Вернуться на главную</Link>
      </div>
    );
  }

  return (
    <main className={styles.productSingle}>
      <section className={styles.hero}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes='100vw'
          />
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.divider}></div>
          </div>
        </div>
      </section>

      <div className={styles.contentSection}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs}>
            <Link href='/'>Главная</Link>
            <span> / </span>
            <Link href='/#catalog'>Каталог продукции</Link>
            <span> / </span>
            <span>{product.title}</span>
          </nav>

          <section className={styles.content}>
            <div className={styles.description}>
              <h2>О продукции</h2>
              <div
                className={styles.descriptionText}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </section>

          <div className={styles.backButton}>
            <Link href='/#catalog' className={styles.backLink}>
              ← Назад к каталогу
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
