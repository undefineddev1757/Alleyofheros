"use client"

import React from 'react';
import './HeroPageFull.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import HeroBlockRenderer from './HeroBlockRenderer';

const HeroPageFull = ({ hero, footerSettings }) => {
  // Данные героя с fallback
  const heroData = hero || {
    callSign: 'Позивний',
    name: 'Ім\'я Прізвище',
  }

  // Блоки контента из конструктора
  const blocks = hero?.content?.blocks || []

  return (
    <>
      {/* Desktop Version */}
      <div className="hero-page-full-desktop">
        <Header />

        {/* Hero Section - Баннер героя */}
        <section className="hero-section">
          <img 
            src={heroData.bannerUrl || heroData.imageUrl || "https://api.builder.io/api/v1/image/assets/TEMP/f62a753ba21a06c9e2fc1cc53021b7f63a2ea755?width=2880"}
            alt={heroData.name || "Герой"}
            className="hero-image"
          />
          <div className="hero-content">
            <h1 className="hero-title">{heroData.callSign || "Позивний"}</h1>
            <p className="hero-subtitle">{heroData.name || "Ім'я Прізвище"}</p>
          </div>
        </section>

        {/* Контент з конструктора блоків */}
        {blocks.length > 0 ? (
          <HeroBlockRenderer blocks={blocks} />
        ) : (
          <section className="content-section bg-beige">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">Контент героя</h2>
              </div>
              <p className="text-center text-muted-foreground py-8">
                Контент для цього героя ще не додано.<br />
                Використовуйте конструктор блоків у адмін-панелі для створення сторінки.
              </p>
            </div>
          </section>
        )}

        <Footer
          address="Дніпровська Набережна,\nм. Київ, Україна"
          copyrightText={footerSettings?.copyrightText_ua || '© 2025'}
          facebookUrl={footerSettings?.facebookUrl}
          instagramUrl={footerSettings?.instagramUrl}
          twitterUrl={footerSettings?.twitterUrl}
          youtubeUrl={footerSettings?.youtubeUrl}
          telegramUrl={footerSettings?.telegramUrl}
          linkedinUrl={footerSettings?.linkedinUrl}
        />
      </div>

      {/* Mobile Version */}
      <div className="hero-page-full-mobile">
        <Header />
        
        {/* Mobile Hero Section */}
        <section className="mobile-hero-section">
          <img 
            src={heroData.bannerUrl || heroData.imageUrl || "https://api.builder.io/api/v1/image/assets/TEMP/f62a753ba21a06c9e2fc1cc53021b7f63a2ea755?width=2880"}
            alt={heroData.name}
            className="mobile-hero-image"
          />
          <div className="mobile-hero-content">
            <h1 className="mobile-hero-title">{heroData.callSign}</h1>
            <p className="mobile-hero-subtitle">{heroData.name}</p>
          </div>
        </section>

        {/* Mobile Content - пока просто заглушка */}
        <div className="mobile-content-wrapper">
          {blocks.length > 0 ? (
            <div className="mobile-section">
              <p className="mobile-text text-center">
                Мобільна версія в розробці.<br />
                Переглядайте сторінку на комп'ютері.
              </p>
            </div>
          ) : (
            <div className="mobile-section">
              <p className="mobile-text text-center">
                Контент для цього героя ще не додано.
              </p>
            </div>
          )}
        </div>

        <Footer
          address="Дніпровська Набережна,\nм. Київ, Україна"
          copyrightText={footerSettings?.copyrightText_ua || '© 2025'}
          facebookUrl={footerSettings?.facebookUrl}
          instagramUrl={footerSettings?.instagramUrl}
          twitterUrl={footerSettings?.twitterUrl}
          youtubeUrl={footerSettings?.youtubeUrl}
          telegramUrl={footerSettings?.telegramUrl}
          linkedinUrl={footerSettings?.linkedinUrl}
        />
      </div>
    </>
  );
};

export default HeroPageFull;
