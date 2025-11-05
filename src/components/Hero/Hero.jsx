'use client';

import { useState } from 'react';
import styles from './Hero.module.scss';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: 'Огнезащита, которой доверяют по всей России',
      subtitle:
        'Производство и монтаж сертифицированных противопожарных конструкций',
      image: '/images/Hero/hero-airport.webp',
    },
    {
      title: 'Огнезащита, которой доверяют по всей России',
      subtitle:
        'Производство и монтаж сертифицированных противопожарных конструкций',
      image: '/images/Hero/hero-airport.webp',
    },
    {
      title: 'Огнезащита, которой доверяют по всей России',
      subtitle:
        'Производство и монтаж сертифицированных противопожарных конструкций',
      image: '/images/Hero/hero-airport.webp',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className={styles.hero}>
      <div
        className={styles.heroBackground}
        style={{
          backgroundImage: slides[currentSlide].image
            ? `url(${slides[currentSlide].image})`
            : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }}
      ></div>
      <div className={styles.heroContent}>
        <button
          className={styles.arrowLeft}
          onClick={prevSlide}
          aria-label='Previous slide'
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
          <h1 className={styles.title}>{slides[currentSlide].title}</h1>
          <p className={styles.subtitle}>{slides[currentSlide].subtitle}</p>
        </div>
        <button
          className={styles.arrowRight}
          onClick={nextSlide}
          aria-label='Next slide'
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
      <div className={styles.pagination}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`${styles.paginationDot} ${
              index === currentSlide ? styles.active : ''
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
