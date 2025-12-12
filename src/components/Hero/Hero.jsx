'use client';

import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './Hero.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const swiperRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const dividerRef = useRef(null);
  const arrowsRef = useRef([]);
  const paginationRef = useRef(null);

  const slides = [
    {
      title: 'СПО ОГНЕЩИТ комплексная реализация фасадов любой сложности',
      subtitle:
        'Производство, проектирование и монтаж всех типов светопрозрачных конструкций',
      image: '/images/Hero/hero-1.webp',
    },
    {
      title: 'СПО ОГНЕЩИТ комплексная реализация фасадов любой сложности',
      subtitle:
        'Производство, проектирование и монтаж всех типов светопрозрачных конструкций',
      image: '/images/Hero/hero-2.webp',
    },
    {
      title: 'СПО ОГНЕЩИТ комплексная реализация фасадов любой сложности',
      subtitle:
        'Производство, проектирование и монтаж всех типов светопрозрачных конструкций',
      image: '/images/Hero/hero-3.webp',
    },
  ];

  const resetAnimations = () => {
    // Сбрасываем все анимации
    const elements = [
      titleRef.current,
      subtitleRef.current,
      dividerRef.current,
      ...arrowsRef.current,
      paginationRef.current,
    ];

    elements.forEach((element) => {
      if (element) {
        element.classList.add(styles.resetAnimation);
        // Принудительное переflow
        void element.offsetWidth;
        element.classList.remove(styles.resetAnimation);
      }
    });
  };

  const animateText = () => {
    setIsAnimating(true);
    resetAnimations();

    // Завершаем анимацию через время, достаточное для всех анимаций
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
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
      swiperRef.current.swiper.slideToLoop(index);
      animateText();
      startProgressAnimation();
    }
  };

  useEffect(() => {
    // Инициализируем refs для стрелок
    arrowsRef.current = arrowsRef.current.slice(0, 2);

    startProgressAnimation();

    // Запускаем начальную анимацию с небольшой задержкой
    setTimeout(() => {
      animateText();
    }, 300);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  return (
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
        speed={1000}
        onSlideChange={handleSlideChange}
        onAutoplay={startProgressAnimation}
        className={styles.swiper}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <div
              className={styles.heroBackground}
              style={{
                backgroundImage: slide.image
                  ? `url(${slide.image})`
                  : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              }}
            >
              <div className={styles.backgroundOverlay}></div>
            </div>
            <div className={styles.heroContent}>
              <button
                ref={(el) => (arrowsRef.current[0] = el)}
                className={styles.arrowLeft}
                aria-label='Previous slide'
                onClick={goPrev}
                disabled={isAnimating}
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path d='M15 18l-6-6 6-6' />
                </svg>
              </button>
              <div className={styles.textContent}>
                <h1
                  ref={titleRef}
                  className={styles.title}
                  key={`title-${activeIndex}`}
                >
                  {slide.title}
                </h1>
                <div ref={dividerRef} className={styles.divider}></div>
                <p
                  ref={subtitleRef}
                  className={styles.subtitle}
                  key={`subtitle-${activeIndex}`}
                >
                  {slide.subtitle}
                </p>
              </div>
              <button
                ref={(el) => (arrowsRef.current[1] = el)}
                className={styles.arrowRight}
                aria-label='Next slide'
                onClick={goNext}
                disabled={isAnimating}
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path d='M9 18l6-6-6-6' />
                </svg>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div ref={paginationRef} className={styles.pagination}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.paginationDot} ${
              index === activeIndex ? styles.active : ''
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : 'false'}
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
  );
}
