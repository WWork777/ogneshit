import ProjectSinglePage from './ProjectSinglePage';
import { getProjectBySlugServer } from '@/data/projects';

// Серверная функция для метаданных
export async function generateMetadata({ params }) {
  try {
    // Деструктурируем params с await
    const { slug } = await params;

    const project = await getProjectBySlugServer(slug);

    if (!project) {
      return {
        title: 'Проект не найден | СПО Огнещит',
        description:
          'Запрошенный проект не найден в портфолио компании СПО Огнещит',
      };
    }

    return {
      title: `${project.title} | Реализованный проект СПО Огнещит`,
      description:
        project.metaDescription ||
        `Проект ${project.title} в ${project.city}${
          project.country !== 'Россия' ? `, ${project.country}` : ''
        }. ${
          project.shortDescription ||
          'Реализация светопрозрачных и противопожарных конструкций.'
        }`,
      keywords:
        project.keywords ||
        `${project.title}, ${project.city}, светопрозрачные конструкции, противопожарные системы, реализованные проекты, СПО Огнещит`,
      alternates: {
        canonical: `https://ogneshit.ru/projects/${project.slug}`,
      },
      openGraph: {
        title: `${project.title} | СПО Огнещит`,
        description:
          project.metaDescription ||
          `Проект ${project.title} в ${project.city}${
            project.country !== 'Россия' ? `, ${project.country}` : ''
          }`,
        url: `https://ogneshit.ru/projects/${project.slug}`,
        siteName: 'СПО Огнещит',
        images: [
          {
            url: project.images[0] || '/images/projects-og.webp',
            width: 1200,
            height: 630,
            alt: project.title,
          },
        ],
        locale: 'ru_RU',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${project.title} | СПО Огнещит`,
        description:
          project.metaDescription ||
          `Проект ${project.title} в ${project.city}`,
        images: [project.images[0] || '/images/projects-og.webp'],
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Проект не найден | СПО Огнещит',
      description:
        'Запрошенный проект не найден в портфолио компании СПО Огнещит',
    };
  }
}

// Серверный компонент по умолчанию
export default async function Page({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlugServer(slug);

  return <ProjectSinglePage initialProject={project} />;
}
