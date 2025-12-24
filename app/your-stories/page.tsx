import Header from "../components/Header";
import Footer from "../components/Footer";
import YourStoriesBanner from "./YourStoriesBanner";
import StoriesExample from "./StoriesExample";
import FormStoryBlock from "./FormStoryBlock";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getYourStoriesSettings() {
  try {
    let settings = await prisma.yourStoriesPageSettings.findFirst({
      where: { id: 'default' },
    });

    if (!settings) {
      settings = await prisma.yourStoriesPageSettings.create({
        data: {
          id: 'default',
          bannerTitle: 'ВАШІ ІСТОРІЇ',
          bannerSubtitle: 'Ми створюємо місце, де на стінах з\'являються портрети загиблих військових.',
          searchPlaceholder: 'Позивний/ПІБ',
          formTitle: 'у кожного — свій захисник, своя історія',
          formSubtitle: 'Поділись історією свого героя',
          formButtonText: 'Заповнити форму',
          isActive: true,
        },
      });
    }
    
    return settings;
  } catch (error) {
    console.error("Error fetching your stories settings:", error);
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

export default async function YourStoriesPage() {
  const settings = await getYourStoriesSettings();
  const footerSettings = await getFooterSettings();
  
  return (
    <main>
      <Header />
      
      <YourStoriesBanner 
        title={settings?.bannerTitle || 'ВАШІ ІСТОРІЇ'}
        subtitle={settings?.bannerSubtitle || 'Ми створюємо місце, де на стінах з\'являються портрети загиблих військових.'}
        searchPlaceholder={settings?.searchPlaceholder || 'Позивний/ПІБ'}
      />
      
      <StoriesExample />
      
      <FormStoryBlock 
        title={settings?.formTitle || 'у кожного — свій захисник, своя історія'}
        subtitle={settings?.formSubtitle || 'Поділись історією свого героя'}
        buttonText={settings?.formButtonText || 'Заповнити форму'}
      />
      
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
