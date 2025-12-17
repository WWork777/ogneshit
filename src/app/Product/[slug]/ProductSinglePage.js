'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import styles from './ProductSingle.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import { getProductBySlug } from '@/data/products';

export default function ProductSinglePage({ params, initialProduct }) {
  const clientParams = useParams();
  const slug = params?.slug || clientParams?.slug;
  const [product, setProduct] = useState(initialProduct);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const paginationRef = useRef(null);

  // Используем initialProduct с сервера или ищем на клиенте
  useEffect(() => {
    if (!product && slug) {
      const clientProduct = getProductBySlug(slug);
      setProduct(clientProduct);
    }
  }, [product, slug]);

  // Создаем массив изображений для совместимости со слайдером
  // Поддерживаем как массив images, так и одно поле image
  const images = product?.images
    ? product.images
    : product?.image
    ? [product.image]
    : [];

  const startProgressAnimation = () => {
    setProgress(0);

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    if (images.length <= 1) return; // Нет смысла анимировать, если одно изображение

    const autoplayDelay = 5000;
    const steps = 100;
    const stepTime = autoplayDelay / steps;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressIntervalRef.current);
          return 0;
        }
        return prev + 1;
      });
    }, stepTime);
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    startProgressAnimation();
  };

  const goToSlide = (index) => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      if (swiper.params.loop) {
        swiper.slideToLoop(index);
      } else {
        swiper.slideTo(index);
      }
      startProgressAnimation();
    }
  };

  useEffect(() => {
    if (images.length > 1) {
      startProgressAnimation();
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Продукт не найден</h1>
        <Link href='/#catalog'>Вернуться к каталогу</Link>
      </div>
    );
  }

  // Schema.org разметка для продукта
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.metaDescription || product.shortDescription,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: 'СПО Огнещит',
    },
    offers: {
      '@type': 'Offer',
      url: `https://ogneshit.ru/Product/${product.slug}`,
      priceCurrency: 'RUB',
      category: 'Строительные материалы',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'СПО Огнещит',
      },
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'СПО Огнещит',
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Тип продукции',
        value: product.category,
      },
      {
        '@type': 'PropertyValue',
        name: 'Назначение',
        value:
          product.application || 'Строительство и противопожарная безопасность',
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: 'https://ogneshit.ru',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Каталог продукции',
        item: 'https://ogneshit.ru/#catalog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: `https://ogneshit.ru/Product/${product.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className={styles.productSingle}>
        <div className={styles.contentSection}>
          <div className={styles.container}>
            <nav className={styles.breadcrumbs} aria-label='Хлебные крошки'>
              <Link href='/'>Главная</Link>
              <span> / </span>
              <Link href='/#catalog'>Каталог продукции</Link>
              <span> / </span>
              <span>{product.title}</span>
            </nav>

            {/* Заголовок раздела */}
            <h2 className={styles.productTitle}>{product.title}</h2>

            <div className={styles.mainContent}>
              <div className={styles.sliderSection}>
                {images.length > 1 ? (
                  <>
                    <Swiper
                      ref={swiperRef}
                      modules={[Navigation, Autoplay]}
                      navigation={true}
                      pagination={false}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      loop={true}
                      speed={800}
                      onSlideChange={handleSlideChange}
                      onAutoplay={startProgressAnimation}
                      className={styles.swiper}
                    >
                      {images.map((image, index) => {
                        // Для protivopozharnoe-osteklenie/05.jpg используем contain, чтобы показать полностью
                        // Для legkosbrosyvaemye-konstrukcii также используем contain
                        const isProtivopozharnoe05 = image.includes(
                          'protivopozharnoe-osteklenie/05.jpg'
                        );
                        const isLegkosbrosyvaemye =
                          image.includes(
                            'legkosbrosyvaemye-konstrukcii-01.png'
                          ) ||
                          image.includes(
                            'legkosbrosyvaemye-konstrukcii-02.jpg'
                          );
                        const useContain =
                          isProtivopozharnoe05 || isLegkosbrosyvaemye;
                        return (
                          <SwiperSlide key={index} className={styles.slide}>
                            <div className={styles.imageContainer}>
                              <Image
                                src={image}
                                alt={`${product.title} - фото ${index + 1}`}
                                fill
                                style={{
                                  objectFit: useContain ? 'contain' : 'cover',
                                }}
                                priority={index === 0}
                                sizes='(max-width: 768px) 100vw, 70vw'
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                    <div ref={paginationRef} className={styles.pagination}>
                      {images.map((_, index) => (
                        <button
                          key={index}
                          className={`${styles.paginationDot} ${
                            index === activeIndex ? styles.active : ''
                          }`}
                          onClick={() => goToSlide(index)}
                          aria-label={`Go to slide ${index + 1}`}
                          aria-current={
                            index === activeIndex ? 'true' : 'false'
                          }
                        >
                          {index === activeIndex && (
                            <div
                              className={styles.progressFill}
                              style={{ width: `${progress}%` }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className={styles.imageContainer}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                      sizes='(max-width: 768px) 100vw, 70vw'
                    />
                  </div>
                )}
              </div>

              <div className={styles.textSection}>
                <div className={styles.description}>
                  <h2>О продукции</h2>
                  <div
                    className={styles.descriptionText}
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.backButton}>
              <Link href='/#catalog' className={styles.backLink}>
                ← Назад к каталогу
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
