import styles from './ProjectsPage.module.scss';
import { getAllProjects } from '@/data/projects';
import ProjectsContent from './ProjectsContent';

export async function generateMetadata() {
  return {
    title:
      'Построенные объекты | СПО Огнещит - Реализованные проекты светопрозрачных конструкций',
    description:
      'Реализованные проекты СПО Огнещит: светопрозрачные витражи, фасады, козырьки, противопожарные конструкции. Объекты по всей России и СНГ.',
    keywords:
      'построенные объекты, реализованные проекты, светопрозрачные конструкции, готовые объекты, портфолио, выполненные работы, СПО Огнещит проекты',
    alternates: {
      canonical: 'https://ogneshit.ru/projects',
    },
    openGraph: {
      title: 'Построенные объекты | СПО Огнещит - Реализованные проекты',
      description:
        'Реализованные проекты светопрозрачных и противопожарных конструкций от СПО Огнещит',
      url: 'https://ogneshit.ru/projects',
      siteName: 'СПО Огнещит',
      images: [
        {
          url: `/images/projects-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'Построенные объекты СПО Огнещит',
        },
      ],
      locale: 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Построенные объекты | СПО Огнещит - Реализованные проекты',
      description:
        'Реализованные проекты светопрозрачных и противопожарных конструкций',
      images: [`/images/projects-og.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function ProjectsPage() {
  const projects = getAllProjects();

  const getLocationText = (project) => {
    if (project.country === 'Россия') {
      return project.city;
    }
    return `${project.city}, ${project.country}`;
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Построенные объекты СПО Огнещит',
    description:
      'Реализованные проекты светопрозрачных и противопожарных конструкций',
    url: 'https://ogneshit.ru/projects',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: `Объект в ${getLocationText(project)}`,
        image: project.image,
        url: `https://ogneshit.ru/projects/${project.slug}`,
        location: {
          '@type': 'Place',
          address: getLocationText(project),
        },
      },
    })),
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={styles.projectsPage}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Наши объекты</h1>
            <p className={styles.subtitle}>
              Здесь мы собрали наиболее важные и ответственные проекты,
              реализованные нашей компанией.
            </p>
          </div>

          <ProjectsContent />
        </div>
      </main>
    </>
  );
}
