'use client';

import styles from './Directions.module.scss';
import Link from 'next/link';
export default function Directions() {
  const directions = [
    {
      id: 1,
      title: 'Светопрозрачные конструкции',
      image: '/images/Directions/Direction_1.webp',
    },
    {
      id: 2,
      title: 'Навесные вентилируемые фасады',
      image: '/images/Directions/Direction_2.webp',
    },
    {
      id: 3,
      title: 'Научная деятельность',
      image: '/images/Directions/Direction_3.webp',
    },
    {
      id: 4,
      title: 'Реставрация витражных конструкций',
      image: '/images/Directions/Direction_4.webp',
    },
    {
      id: 5,
      title: 'Проектирование фасадов',
      image: '/images/Directions/Direction_5.webp',
    },
    {
      id: 6,
      title: 'Монтаж',
      image: '/images/Directions/Direction_6.webp',
    },
  ];

  const firstRowDirections = directions.slice(0, 2);
  const secondRowDirections = directions.slice(2);

  return (
    <section id='directions' className={styles.directions}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Первая строка: заголовок + первые 2 карточки */}
          <div className={styles.firstRow}>
            <div className={styles.header}>
              <h2 className={styles.title}>Направления</h2>
              <p className={styles.subtitle}>
                Мы разрабатываем, производим и устанавливаем противопожарные
                конструкции, обеспечивая безопасность объектов промышленности,
                энергетики, логистики и гражданского строительства.
              </p>
              <Link href={"#catalog"} className={styles.catalogBtn}>Каталог продукции</Link>
            </div>
            
            <div className={styles.firstRowCards}>
              {firstRowDirections.map((direction) => (
                  <div key={direction.id} className={styles.directionCard} style={{ backgroundImage: `url(${direction.image})`, backgroundRepeat: "no-repeat" }}>
                    <Link href={`/Direction/${direction.id}`}>
                      <div className={styles.directionImage}>
                        <div className={styles.directionIcon}>
                          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="25" cy="25" r="25" fill="white" />
                            <path d="M18.2454 32.3744L18.1508 32.2922C17.9902 32.132 17.8932 31.9191 17.8776 31.6929C17.862 31.4667 17.9289 31.2424 18.0659 31.0618L18.1499 30.9654L29.3726 19.7445L23.6795 19.7454C23.455 19.7455 23.2379 19.6649 23.0678 19.5184C22.8976 19.372 22.7857 19.1693 22.7523 18.9473L22.7417 18.8094C22.7415 18.5846 22.8221 18.3672 22.9687 18.1969C23.1154 18.0265 23.3184 17.9145 23.5407 17.8813L23.6786 17.8707L31.6309 17.8681C31.8554 17.868 32.0725 17.9486 32.2426 18.095C32.4128 18.2415 32.5247 18.4442 32.5581 18.6662L32.5678 18.805L32.5714 26.7635C32.5704 26.9994 32.4806 27.2264 32.3197 27.399C32.1588 27.5716 31.9388 27.6772 31.7035 27.6947C31.4681 27.7122 31.2349 27.6404 31.0502 27.4935C30.8656 27.3466 30.7431 27.1354 30.7072 26.9022L30.6966 26.7643L30.6949 21.0739L19.4766 32.2922C19.3161 32.4525 19.1028 32.5493 18.8764 32.5644C18.65 32.5795 18.4258 32.512 18.2454 32.3744Z" fill="black" />
                          </svg>
                        </div>
                        <h3 className={styles.directionTitle}>{direction.title}</h3>
                      </div>
                    </Link>
                  </div>
              ))}
            </div>
          </div>

          {/* Вторая строка: остальные 4 карточки */}
          <div className={styles.secondRow}>
            {secondRowDirections.map((direction) => (
                <div key={direction.id} className={styles.directionCard} style={{ backgroundImage: `url(${direction.image})`, backgroundRepeat: "no-repeat" }}>
                  <Link href={`/Direction/${direction.id}`}>
                    <div className={styles.directionImage}>
                      <div className={styles.directionIcon}>
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="25" cy="25" r="25" fill="white" />
                          <path d="M18.2454 32.3744L18.1508 32.2922C17.9902 32.132 17.8932 31.9191 17.8776 31.6929C17.862 31.4667 17.9289 31.2424 18.0659 31.0618L18.1499 30.9654L29.3726 19.7445L23.6795 19.7454C23.455 19.7455 23.2379 19.6649 23.0678 19.5184C22.8976 19.372 22.7857 19.1693 22.7523 18.9473L22.7417 18.8094C22.7415 18.5846 22.8221 18.3672 22.9687 18.1969C23.1154 18.0265 23.3184 17.9145 23.5407 17.8813L23.6786 17.8707L31.6309 17.8681C31.8554 17.868 32.0725 17.9486 32.2426 18.095C32.4128 18.2415 32.5247 18.4442 32.5581 18.6662L32.5678 18.805L32.5714 26.7635C32.5704 26.9994 32.4806 27.2264 32.3197 27.399C32.1588 27.5716 31.9388 27.6772 31.7035 27.6947C31.4681 27.7122 31.2349 27.6404 31.0502 27.4935C30.8656 27.3466 30.7431 27.1354 30.7072 26.9022L30.6966 26.7643L30.6949 21.0739L19.4766 32.2922C19.3161 32.4525 19.1028 32.5493 18.8764 32.5644C18.65 32.5795 18.4258 32.512 18.2454 32.3744Z" fill="black" />
                        </svg>
                      </div>
                      <h3 className={styles.directionTitle}>{direction.title}</h3>
                    </div>
                    </Link>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
