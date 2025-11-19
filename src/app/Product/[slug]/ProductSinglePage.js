"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./ProductSingle.module.scss";
import { getProductBySlug } from "@/data/products";
import { useEffect, useState } from "react";

export default function ProductSinglePage({ params, initialProduct }) {
  const clientParams = useParams();
  const slug = params?.slug || clientParams?.slug;

  // Используем initialProduct с сервера или ищем на клиенте
  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    // Если на сервере не нашли продукт, пробуем найти на клиенте
    if (!product && slug) {
      const clientProduct = getProductBySlug(slug);
      setProduct(clientProduct);
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Продукт не найден</h1>
        <p>Slug: {slug}</p>
        <Link href="/">Вернуться на главную</Link>
      </div>
    );
  }

  // Schema.org разметка для продукта
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.metaDescription || product.shortDescription,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: "СПО Огнещит",
    },
    offers: {
      "@type": "Offer",
      url: `https://ogneshit.ru/products/${product.slug}`,
      priceCurrency: "RUB",
      category: "Строительные материалы",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "СПО Огнещит",
      },
    },
    manufacturer: {
      "@type": "Organization",
      name: "СПО Огнещит",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Тип продукции",
        value: product.category,
      },
      {
        "@type": "PropertyValue",
        name: "Назначение",
        value:
          product.application || "Строительство и противопожарная безопасность",
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://ogneshit.ru",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Каталог продукции",
        item: "https://ogneshit.ru/#catalog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: `https://ogneshit.ru/products/${product.slug}`,
      },
    ],
  };

  return (
    <main className={styles.productSingle}>
      <section className={styles.hero}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="100vw"
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
            <Link href="/">Главная</Link>
            <span> / </span>
            <Link href="/#catalog">Каталог продукции</Link>
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
            <Link href="/#catalog" className={styles.backLink}>
              ← Назад к каталогу
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
