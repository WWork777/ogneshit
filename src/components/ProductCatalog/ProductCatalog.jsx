'use client';

import { useState, useRef } from 'react';
import styles from './ProductCatalog.module.scss';

export default function ProductCatalog() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef(null);

  const products = [
    {
      id: 1,
      title: 'Противопожарные двери -IW-50',
      image: '/product-door1.jpg',
    },
    {
      id: 2,
      title: 'Противопожарные двери -IW-60',
      image: '/product-door2.jpg',
    },
    {
      id: 3,
      title: 'Противопожарные двери -IW-90',
      image: '/product-door3.jpg',
    },
  ];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const newPosition =
      direction === 'left'
        ? Math.max(0, currentSlide - 1)
        : Math.min(products.length - 1, currentSlide + 1);

    setCurrentSlide(newPosition);
    container.scrollTo({
      left: newPosition * scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id='catalog' className={styles.catalog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Каталог продукции</h2>
            <p className={styles.subtitle}>
              Комплексные решения для обеспечения пожарной безопасности и
              светопрозрачных архитектурных систем
            </p>
          </div>
          <div className={styles.navigation}>
            <button
              className={styles.navButton}
              onClick={() => scroll('left')}
              disabled={currentSlide === 0}
              aria-label='Previous products'
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
            <button
              className={styles.navButton}
              onClick={() => scroll('right')}
              disabled={currentSlide === products.length - 1}
              aria-label='Next products'
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
        </div>
        <div className={styles.productsContainer} ref={scrollContainerRef}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div
                className={styles.productImage}
                style={{ backgroundImage: `url(${product.image})` }}
              >
                <div className={styles.productIcon}>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='white'
                    strokeWidth='2'
                  >
                    <path d='M9 18l6-6-6-6' />
                  </svg>
                </div>
              </div>
              <h3 className={styles.productTitle}>{product.title}</h3>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          {products.map((_, index) => (
            <div
              key={index}
              className={`${styles.paginationDot} ${
                index === currentSlide ? styles.active : ''
              }`}
              onClick={() => {
                setCurrentSlide(index);
                scrollContainerRef.current?.scrollTo({
                  left: index * 400,
                  behavior: 'smooth',
                });
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
