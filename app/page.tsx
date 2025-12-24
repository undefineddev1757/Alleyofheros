import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import ThirdBlock from "./components/ThirdBlock";
import HeroesSlider from "./components/HeroesSlider";
import StoneBlock from "./components/StoneBlock";
import SoldierGallery from "./components/SoldierGallery";
import Footer from "./components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getHomeSettings() {
  try {
    let settings = await prisma.homePageSettings.findFirst({
      where: { id: 'default' },
    });

    if (!settings) {
      settings = await prisma.homePageSettings.create({
        data: {
          id: 'default',
          heroTitle: 'Алея',
          heroSubtitle: 'Друзів',
          isActive: true,
        },
      });
    }
    
    return settings;
  } catch (error) {
    console.error("Error fetching home settings:", error);
    return null;
  }
}

async function getFooterSettings() {
  try {
    let settings = await prisma.footerSettings.findFirst({
      where: { id: 'default' },
    });

    if (!settings) {
      settings = await prisma.footerSettings.create({
        data: {
          id: 'default',
          copyrightText: '© 2024 Алея Друзів. Всі права захищені.',
          isActive: true,
        },
      });
    }
    
    return settings;
  } catch (error) {
    console.error("Error fetching footer settings:", error);
    return null;
  }
}

export default async function Home() {
  const settings = await getHomeSettings();
  const footerSettings = await getFooterSettings();
  
  return (
    <main>
      <Header />
      <HeroBanner settings={settings} />
      <ThirdBlock settings={settings} />
      {settings?.showHeroesSlider && <HeroesSlider settings={settings} />}
      {settings?.showStoneBlock && <StoneBlock settings={settings} />}
      {settings?.showGallery && <SoldierGallery settings={settings} />}
      <Footer 
        address={footerSettings?.address || undefined}
        copyrightText={footerSettings?.copyrightText || undefined}
        email={footerSettings?.email || undefined}
        phone={footerSettings?.phone || undefined}
        facebookUrl={footerSettings?.facebookUrl || undefined}
        instagramUrl={footerSettings?.instagramUrl || undefined}
        twitterUrl={footerSettings?.twitterUrl || undefined}
        youtubeUrl={footerSettings?.youtubeUrl || undefined}
        telegramUrl={footerSettings?.telegramUrl || undefined}
        linkedinUrl={footerSettings?.linkedinUrl || undefined}
      />
    </main>
  );
}

