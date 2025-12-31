import Header from "../components/Header";
import Footer from "../components/Footer";
import FindHeroBanner from "./FindHeroBanner";
import HeroesList from "./HeroesList";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getFindHeroSettings() {
  try {
    let settings = await prisma.findHeroPageSettings.findFirst({
      where: { id: 'default' },
    });

    if (!settings) {
      settings = await prisma.findHeroPageSettings.create({
        data: {
          id: 'default',
          bannerTitle_ua: 'Знайти героя',
          searchPlaceholder_ua: 'Позивний/ПІБ',
          medalImageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/12daba71a01ffc2fafdfaa3af92bdeb993584487?width=560',
          isActive: true,
        },
      });
    }
    
    return settings;
  } catch (error) {
    console.error("Error fetching find hero settings:", error);
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
          copyrightText_ua: '© 2024 Алея Друзів. Всі права захищені.',
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

export default async function FindedHeroePage() {
  const settings = await getFindHeroSettings();
  const footerSettings = await getFooterSettings();
  
  return (
    <main>
      <Header />
      <FindHeroBanner 
        title={settings?.bannerTitle_ua || 'Знайти героя'}
        searchPlaceholder={settings?.searchPlaceholder_ua || 'Позивний/ПІБ'}
        medalImageUrl={settings?.medalImageUrl || 'https://api.builder.io/api/v1/image/assets/TEMP/12daba71a01ffc2fafdfaa3af92bdeb993584487?width=560'}
      />
      <HeroesList />
      <Footer 
        address={footerSettings?.address || undefined}
        copyrightText={footerSettings?.copyrightText_ua || undefined}
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

