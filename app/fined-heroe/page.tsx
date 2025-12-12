import Header from "../components/Header";
import Footer from "../components/Footer";
import FindHeroBanner from "./FindHeroBanner";
import HeroesList from "./HeroesList";

export default function FindedHeroePage() {
  return (
    <main>
      <Header />
      <FindHeroBanner />
      <HeroesList />
      <Footer />
    </main>
  );
}

