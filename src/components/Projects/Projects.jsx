'use client';

import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Projects.module.scss';
import { getProjectsForLanding } from '@/data/projects';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function Projects() {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperInstanceRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Дополнительная инициализация навигации после монтирования
  useEffect(() => {
    if (
      swiperInstanceRef.current &&
      navigationPrevRef.current &&
      navigationNextRef.current
    ) {
      const swiper = swiperInstanceRef.current;
      setTimeout(() => {
        if (swiper && swiper.params && swiper.params.navigation) {
          // @ts-ignore
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = navigationNextRef.current;
          if (
            swiper.navigation &&
            typeof swiper.navigation.init === 'function'
          ) {
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }
      }, 200);
    }
  }, []);

  const projects = getProjectsForLanding();

  return (
    <section id='portfolio' className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Наши объекты</h2>
          <p className={styles.subtitle}>
            Здесь мы собрали наиболее важные и ответственные проекты,
            реализованные нашей компанией.
          </p>
          <Link href='/projects' className={styles.allProjectsBtn}>
            Все проекты
          </Link>
        </div>

        <div className={styles.swiperSection}>
          <div className={styles.swiperWrapper}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={'auto'}
              slidesPerGroup={1}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              loop={true}
              allowTouchMove={true}
              grabCursor={true}
              touchEventsTarget={'container'}
              breakpoints={{
                0: {
                  spaceBetween: 16,
                },
                480: {
                  spaceBetween: 20,
                },
                768: {
                  spaceBetween: 24,
                },
                1024: {
                  spaceBetween: 24,
                },
                1280: {
                  spaceBetween: 24,
                },
                1400: {
                  spaceBetween: 24,
                },
                1600: {
                  spaceBetween: 24,
                },
                1920: {
                  spaceBetween: 24,
                },
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              onSwiper={(swiper) => {
                swiperInstanceRef.current = swiper;
                // Инициализируем навигацию после полной загрузки Swiper
                setTimeout(() => {
                  if (swiper && swiper.params && swiper.params.navigation) {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    if (
                      swiper.navigation &&
                      typeof swiper.navigation.init === 'function'
                    ) {
                      swiper.navigation.init();
                      swiper.navigation.update();
                    }
                  }
                }, 100);
              }}
              className={styles.swiperContainer}
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id} className={styles.swiperSlide}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className={styles.projectCard}
                  >
                    <div className={styles.projectImage}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{
                          objectFit: 'cover',
                          objectPosition: project.image.includes(
                            'norilsk-aika/75.jpg'
                          )
                            ? '80% center'
                            : project.image.includes('omsk-avangard/88.jpg')
                            ? '10% center'
                            : project.image.includes('aviacia/aviacia-01.bmp')
                            ? '80% center'
                            : 'center center',
                        }}
                      />
                    </div>
                    <div className={styles.projectInfo}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectLocation}>
                        {project.city}
                        {project.country &&
                          project.country !== 'Россия' &&
                          `, ${project.country}`}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={styles.navigation}>
            <button
              ref={navigationPrevRef}
              className={styles.navButton}
              aria-label='Previous projects'
            >
              <svg
                width='30'
                height='30'
                viewBox='0 0 30 30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M24.9912 15.4376L25 15.3126C25.0003 15.0858 24.9184 14.8666 24.7695 14.6956C24.6205 14.5246 24.4147 14.4134 24.19 14.3826L24.0625 14.3738L8.1925 14.3751L12.2187 10.3501C12.3775 10.1913 12.4741 9.98089 12.4908 9.757C12.5075 9.53312 12.4434 9.31066 12.31 9.13007L12.22 9.02507C12.0612 8.86597 11.8505 8.76923 11.6263 8.75248C11.4022 8.73573 11.1794 8.80008 10.9987 8.93382L10.8937 9.02382L5.26875 14.6451C5.10998 14.8038 5.01344 15.0142 4.9967 15.2381C4.97995 15.462 5.04411 15.6845 5.1775 15.8651L5.26875 15.9701L10.8937 21.6001C11.0612 21.7663 11.2853 21.8632 11.5211 21.8715C11.7569 21.8798 11.9872 21.7989 12.1659 21.6449C12.3447 21.4909 12.4588 21.2751 12.4855 21.0407C12.5122 20.8062 12.4496 20.5703 12.31 20.3801L12.22 20.2751L8.1975 16.2501H24.0625C24.2894 16.25 24.5086 16.1676 24.6794 16.0182C24.8502 15.8688 24.961 15.6625 24.9912 15.4376Z'
                  fill='black'
                />
              </svg>
            </button>
            <button
              ref={navigationNextRef}
              className={styles.navButton}
              aria-label='Next projects'
            >
              <svg
                width='30'
                height='30'
                viewBox='0 0 30 30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5.00875 15.4376L5 15.3126C4.99971 15.0858 5.08162 14.8666 5.23055 14.6956C5.37948 14.5246 5.58535 14.4134 5.81 14.3826L5.9375 14.3738L21.8075 14.3751L17.7813 10.3501C17.6225 10.1913 17.5259 9.98089 17.5092 9.757C17.4925 9.53312 17.5566 9.31066 17.69 9.13007L17.78 9.02507C17.9388 8.86597 18.1495 8.76923 18.3737 8.75248C18.5978 8.73573 18.8206 8.80008 19.0013 8.93382L19.1063 9.02382L24.7313 14.6451C24.89 14.8038 24.9866 15.0142 25.0033 15.2381C25.02 15.462 24.9559 15.6845 24.8225 15.8651L24.7313 15.9701L19.1063 21.6001C18.9388 21.7663 18.7147 21.8632 18.4789 21.8715C18.2431 21.8798 18.0128 21.7989 17.8341 21.6449C17.6553 21.4909 17.5412 21.2751 17.5145 21.0407C17.4878 20.8062 17.5504 20.5703 17.69 20.3801L17.78 20.2751L21.8025 16.2501H5.9375C5.71058 16.25 5.49139 16.1676 5.3206 16.0182C5.14981 15.8688 5.03901 15.6625 5.00875 15.4376Z'
                  fill='black'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
