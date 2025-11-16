"use client";

import { useState, useRef } from "react";
import styles from "./Projects.module.scss";

export default function Projects() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "EXPO 2017",
      location: "Астана, Казахстан",
      image: "/project-expo.jpg",
    },
    {
      id: 2,
      title: "Vladivostok Grand Hotel & Spa",
      location: "Владивосток",
      image: "/project-hotel.jpg",
    },
    {
      id: 3,
      title: "Теннисный центр в Лужниках",
      location: "Москва",
      image: "/project-tennis.jpg",
    },
    {
      id: 4,
      title: "Аэропорт",
      location: "Санкт-Петербург",
      image: "/project-airport.jpg",
    },
    {
      id: 5,
      title: "Аэропорт",
      location: "Санкт-Петербург",
      image: "/project-airport.jpg",
    },
  ];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const newPosition =
      direction === "left"
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    setScrollPosition(newPosition);
  };

  return (
    <section id="portfolio" className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Наши объекты</h2>
          <p className={styles.subtitle}>
            Реализованные проекты, подтверждающие качество и надежность наших
            решений
          </p>
          <button className={styles.allProjectsBtn}>Все проекты</button>
        </div>
        <div className={styles.projectsWrapper}>
          <div className={styles.projectsContainer} ref={scrollContainerRef}>
            {projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div
                  className={styles.projectImage}
                  style={{ backgroundImage: `url(${project.image})` }}
                ></div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectLocation}>{project.location}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.navigation}>
            <button
              className={styles.navButton}
              onClick={() => scroll("left")}
              aria-label="Previous projects"
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
            <button
              className={styles.navButton}
              onClick={() => scroll("right")}
              aria-label="Next projects"
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
        </div>
      </div>
    </section>
  );
}
