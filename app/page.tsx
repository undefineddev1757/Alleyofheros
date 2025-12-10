import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import ThirdBlock from "./components/ThirdBlock";
import HeroesSlider from "./components/HeroesSlider";
import StoneBlock from "./components/StoneBlock";
import SoldierGallery from "./components/SoldierGallery";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroBanner />
      <ThirdBlock />
      <HeroesSlider />
      <StoneBlock />
      <SoldierGallery />
      <Footer />
    </main>
  );
}

