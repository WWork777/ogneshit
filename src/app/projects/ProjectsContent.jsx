'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProjectsPage.module.scss';
import { getAllProjects } from '@/data/projects';
import { getAllVideos } from '@/data/videos';

export default function ProjectsContent() {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' или 'videos'
  const [playingVideoIds, setPlayingVideoIds] = useState(new Set());
  const videoRefs = useRef({});
  const projects = getAllProjects();
  const videos = getAllVideos();

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

  const getLocationText = (project) => {
    if (project.country === 'Россия') {
      return project.city;
    }
    return `${project.city}, ${project.country}`;
  };

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
                    style={{ objectFit: 'cover' }}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
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
