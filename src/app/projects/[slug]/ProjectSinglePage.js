'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import styles from './ProjectSingle.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import { getProjectBySlug } from '@/data/projects';

export default function ProjectSinglePage({ initialProject }) {
  const params = useParams();
  const [project, setProject] = useState(initialProject);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const paginationRef = useRef(null);

  // Если на сервере не нашли проект, пробуем найти на клиенте
  useEffect(() => {
    if (!project && params.slug) {
      const clientProject = getProjectBySlug(params.slug);
      setProject(clientProject);
    }
  }, [project, params.slug]);

  const startProgressAnimation = () => {
    setProgress(0);

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

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
    startProgressAnimation();

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1>Проект не найден</h1>
        <Link href='/projects'>Вернуться к проектам</Link>
      </div>
    );
  }

  // Schema.org разметка для проекта
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.metaDescription || project.shortDescription,
    image: project.images,
    author: {
      '@type': 'Organization',
      name: 'СПО Огнещит',
    },
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: project.city,
        addressCountry: project.country,
      },
    },
    dateCreated: project.year || new Date().getFullYear().toString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ogneshit.ru/projects/${project.slug}`,
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
        name: 'Проекты',
        item: 'https://ogneshit.ru/projects',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `https://ogneshit.ru/projects/${project.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className={styles.projectSingle}>
        <div className={styles.contentSection}>
          <div className={styles.container}>
            <nav className={styles.breadcrumbs} aria-label='Хлебные крошки'>
              <Link href='/'>Главная</Link>
              <span> / </span>
              <Link href='/projects'>Проекты</Link>
              <span> / </span>
              <span>{project.title}</span>
            </nav>

            <div className={styles.mainContent}>
              <div className={styles.sliderSection}>
                <Swiper
                  ref={swiperRef}
                  modules={[Navigation, Autoplay]}
                  navigation={true}
                  pagination={false}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  loop={project.images.length > 1}
                  speed={800}
                  onSlideChange={handleSlideChange}
                  onAutoplay={startProgressAnimation}
                  className={styles.swiper}
                >
                  {project.images.map((image, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                      <div className={styles.imageContainer}>
                        <Image
                          src={image}
                          alt={`${project.title} - фото ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                          priority={index === 0}
                          sizes='(max-width: 768px) 100vw, 70vw'
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {project.images.length > 1 && (
                  <div ref={paginationRef} className={styles.pagination}>
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        className={`${styles.paginationDot} ${
                          index === activeIndex ? styles.active : ''
                        }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === activeIndex ? 'true' : 'false'}
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
                )}
              </div>

              <div className={styles.textSection}>
                <div className={styles.description}>
                  <h2>О проекте</h2>
                  <div
                    className={styles.descriptionText}
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </div>

                {project.features && project.features.length > 0 && (
                  <div className={styles.works}>
                    <h2>Основные работы</h2>
                    <ul className={styles.worksList}>
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.backButton}>
              <Link href='/projects' className={styles.backLink}>
                ← Назад к проектам
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
