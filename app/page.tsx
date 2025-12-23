import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import ThirdBlock from "./components/ThirdBlock";
import HeroesSlider from "./components/HeroesSlider";
import StoneBlock from "./components/StoneBlock";
import SoldierGallery from "./components/SoldierGallery";
import Footer from "./components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getPageSections() {
  try {
    const sections = await prisma.pageSection.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    
    return sections.reduce((acc, section) => {
      acc[section.sectionKey] = section;
      return acc;
    }, {} as Record<string, any>);
  } catch (error) {
    console.error("Error fetching page sections:", error);
    return {};
  }
}

export default async function Home() {
  const sections = await getPageSections();
  
  return (
    <main>
      <Header />
      <HeroBanner section={sections.hero} />
      <ThirdBlock section={sections.about} />
      <HeroesSlider />
      <StoneBlock />
      <SoldierGallery />
      <Footer />
    </main>
  );
}

