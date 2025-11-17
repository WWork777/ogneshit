'use client';

import Image from 'next/image';
import styles from './ProjectsPage.module.scss';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: 'EXPO 2017',
      city: 'Астана',
      country: 'Казахстан',
      image: '/images/Projects/expo.webp',
    },
    {
      id: 2,
      title: 'Vladivostok Grand Hotel & Spa',
      city: 'Владивосток',
      country: 'Россия',
      image: '/images/Projects/hotel.webp',
    },
    {
      id: 3,
      title: 'Теннисный центр в Лужниках',
      city: 'Москва',
      country: 'Россия',
      image: '/images/Projects/tennis.webp',
    },
    {
      id: 4,
      title: 'Аэропорт',
      city: 'Южно-Сахалинск',
      country: 'Россия',
      image: '/images/Projects/airport.webp',
    },
    {
      id: 5,
      title: 'EXPO 2017',
      city: 'Астана',
      country: 'Казахстан',
      image: '/images/Projects/expo.webp',
    },
    {
      id: 6,
      title: 'Vladivostok Grand Hotel & Spa',
      city: 'Владивосток',
      country: 'Россия',
      image: '/images/Projects/hotel.webp',
    },
    {
      id: 7,
      title: 'Теннисный центр в Лужниках',
      city: 'Москва',
      country: 'Россия',
      image: '/images/Projects/tennis.webp',
    },
    {
      id: 8,
      title: 'Аэропорт',
      city: 'Южно-Сахалинск',
      country: 'Россия',
      image: '/images/Projects/airport.webp',
    },
    {
      id: 9,
      title: 'EXPO 2017',
      city: 'Астана',
      country: 'Казахстан',
      image: '/images/Projects/expo.webp',
    },
    {
      id: 10,
      title: 'Vladivostok Grand Hotel & Spa',
      city: 'Владивосток',
      country: 'Россия',
      image: '/images/Projects/hotel.webp',
    },
    {
      id: 11,
      title: 'Теннисный центр в Лужниках',
      city: 'Москва',
      country: 'Россия',
      image: '/images/Projects/tennis.webp',
    },
    {
      id: 12,
      title: 'Аэропорт',
      city: 'Южно-Сахалинск',
      country: 'Россия',
      image: '/images/Projects/airport.webp',
    },
  ];

  return (
    <main className={styles.projectsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Наши объекты</h1>
          <p className={styles.subtitle}>
            Реализованные проекты, подтверждающие качество и надежность наших
            решений
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectImage}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
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
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
