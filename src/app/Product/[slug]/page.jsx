import ProductSinglePage from "./ProductSinglePage";
import { getProductBySlugServer } from "@/data/products";

// Серверная функция для метаданных
export async function generateMetadata({ params }) {
  try {
    // ДОБАВЬТЕ AWAIT ДЛЯ PARAMS
    const { slug } = await params;

    // Используем серверную функцию
    const product = await getProductBySlugServer(slug);

    if (!product) {
      return {
        title: "Продукт не найден | СПО Огнещит",
        description:
          "Запрошенный продукт не найден в каталоге компании СПО Огнещит",
      };
    }

    return {
      title: `${product.title} | СПО Огнещит - Производство и монтаж`,
      description:
        product.metaDescription ||
        `Производство и монтаж ${product.title.toLowerCase()}. ${
          product.shortDescription ||
          "Качественные решения от производителя СПО Огнещит."
        }`,
      keywords:
        product.keywords ||
        `${product.title}, светопрозрачные конструкции, противопожарные системы, производство, монтаж, СПО Огнещит`,
      alternates: {
        canonical: `https://ogneshit.ru/products/${product.slug}`,
      },
      openGraph: {
        title: `${product.title} | СПО Огнещит`,
        description:
          product.metaDescription ||
          `Производство и монтаж ${product.title.toLowerCase()} от компании СПО Огнещит`,
        url: `https://ogneshit.ru/products/${product.slug}`,
        siteName: "СПО Огнещит",
        images: [
          {
            url: product.image,
            width: 1200,
            height: 630,
            alt: product.title,
          },
        ],
        locale: "ru_RU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.title} | СПО Огнещит`,
        description:
          product.metaDescription ||
          `Производство и монтаж ${product.title.toLowerCase()}`,
        images: [product.image],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Продукт не найден | СПО Огнещит",
      description:
        "Запрошенный продукт не найден в каталоге компании СПО Огнещит",
    };
  }
}

// Серверный компонент по умолчанию
export default async function Page({ params }) {
  // ДОБАВЬТЕ AWAIT ДЛЯ PARAMS
  const { slug } = await params;

  // Получаем продукт на сервере для передачи в клиентский компонент
  const product = await getProductBySlugServer(slug);

  return <ProductSinglePage params={{ slug }} initialProduct={product} />;
}
