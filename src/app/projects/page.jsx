"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./ProjectsPage.module.scss";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "EXPO 2017",
      city: "Астана",
      country: "Казахстан",
      image: "/images/Projects/expo.webp",
      slug: "expo-2017",
    },
    {
      id: 2,
      title: "Vladivostok Grand Hotel & Spa",
      city: "Владивосток",
      country: "Россия",
      image: "/images/Projects/hotel.webp",
      slug: "vladivostok-hotel",
    },
    {
      id: 3,
      title: "Теннисный центр в Лужниках",
      city: "Москва",
      country: "Россия",
      image: "/images/Projects/tennis.webp",
      slug: "luzhniki-tennis",
    },
    {
      id: 4,
      title: "Аэропорт",
      city: "Южно-Сахалинск",
      country: "Россия",
      image: "/images/Projects/airport.webp",
      slug: "sakhalin-airport",
    },
    {
      id: 5,
      title: "EXPO 2017",
      city: "Астана",
      country: "Казахстан",
      image: "/images/Projects/expo.webp",
    },
    {
      id: 6,
      title: "Vladivostok Grand Hotel & Spa",
      city: "Владивосток",
      country: "Россия",
      image: "/images/Projects/hotel.webp",
    },
    {
      id: 7,
      title: "Теннисный центр в Лужниках",
      city: "Москва",
      country: "Россия",
      image: "/images/Projects/tennis.webp",
    },
    {
      id: 8,
      title: "Аэропорт",
      city: "Южно-Сахалинск",
      country: "Россия",
      image: "/images/Projects/airport.webp",
    },
  ];

  const getLocationText = (project) => {
    if (project.country === "Россия") {
      return project.city;
    }
    return `${project.city}, ${project.country}`;
  };

  return (
    <main className={styles.projectsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Наши объекты</h1>
          <p className={styles.subtitle}>
            Реализованные проекты, подтверждающие качество и надежность наших
            решений в различных регионах и отраслях
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.id}
              className={styles.projectLink}
            >
              <article className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectLocation}>
                    {getLocationText(project)}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
