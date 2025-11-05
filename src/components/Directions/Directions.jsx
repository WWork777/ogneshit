'use client';

import styles from './Directions.module.scss';

export default function Directions() {
  const directions = [
    {
      id: 1,
      title: 'Светопрозрачные конструкции',
      image: '/direction-glass.jpg',
    },
    {
      id: 2,
      title: 'Навесные вентилируемые фасады',
      image: '/direction-facade.jpg',
    },
    {
      id: 3,
      title: 'Научная деятельность',
      image: '/direction-research.jpg',
    },
    {
      id: 4,
      title: 'Реставрация витражных конструкций',
      image: '/direction-restoration.jpg',
    },
    {
      id: 5,
      title: 'Проектирование фасадов',
      image: '/direction-design.jpg',
    },
    {
      id: 6,
      title: 'Монтаж',
      image: '/direction-installation.jpg',
    },
  ];

  return (
    <section id='directions' className={styles.directions}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Направления</h2>
          <p className={styles.subtitle}>
            Мы разрабатываем, производим и устанавливаем противопожарные
            конструкции, обеспечивая безопасность объектов промышленности,
            энергетики, логистики и гражданского строительства.
          </p>
          <button className={styles.catalogBtn}>Каталог продукции</button>
        </div>
        <div className={styles.directionsGrid}>
          {directions.map((direction) => (
            <div key={direction.id} className={styles.directionCard}>
              <div
                className={styles.directionImage}
                style={{ backgroundImage: `url(${direction.image})` }}
              >
                <div className={styles.directionIcon}>
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
              <h3 className={styles.directionTitle}>{direction.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
