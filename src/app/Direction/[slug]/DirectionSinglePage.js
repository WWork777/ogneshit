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
import { getAllTranslucentSubsections } from '@/data/translucentStructures';

export default function DirectionSinglePage({ initialDirection }) {
  const params = useParams();
  const [direction, setDirection] = useState(initialDirection);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
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

  // Обработка закрытия модального окна по Escape и блокировка скролла
  useEffect(() => {
    if (isModalOpen) {
      // Блокируем скролл body
      document.body.style.overflow = 'hidden';

      // Закрытие по Escape
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          setIsModalOpen(false);
        }
      };

      window.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

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

  // Проверяем, нужно ли показывать подразделы
  const hasSubsections = direction.hasSubsections;
  const subsections = hasSubsections ? getAllTranslucentSubsections() : [];

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

            {/* Специальная версия для светопрозрачных конструкций с подразделами */}
            {hasSubsections ? (
              <>
                {/* Заголовок раздела */}
                <h2 className={styles.directionTitle}>{direction.title}</h2>

                {/* Контейнер с изображением и описанием */}
                <div className={styles.imageDescriptionContainer}>
                  {/* Изображение направления */}
                  <div className={styles.mainImageSection}>
                    <div className={styles.singleImageContainer}>
                      <Image
                        src={direction.image}
                        alt={direction.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        sizes='(max-width: 768px) 100vw, 50vw'
                      />
                    </div>
                  </div>

                  {/* Описание направления */}
                  <div className={styles.descriptionSection}>
                    <div
                      className={styles.descriptionText}
                      dangerouslySetInnerHTML={{
                        __html: direction.description,
                      }}
                    />
                  </div>
                </div>

                {/* Карточки подразделов */}
                <div className={styles.subsectionsSection}>
                  <div className={styles.subsectionsGrid}>
                    {subsections.map((subsection) => (
                      <div
                        key={subsection.id}
                        className={styles.subsectionCard}
                        style={{
                          backgroundImage: `url(${subsection.image})`,
                          backgroundRepeat: 'no-repeat',
                        }}
                      >
                        <Link href={`/Product/${subsection.slug}`}>
                          <div className={styles.subsectionImage}>
                            <div className={styles.subsectionIcon}>
                              <svg
                                width='50'
                                height='50'
                                viewBox='0 0 50 50'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <circle cx='25' cy='25' r='25' fill='white' />
                                <path
                                  d='M18.2454 32.3744L18.1508 32.2922C17.9902 32.132 17.8932 31.9191 17.8776 31.6929C17.862 31.4667 17.9289 31.2424 18.0659 31.0618L18.1499 30.9654L29.3726 19.7445L23.6795 19.7454C23.455 19.7455 23.2379 19.6649 23.0678 19.5184C22.8976 19.372 22.7857 19.1693 22.7523 18.9473L22.7417 18.8094C22.7415 18.5846 22.8221 18.3672 22.9687 18.1969C23.1154 18.0265 23.3184 17.9145 23.5407 17.8813L23.6786 17.8707L31.6309 17.8681C31.8554 17.868 32.0725 17.9486 32.2426 18.095C32.4128 18.2415 32.5247 18.4442 32.5581 18.6662L32.5678 18.805L32.5714 26.7635C32.5704 26.9994 32.4806 27.2264 32.3197 27.399C32.1588 27.5716 31.9388 27.6772 31.7035 27.6947C31.4681 27.7122 31.2349 27.6404 31.0502 27.4935C30.8656 27.3466 30.7431 27.1354 30.7072 26.9022L30.6966 26.7643L30.6949 21.0739L19.4766 32.2922C19.3161 32.4525 19.1028 32.5493 18.8764 32.5644C18.65 32.5795 18.4258 32.512 18.2454 32.3744Z'
                                  fill='black'
                                />
                              </svg>
                            </div>
                            <h3 className={styles.subsectionTitle}>
                              {subsection.title}
                            </h3>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Обычная версия для других направлений */
              <>
                {/* Заголовок раздела */}
                <h2 className={styles.directionTitle}>{direction.title}</h2>

                <div className={styles.mainContent}>
                  {/* Левая колонка: фото и документы */}
                  <div className={styles.leftColumn}>
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
                                    alt={`${direction.title} - фото ${
                                      index + 1
                                    }`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    priority={index === 0}
                                    sizes='(max-width: 768px) 100vw, 50vw'
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          <div
                            ref={paginationRef}
                            className={styles.pagination}
                          >
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
                            sizes='(max-width: 768px) 100vw, 50vw'
                          />
                        </div>
                      )}
                    </div>

                    {/* Документы для научной деятельности под фотографией */}
                    {direction.documents && direction.documents.length > 0 && (
                      <div className={styles.documentsSection}>
                        <h3 className={styles.documentsTitle}>Документы</h3>
                        <ul className={styles.documentsList}>
                          {direction.documents.map((doc) => (
                            <li key={doc.id} className={styles.documentItem}>
                              <button
                                onClick={() => {
                                  // На localhost открываем в новой вкладке, на продакшене - в модальном окне
                                  if (
                                    typeof window !== 'undefined' &&
                                    (window.location.hostname === 'localhost' ||
                                      window.location.hostname === '127.0.0.1')
                                  ) {
                                    window.open(doc.file, '_blank');
                                  } else {
                                    setSelectedDocument(doc);
                                    setIsModalOpen(true);
                                  }
                                }}
                                className={styles.documentLink}
                              >
                                <svg
                                  width='20'
                                  height='20'
                                  viewBox='0 0 20 20'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                  className={styles.documentIcon}
                                >
                                  <path
                                    d='M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M13.3333 8.33333L10 11.6667M10 11.6667L6.66667 8.33333M10 11.6667V2.5'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  />
                                </svg>
                                <span>{doc.title}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Правая колонка: описание */}
                  <div className={styles.textSection}>
                    <div className={styles.description}>
                      <h2>О направлении</h2>
                      <div
                        className={styles.descriptionText}
                        dangerouslySetInnerHTML={{
                          __html: direction.description,
                        }}
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
              </>
            )}

            <div className={styles.backButton}>
              <Link href='/#directions' className={styles.backLink}>
                ← Назад к направлениям
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Модальное окно для просмотра PDF */}
      {isModalOpen && selectedDocument && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setIsModalOpen(false)}
              aria-label='Закрыть'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M18 6L6 18M6 6L18 18'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{selectedDocument.title}</h3>
            </div>
            <div className={styles.modalBody}>
              <iframe
                src={`${selectedDocument.file}#toolbar=0&navpanes=0&scrollbar=0`}
                className={styles.pdfViewer}
                title={selectedDocument.title}
                onError={() => {
                  // Если не удалось загрузить, открываем в новой вкладке
                  window.open(selectedDocument.file, '_blank');
                  setIsModalOpen(false);
                }}
              />
              <div className={styles.pdfFallback}>
                <p>Если PDF не отображается, откройте его в новой вкладке:</p>
                <a
                  href={selectedDocument.file}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.pdfFallbackLink}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Открыть PDF в новой вкладке
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
