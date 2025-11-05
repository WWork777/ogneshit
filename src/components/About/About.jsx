'use client';

import styles from './About.module.scss';

export default function About() {
  const stats = [
    {
      number: '100%',
      text: 'сертифицированные решения',
    },
    {
      number: '500+',
      text: 'объектов по всей стране',
    },
    {
      number: '20+',
      text: 'лет опыта работы',
    },
  ];

  return (
    <section id='about' className={styles.about}>
      <div className={styles.container}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.contentCard}>
          <h2 className={styles.title}>О компании</h2>
          <div className={styles.textContent}>
            <p>
              ООО «СПО Огнещит» — производственно-монтажная компания,
              специализирующаяся на комплексной огнезащите зданий и сооружений.
            </p>
            <p>
              Мы разрабатываем, производим и устанавливаем противопожарные
              конструкции, обеспечивая безопасность объектов промышленности,
              энергетики, логистики и гражданского строительства.
            </p>
            <p>
              Мы располагаем собственным производством в Новосибирске, выполняем
              проекты по всей России и используем только сертифицированные
              материалы. Контроль качества обеспечивается на каждом этапе — от
              изготовления до монтажа.
            </p>
          </div>
        </div>
        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statText}>{stat.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
