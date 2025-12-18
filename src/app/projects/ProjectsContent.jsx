'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProjectsPage.module.scss';
import { getAllProjects } from '@/data/projects';
import { getAllVideos } from '@/data/videos';

const PROJECTS_SCROLL_KEY = 'projectsPageScrollPosition';

export default function ProjectsContent() {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' или 'videos'
  const [playingVideoIds, setPlayingVideoIds] = useState(new Set());
  const videoRefs = useRef({});
  const projectsContainerRef = useRef(null);
  const isRestoredRef = useRef(false);
  const userScrolledRef = useRef(false);
  const restoreTimeoutRef = useRef(null);
  const scrollStartTimeRef = useRef(null);
  const projects = getAllProjects();
  const videos = getAllVideos();

  // Восстановление позиции скролла при монтировании
  useLayoutEffect(() => {
    // Сбрасываем флаги при монтировании для возможности восстановления
    isRestoredRef.current = false;
    userScrolledRef.current = false;
    scrollStartTimeRef.current = Date.now();

    if (typeof window !== 'undefined') {
      const savedScrollPosition = sessionStorage.getItem(PROJECTS_SCROLL_KEY);

      if (savedScrollPosition !== null) {
        const scrollPosition = parseInt(savedScrollPosition, 10);

        // Проверяем, что позиция валидна (может быть и 0, но не NaN)
        if (isNaN(scrollPosition) || scrollPosition < 0) {
          isRestoredRef.current = true;
          return;
        }

        let lastScrollY = window.scrollY;
        let restoreAttempts = 0;
        const maxAttempts = 6;

        // Игнорируем скролл в первые 600ms после монтирования (это может быть автоматический скролл Next.js)
        const isInitialScroll = () => {
          return Date.now() - scrollStartTimeRef.current < 600;
        };

        // Отслеживание пользовательского скролла
        const handleUserScroll = () => {
          // Игнорируем скролл в первые 600ms
          if (isInitialScroll()) {
            lastScrollY = window.scrollY;
            return;
          }

          const currentScroll = window.scrollY;
          // Если пользователь скроллит (разница больше 15px), останавливаем восстановление
          // Используем больший порог, чтобы игнорировать небольшие автоматические изменения
          if (Math.abs(currentScroll - lastScrollY) > 15) {
            userScrolledRef.current = true;
            if (restoreTimeoutRef.current) {
              clearTimeout(restoreTimeoutRef.current);
            }
          }
          lastScrollY = currentScroll;
        };

        // Восстанавливаем позицию скролла
        const restoreScroll = () => {
          if (userScrolledRef.current || restoreAttempts >= maxAttempts) {
            isRestoredRef.current = true;
            window.removeEventListener('scroll', handleUserScroll);
            return;
          }

          const currentScroll = window.scrollY;
          const targetScroll = scrollPosition;

          // Увеличиваем порог до 150px для более надежного восстановления
          if (Math.abs(currentScroll - targetScroll) > 150) {
            window.scrollTo({
              top: targetScroll,
              behavior: 'instant',
            });
            restoreAttempts++;
            // Пробуем еще раз только если пользователь не скроллил
            if (!userScrolledRef.current) {
              restoreTimeoutRef.current = setTimeout(() => {
                if (!userScrolledRef.current) {
                  restoreScroll();
                } else {
                  isRestoredRef.current = true;
                  window.removeEventListener('scroll', handleUserScroll);
                }
              }, 100);
            } else {
              isRestoredRef.current = true;
              window.removeEventListener('scroll', handleUserScroll);
            }
          } else {
            isRestoredRef.current = true;
            window.removeEventListener('scroll', handleUserScroll);
          }
        };

        // Отслеживаем пользовательский скролл
        window.addEventListener('scroll', handleUserScroll, { passive: true });

        // Запускаем восстановление с несколькими попытками для надежности
        const attemptRestore = () => {
          if (!userScrolledRef.current && !isRestoredRef.current) {
            restoreScroll();
          }
        };

        // Первая попытка сразу (используем requestAnimationFrame для синхронизации с рендером)
        requestAnimationFrame(() => {
          restoreTimeoutRef.current = setTimeout(attemptRestore, 50);
        });

        // Дополнительные попытки для надежности
        setTimeout(attemptRestore, 200);
        setTimeout(attemptRestore, 400);

        // Очистка при размонтировании
        return () => {
          if (restoreTimeoutRef.current) {
            clearTimeout(restoreTimeoutRef.current);
          }
          window.removeEventListener('scroll', handleUserScroll);
        };
      } else {
        isRestoredRef.current = true;
      }
    }
  }, []);

  // Дополнительная проверка и восстановление через useEffect (резерв)
  useEffect(() => {
    if (typeof window !== 'undefined' && !isRestoredRef.current) {
      const savedScrollPosition = sessionStorage.getItem(PROJECTS_SCROLL_KEY);
      if (savedScrollPosition !== null) {
        const scrollPosition = parseInt(savedScrollPosition, 10);
        if (!isNaN(scrollPosition) && scrollPosition >= 0) {
          // Проверяем текущую позицию и восстанавливаем, если нужно
          const currentScroll = window.scrollY;
          if (Math.abs(currentScroll - scrollPosition) > 50) {
            // Небольшая задержка для гарантии, что DOM готов
            setTimeout(() => {
              window.scrollTo({ top: scrollPosition, behavior: 'instant' });
            }, 100);
          }
        }
      }
    }
  }, []);

  // Сохранение позиции скролла при взаимодействии с проектом
  const saveScrollPosition = () => {
    if (typeof window !== 'undefined') {
      const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;
      // Сохраняем позицию (включая 0, так как это тоже валидная позиция)
      sessionStorage.setItem(PROJECTS_SCROLL_KEY, scrollPosition.toString());
    }
  };

  // Сохранение позиции при клике на проект
  const handleProjectClick = (e) => {
    // Сохраняем позицию перед переходом
    saveScrollPosition();
  };

  // Также сохраняем позицию при наведении для более надежного сохранения
  const handleProjectMouseDown = () => {
    saveScrollPosition();
  };

  const handleVideoPlay = (videoId) => {
    setPlayingVideoIds((prev) => new Set(prev).add(videoId));
  };

  const handleVideoPause = (videoId) => {
    setPlayingVideoIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(videoId);
      return newSet;
    });
  };

  const handleVideoEnded = (videoId) => {
    setPlayingVideoIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(videoId);
      return newSet;
    });
  };

  // const getLocationText = (project) => {
  //   if (project.country === 'Россия') {
  //     return project.city;
  //   }
  //   return `${project.city}, ${project.country}`;
  // };

  return (
    <>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === 'projects' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('projects')}
        >
          Объекты
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === 'videos' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('videos')}
        >
          Видео
        </button>
      </div>

      {activeTab === 'projects' && (
        <div ref={projectsContainerRef} className={styles.projectsGrid}>
          {projects.map((project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.id}
              className={styles.projectLink}
              onClick={handleProjectClick}
              onMouseDown={handleProjectMouseDown}
            >
              <article className={styles.projectCard}>
                <div
                  className={`${styles.projectImage} ${
                    project.slug === 'vladivastok-burnyi'
                      ? styles.burnyiImage
                      : project.slug === 'astana-hilton'
                      ? styles.hiltonImage
                      : project.slug === 'aviacia'
                      ? styles.aviaciaImage
                      : ''
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectLocation}>{project.city}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'videos' && (
        <div className={styles.projectsGrid}>
          {videos.map((video) => {
            const isPlaying = playingVideoIds.has(video.id);
            return (
              <article
                key={video.id}
                className={`${styles.projectCard} ${styles.videoCard}`}
              >
                <div className={styles.projectImage}>
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[video.id] = el;
                    }}
                    className={styles.videoPlayer}
                    controls
                    controlsList='nodownload'
                    preload='metadata'
                    poster={video.thumbnail}
                    playsInline
                    onPlay={() => handleVideoPlay(video.id)}
                    onPause={() => handleVideoPause(video.id)}
                    onEnded={() => handleVideoEnded(video.id)}
                  >
                    <source src={video.videoUrl} type='video/mp4' />
                    Ваш браузер не поддерживает воспроизведение видео.
                  </video>
                  {!isPlaying && (
                    <button
                      className={styles.playButton}
                      onClick={() => {
                        if (videoRefs.current[video.id]) {
                          videoRefs.current[video.id].play();
                        }
                      }}
                      aria-label='Play video'
                    >
                      <svg
                        width='80'
                        height='80'
                        viewBox='0 0 80 80'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <circle
                          cx='40'
                          cy='40'
                          r='40'
                          fill='rgba(0, 0, 0, 0.7)'
                        />
                        <path d='M32 25L32 55L55 40L32 25Z' fill='white' />
                      </svg>
                    </button>
                  )}
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{video.title}</h3>
                  <p className={styles.projectLocation}>
                    {video.country === 'Россия'
                      ? video.city
                      : `${video.city}, ${video.country}`}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
