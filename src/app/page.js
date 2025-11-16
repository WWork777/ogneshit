import Header from "@/components/Header";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Directions from "@/components/Directions";
import ProductCatalog from "@/components/ProductCatalog";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
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
