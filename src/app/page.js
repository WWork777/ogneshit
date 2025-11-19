import Header from "@/components/Header";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Directions from "@/components/Directions";
import ProductCatalog from "@/components/ProductCatalog";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";

export async function generateMetadata() {
  return {
    title:
      "СПО Огнещит - Производство светопрозрачных конструкций и противопожарных систем",
    description:
      "Производим светопрозрачные витражи, фасады, козырьки, спайдерное остекление, противопожарные конструкции, системы дымоудаления. Собственное производство в России. Сертифицированная продукция.",
    keywords:
      "светопрозрачные конструкции, противопожарные системы, спайдерное остекление, витражи, фасады, козырьки, дымоудаление, огнезащита, алюминиевые перегородки",
    alternates: {
      canonical: "https://ogneshit.ru",
    },
    openGraph: {
      title:
        "СПО Огнещит - Производство светопрозрачных и противопожарных конструкций",
      description:
        "Собственное производство светопрозрачных витражей, фасадов, противопожарных систем и конструкций дымоудаления в России",
      url: "https://ogneshit.ru",
      siteName: "СПО Огнещит",
      images: [
        {
          url: `/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "СПО Огнещит - производство светопрозрачных и противопожарных конструкций",
        },
      ],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "СПО Огнещит - Производство светопрозрачных конструкций и противопожарных систем",
      description:
        "Собственное производство светопрозрачных витражей, фасадов, противопожарных систем в России",
      images: [`/images/og-image.jpg`],
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
    verification: {
      google: "ваш-google-verification-code",
      yandex: "ваш-yandex-verification-code",
    },
    authors: [{ name: "СПО Огнещит" }],
    publisher: "СПО Огнещит",
    category: "construction",
    classification: "manufacturing",
  };
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "СПО Огнещит",
    description:
      "Производство светопрозрачных конструкций и противопожарных систем",
    url: "https://ogneshit.ru",
    logo: "https://ogneshit.ru/images/logo.png",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RU",
      addressRegion: "Московская область",
      addressLocality: "Москва",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+7-800-333-95-91",
      contactType: "customer service",
      email: "zakaz@ogneshit.ru",
      areaServed: "RU",
    },
    sameAs: ["https://vk.com/ogneshit", "https://www.youtube.com/channel/..."],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Светопрозрачные витражи и фасады",
          description:
            "Производство и монтаж светопрозрачных витражей и фасадов",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Спайдерное остекление",
          description: "Спайдерное остекление козырьков и лифтовых шахт",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Противопожарные конструкции",
          description:
            "Производство противопожарных светопрозрачных конструкций",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Системы дымоудаления",
          description: "Автоматические системы естественного дымоудаления",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero />
        <About />
        <Projects />
        <Directions />
        <ProductCatalog />
        <Contacts />
      </main>
    </>
  );
}
