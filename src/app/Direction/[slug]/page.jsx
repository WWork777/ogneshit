import DirectionSinglePage from './DirectionSinglePage';
import { getDirectionBySlugServer } from '@/data/directions';

// Серверная функция для метаданных
export async function generateMetadata({ params }) {
  try {
    // Деструктурируем params с await
    const { slug } = await params;

    const direction = await getDirectionBySlugServer(slug);

    if (!direction) {
      return {
        title: 'Направление не найдено | СПО Огнещит',
        description:
          'Запрошенное направление не найдено на сайте компании СПО Огнещит',
      };
    }

    return {
      title: `${direction.title} | СПО Огнещит - Производство и монтаж`,
      description:
        direction.metaDescription ||
        `${
          direction.title
        } - профессиональные услуги по производству и монтажу от компании СПО Огнещит. ${
          direction.shortDescription ||
          'Качественные решения для строительства и противопожарной безопасности.'
        }`,
      keywords:
        direction.keywords ||
        `${direction.title}, светопрозрачные конструкции, противопожарные системы, производство, монтаж, услуги, СПО Огнещит`,
      alternates: {
        canonical: `https://ogneshit.ru/directions/${direction.slug}`,
      },
      openGraph: {
        title: `${direction.title} | СПО Огнещит`,
        description:
          direction.metaDescription ||
          `${direction.title} - профессиональные услуги по производству и монтажу`,
        url: `https://ogneshit.ru/directions/${direction.slug}`,
        siteName: 'СПО Огнещит',
        images: [
          {
            url: direction.image || '/images/directions-og.webp',
            width: 1200,
            height: 630,
            alt: direction.title,
          },
        ],
        locale: 'ru_RU',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${direction.title} | СПО Огнещит`,
        description:
          direction.metaDescription ||
          `${direction.title} - профессиональные услуги по производству и монтажу`,
        images: [direction.image || '/images/directions-og.webp'],
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
      title: 'Направление не найдено | СПО Огнещит',
      description:
        'Запрошенное направление не найдено на сайте компании СПО Огнещит',
    };
  }
}

// Серверный компонент по умолчанию
export default async function Page({ params }) {
  const { slug } = await params;
  const direction = await getDirectionBySlugServer(slug);

  return <DirectionSinglePage initialDirection={direction} />;
}
