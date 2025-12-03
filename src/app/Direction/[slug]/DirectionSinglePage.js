'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import styles from './DirectionSingle.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import { getDirectionBySlug } from '@/data/directions';

export default function DirectionSinglePage({ initialDirection }) {
  const params = useParams();
  const [direction, setDirection] = useState(initialDirection);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const paginationRef = useRef(null);

  // Если на сервере не нашли направление, пробуем найти на клиенте
  useEffect(() => {
    if (!direction && params.slug) {
      const clientDirection = getDirectionBySlug(params.slug);
      setDirection(clientDirection);
    }
  }, [direction, params.slug]);

  // Создаем массив изображений для совместимости со слайдером
  // Поддерживаем как массив images, так и одно поле image
  const images = direction?.images
    ? direction.images
    : direction?.image
    ? [direction.image]
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

  if (!direction) {
    return (
      <div className={styles.notFound}>
        <h1>Направление не найдено</h1>
        <Link href='/#directions'>Вернуться к направлениям</Link>
      </div>
    );
  }

  // Schema.org разметка для направления/услуги
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: direction.title,
    description: direction.metaDescription || direction.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'СПО Огнещит',
      url: 'https://ogneshit.ru',
    },
    areaServed: 'RU',
    serviceType: direction.category || 'Строительные услуги',
    offers: {
      '@type': 'Offer',
      category: 'Строительные услуги',
    },
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
        name: 'Направления',
        item: 'https://ogneshit.ru/#directions',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: direction.title,
        item: `https://ogneshit.ru/Direction/${direction.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className={styles.directionSingle}>
        <div className={styles.contentSection}>
          <div className={styles.container}>
            <nav className={styles.breadcrumbs} aria-label='Хлебные крошки'>
              <Link href='/'>Главная</Link>
              <span> / </span>
              <Link href='/#directions'>Направления</Link>
              <span> / </span>
              <span>{direction.title}</span>
            </nav>

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
                      {images.map((image, index) => (
                        <SwiperSlide key={index} className={styles.slide}>
                          <div className={styles.imageContainer}>
                            <Image
                              src={image}
                              alt={`${direction.title} - фото ${index + 1}`}
                              fill
                              style={{ objectFit: 'cover' }}
                              priority={index === 0}
                              sizes='(max-width: 768px) 100vw, 70vw'
                            />
                          </div>
                        </SwiperSlide>
                      ))}
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
                      src={direction.image}
                      alt={direction.title}
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
                  <h2>О направлении</h2>
                  <div
                    className={styles.descriptionText}
                    dangerouslySetInnerHTML={{ __html: direction.description }}
                  />
                </div>

                {direction.features && direction.features.length > 0 && (
                  <div className={styles.works}>
                    <h2>Основные работы</h2>
                    <ul className={styles.worksList}>
                      {direction.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.backButton}>
              <Link href='/#directions' className={styles.backLink}>
                ← Назад к направлениям
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
