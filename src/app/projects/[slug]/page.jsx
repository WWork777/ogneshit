"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import styles from "./ProjectSingle.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projectsData = {
  "expo-2017": {
    id: 1,
    title: "EXPO 2017",
    city: "Астана",
    country: "Казахстан",
    images: [
      "/images/Projects/expo.webp",
      "/images/Projects/expo-2.webp",
      "/images/Projects/expo-3.webp",
      "/images/Projects/expo-4.webp",
    ],
    description: `
      <p>Международная специализированная выставка EXPO 2017 в Астане — масштабный проект, 
      посвященный энергии будущего. Наша компания обеспечила комплексную противопожарную 
      защиту всех павильонов и сооружений выставки.</p>
      
      <p><strong>Основные работы:</strong></p>
      <ul>
        <li>Проектирование и монтаж систем автоматической пожарной сигнализации</li>
        <li>Установка систем пожаротушения в критически важных зонах</li>
        <li>Оснащение объектов системами оповещения и управления эвакуацией</li>
        <li>Огнезащитная обработка конструкций</li>
      </ul>
      
      <p>Проект был реализован в сжатые сроки с соблюдением всех международных стандартов 
      безопасности.</p>
    `,
    features: [
      "Площадь: 174 га",
      "Срок реализации: 24 месяца",
      "Оборудование: системы высшей категории надежности",
      "Стандарты: МЧС РК, международные нормы",
    ],
  },
  "vladivostok-hotel": {
    id: 2,
    title: "Vladivostok Grand Hotel & Spa",
    city: "Владивосток",
    country: "Россия",
    images: [
      "/images/Projects/hotel.webp",
      "/images/Projects/hotel-2.webp",
      "/images/Projects/hotel-3.webp",
    ],
    description: `
      <p>Пятизвездочный отель премиум-класса во Владивостоке. Проект включал оснащение 
      современными системами пожарной безопасности с учетом специфики гостиничного комплекса.</p>
      
      <p><strong>Особенности проекта:</strong></p>
      <ul>
        <li>Интеграция систем безопасности в единый комплекс управления отелем</li>
        <li>Зональное разделение систем оповещения</li>
        <li>Особые решения для SPA-зоны и бассейна</li>
        <li>Круглосуточный мониторинг и обслуживание</li>
      </ul>
    `,
    features: [
      "Количество номеров: 150",
      "Этажность: 18 этажей",
      "Особые зоны: SPA, рестораны, конференц-залы",
      "Система: адресно-аналоговая пожарная сигнализация",
    ],
  },
};

export default function ProjectSinglePage() {
  const params = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const swiperRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const project = projectsData[params.slug];

  const animateText = () => {
    setIsAnimating(true);

    if (titleRef.current && subtitleRef.current) {
      titleRef.current.style.animation = "none";
      subtitleRef.current.style.animation = "none";

      void titleRef.current.offsetWidth;
      void subtitleRef.current.offsetWidth;

      titleRef.current.style.animation = "";
      subtitleRef.current.style.animation = "";
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 1200);
  };

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
    animateText();
    startProgressAnimation();
  };

  const goNext = () => {
    if (swiperRef.current && !isAnimating) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && !isAnimating) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const goToSlide = (index) => {
    if (swiperRef.current && !isAnimating) {
      swiperRef.current.swiper.slideTo(index);
      animateText();
      startProgressAnimation();
    }
  };

  useEffect(() => {
    startProgressAnimation();
    setTimeout(() => {
      animateText();
    }, 300);

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
        <Link href="/projects">Вернуться к проектам</Link>
      </div>
    );
  }

  return (
    <main className={styles.projectSingle}>
      <section className={styles.hero}>
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          navigation={false}
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
          {project.images.map((image, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <div className={styles.imageContainer}>
                <Image
                  src={image}
                  alt={`${project.title} - фото ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                  sizes="100vw"
                />
                <div className={styles.overlay}></div>
              </div>

              <div className={styles.heroContent}>
                <button
                  className={styles.arrowLeft}
                  aria-label="Previous slide"
                  onClick={goPrev}
                  disabled={isAnimating}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <div className={styles.textContent}>
                  <h1
                    ref={titleRef}
                    className={styles.title}
                    key={`title-${activeIndex}`}
                  >
                    {project.title}
                  </h1>
                  <div className={styles.divider}></div>
                  <p
                    ref={subtitleRef}
                    className={styles.subtitle}
                    key={`subtitle-${activeIndex}`}
                  >
                    📍 {project.city}
                    {project.country !== "Россия" && `, ${project.country}`}
                  </p>
                </div>

                <button
                  className={styles.arrowRight}
                  aria-label="Next slide"
                  onClick={goNext}
                  disabled={isAnimating}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.pagination}>
          {project.images.map((_, index) => (
            <button
              key={index}
              className={`${styles.paginationDot} ${
                index === activeIndex ? styles.active : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex ? "true" : "false"}
              disabled={isAnimating}
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
      </section>

      <div className={styles.contentSection}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs}>
            <Link href="/">Главная</Link>
            <span> / </span>
            <Link href="/projects">Проекты</Link>
            <span> / </span>
            <span>{project.title}</span>
          </nav>

          <section className={styles.content}>
            <div className={styles.description}>
              <h2>О проекте</h2>
              <div
                className={styles.descriptionText}
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>

            <div className={styles.features}>
              <h2>Характеристики</h2>
              <ul className={styles.featuresList}>
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </section>

          <div className={styles.backButton}>
            <Link href="/projects" className={styles.backLink}>
              ← Назад к проектам
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
