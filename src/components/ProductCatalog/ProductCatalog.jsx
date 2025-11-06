'use client';

import { useRef, useState } from 'react';
import styles from './ProductCatalog.module.scss';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function ProductCatalog() {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const products = [
    {
      id: 1,
      title: 'Противопожарные двери -IW-50',
      image: '/images/Catalog/Product_1.webp',
    },
    {
      id: 2,
      title: 'Противопожарные двери -IW-60',
      image: '/images/Catalog/Product_1.webp',
    },
    {
      id: 3,
      title: 'Противопожарные двери -IW-90',
      image: '/images/Catalog/Product_1.webp',
    },
    {
      id: 4,
      title: 'Противопожарные двери -IW-50',
      image: '/images/Catalog/Product_1.webp',
    },
    {
      id: 5,
      title: 'Противопожарные двери -IW-60',
      image: '/images/Catalog/Product_1.webp',
    },
    {
      id: 6,
      title: 'Противопожарные двери -IW-90',
      image: '/images/Catalog/Product_1.webp',
    },
  ];

  return (
    <section id='catalog' className={styles.catalog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Каталог продукции</h2>
          <p className={styles.subtitle}>
            Комплексные решения для обеспечения пожарной<br />безопасности и
            светопрозрачных архитектурных систем
          </p>
          <div className={styles.navigation}>
            <button
              ref={navigationPrevRef}
              className={styles.navButton}
              aria-label='Previous products'
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.9912 15.4376L25 15.3126C25.0003 15.0858 24.9184 14.8666 24.7695 14.6956C24.6205 14.5246 24.4147 14.4134 24.19 14.3826L24.0625 14.3738L8.1925 14.3751L12.2187 10.3501C12.3775 10.1913 12.4741 9.98089 12.4908 9.757C12.5075 9.53312 12.4434 9.31066 12.31 9.13007L12.22 9.02507C12.0612 8.86597 11.8505 8.76923 11.6263 8.75248C11.4022 8.73573 11.1794 8.80008 10.9987 8.93382L10.8937 9.02382L5.26875 14.6451C5.10998 14.8038 5.01344 15.0142 4.9967 15.2381C4.97995 15.462 5.04411 15.6845 5.1775 15.8651L5.26875 15.9701L10.8937 21.6001C11.0612 21.7663 11.2853 21.8632 11.5211 21.8715C11.7569 21.8798 11.9872 21.7989 12.1659 21.6449C12.3447 21.4909 12.4588 21.2751 12.4855 21.0407C12.5122 20.8062 12.4496 20.5703 12.31 20.3801L12.22 20.2751L8.1975 16.2501H24.0625C24.2894 16.25 24.5086 16.1676 24.6794 16.0182C24.8502 15.8688 24.961 15.6625 24.9912 15.4376Z" fill="black" />
              </svg>
            </button>
            <button
              ref={navigationNextRef}
              className={styles.navButton}
              aria-label='Next products'
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.00875 15.4376L5 15.3126C4.99971 15.0858 5.08162 14.8666 5.23055 14.6956C5.37948 14.5246 5.58535 14.4134 5.81 14.3826L5.9375 14.3738L21.8075 14.3751L17.7813 10.3501C17.6225 10.1913 17.5259 9.98089 17.5092 9.757C17.4925 9.53312 17.5566 9.31066 17.69 9.13007L17.78 9.02507C17.9388 8.86597 18.1495 8.76923 18.3737 8.75248C18.5978 8.73573 18.8206 8.80008 19.0013 8.93382L19.1063 9.02382L24.7313 14.6451C24.89 14.8038 24.9866 15.0142 25.0033 15.2381C25.02 15.462 24.9559 15.6845 24.8225 15.8651L24.7313 15.9701L19.1063 21.6001C18.9388 21.7663 18.7147 21.8632 18.4789 21.8715C18.2431 21.8798 18.0128 21.7989 17.8341 21.6449C17.6553 21.4909 17.5412 21.2751 17.5145 21.0407C17.4878 20.8062 17.5504 20.5703 17.69 20.3801L17.78 20.2751L21.8025 16.2501H5.9375C5.71058 16.25 5.49139 16.1676 5.3206 16.0182C5.14981 15.8688 5.03901 15.6625 5.00875 15.4376Z" fill="black" />
              </svg>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={40}
          slidesPerView={'auto'}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className={styles.swiperContainer}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className={styles.swiperSlide}>
              <div className={styles.productCard}>
                <div className={styles.productImage}>
                  <Image src={product.image} width={426} height={276} alt="Противопожарные двери" />
                  <div className={styles.productIcon}>
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="25" cy="25" r="25" fill="white" />
                      <path d="M18.2454 32.3744L18.1508 32.2922C17.9902 32.132 17.8932 31.9191 17.8776 31.6929C17.862 31.4667 17.9289 31.2424 18.0659 31.0618L18.1499 30.9654L29.3726 19.7445L23.6795 19.7454C23.455 19.7455 23.2379 19.6649 23.0678 19.5184C22.8976 19.372 22.7857 19.1693 22.7523 18.9473L22.7417 18.8094C22.7415 18.5846 22.8221 18.3672 22.9687 18.1969C23.1154 18.0265 23.3184 17.9145 23.5407 17.8813L23.6786 17.8707L31.6309 17.8681C31.8554 17.868 32.0725 17.9486 32.2426 18.095C32.4128 18.2415 32.5247 18.4442 32.5581 18.6662L32.5678 18.805L32.5714 26.7635C32.5704 26.9994 32.4806 27.2264 32.3197 27.399C32.1588 27.5716 31.9388 27.6772 31.7035 27.6947C31.4681 27.7122 31.2349 27.6404 31.0502 27.4935C30.8656 27.3466 30.7431 27.1354 30.7072 26.9022L30.6966 26.7643L30.6949 21.0739L19.4766 32.2922C19.3161 32.4525 19.1028 32.5493 18.8764 32.5644C18.65 32.5795 18.4258 32.512 18.2454 32.3744Z" fill="black" />
                    </svg>
                  </div>
                </div>
                <h3 className={styles.productTitle}>{product.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.pagination}>
          {products.map((_, index) => (
            <div
              key={index}
              className={`${styles.paginationDot} ${
                index === activeIndex ? styles.active : ''
              }`}
              onClick={() => {
                const swiper = document.querySelector('.swiper-container')?.swiper;
                if (swiper) {
                  swiper.slideTo(index);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
