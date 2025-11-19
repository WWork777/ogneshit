"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./DirectionSingle.module.scss";
import { getDirectionBySlug } from "@/data/directions";
import { useEffect, useState } from "react";

export default function DirectionSinglePage({ initialDirection }) {
  const params = useParams();
  const [direction, setDirection] = useState(initialDirection);

  // Если на сервере не нашли направление, пробуем найти на клиенте
  useEffect(() => {
    if (!direction && params.slug) {
      const clientDirection = getDirectionBySlug(params.slug);
      setDirection(clientDirection);
    }
  }, [direction, params.slug]);

  if (!direction) {
    return (
      <div className={styles.notFound}>
        <h1>Направление не найдено</h1>
        <Link href="/">Вернуться на главную</Link>
      </div>
    );
  }

  // Schema.org разметка для направления/услуги
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: direction.title,
    description: direction.metaDescription || direction.shortDescription,
    provider: {
      "@type": "Organization",
      name: "СПО Огнещит",
      url: "https://ogneshit.ru",
    },
    areaServed: "RU",
    serviceType: direction.category || "Строительные услуги",
    offers: {
      "@type": "Offer",
      category: "Строительные услуги",
    },
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
        name: "Направления",
        item: "https://ogneshit.ru/#directions",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: direction.title,
        item: `https://ogneshit.ru/directions/${direction.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className={styles.directionSingle}>
        <section className={styles.hero}>
          <div className={styles.imageContainer}>
            <Image
              src={direction.image}
              alt={direction.title}
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="100vw"
            />
            <div className={styles.overlay}></div>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.textContent}>
              <h1 className={styles.title}>{direction.title}</h1>
              <div className={styles.divider}></div>
              {direction.shortDescription && (
                <p className={styles.heroDescription}>
                  {direction.shortDescription}
                </p>
              )}
            </div>
          </div>
        </section>

        <div className={styles.contentSection}>
          <div className={styles.container}>
            <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
              <Link href="/">Главная</Link>
              <span> / </span>
              <Link href="/#directions">Направления</Link>
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

              {/* Дополнительные блоки информации */}
              {direction.features && direction.features.length > 0 && (
                <div className={styles.features}>
                  <h3>Преимущества</h3>
                  <ul className={styles.featuresList}>
                    {direction.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {direction.applications && direction.applications.length > 0 && (
                <div className={styles.applications}>
                  <h3>Области применения</h3>
                  <ul className={styles.applicationsList}>
                    {direction.applications.map((application, index) => (
                      <li key={index}>{application}</li>
                    ))}
                  </ul>
                </div>
              )}

              {direction.technologies && direction.technologies.length > 0 && (
                <div className={styles.technologies}>
                  <h3>Используемые технологии</h3>
                  <ul className={styles.technologiesList}>
                    {direction.technologies.map((technology, index) => (
                      <li key={index}>{technology}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <div className={styles.backButton}>
              <Link href="/#directions" className={styles.backLink}>
                ← Назад к направлениям
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
