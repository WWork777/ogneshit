"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import styles from "./Hero.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const slides = [
    {
      title: "Огнезащита, которой доверяют по всей России",
      subtitle:
        "Производство и монтаж сертифицированных противопожарных конструкций",
      image: "/images/Hero/hero-airport.webp",
    },
    {
      title: "Огнезащита, которой доверяют по всей России",
      subtitle:
        "Производство и монтаж сертифицированных противопожарных конструкций",
      image: "/images/About/about-bg.webp",
    },
    {
      title: "Огнезащита, которой доверяют по всей России",
      subtitle:
        "Производство и монтаж сертифицированных противопожарных конструкций",
      image: "/images/Hero/hero-airport.webp",
    },
  ];

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

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideToLoop(index);
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
        speed={500}
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
                  : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
              }}
            ></div>
            <div className={styles.heroContent}>
              <button
                className={styles.arrowLeft}
                aria-label="Previous slide"
                onClick={goPrev}
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
                <h1 className={styles.title}>{slide.title}</h1>
                <div className={styles.divider}></div>
                <p className={styles.subtitle}>{slide.subtitle}</p>
              </div>
              <button
                className={styles.arrowRight}
                aria-label="Next slide"
                onClick={goNext}
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
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.paginationDot} ${
              index === activeIndex ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : "false"}
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
