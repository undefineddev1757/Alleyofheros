"use client"

import React from 'react';
import './HeroPageFull.css';

export default function HeroBlockRenderer({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'text_quote':
            return <TextQuoteBlock key={block.id} block={block} />
          case 'two_column_text':
            return <TwoColumnTextBlock key={block.id} block={block} />
          case 'single_image':
            return <SingleImageBlock key={block.id} block={block} />
          case 'two_images':
            return <TwoImagesBlock key={block.id} block={block} />
          case 'horizontal_scroller':
            return <HorizontalScrollerBlock key={block.id} block={block} index={index} />
          case 'dark_quote_section':
            return <DarkQuoteSectionBlock key={block.id} block={block} />
          case 'divider':
            return <DividerBlock key={block.id} />
          default:
            return null
        }
      })}
    </>
  );
}

// Текст с цитатой + фото
function TextQuoteBlock({ block }) {
  const showTwoImages = block.imageLayout === 'two_side';
  
  return (
    <section className="content-section bg-beige">
      <div className="container">
        <div className="section-header">
          <svg className="quote-icon" width="32" height="24" viewBox="0 0 32 24" fill="none">
            <path d="M18.8 18.0707L20.0637 18.0707C23.4338 18.0707 24.8383 16.6588 25.1192 13.2707L18.8 13.2707L18.8 7.96353e-07L32 -3.57628e-07L32 10.7293C32 19.7646 27.5064 24 20.766 24L18.8 24L18.8 18.0707ZM1.10295e-06 18.0707L1.26368 18.0707C4.63384 18.0707 6.03828 16.6588 6.31916 13.2707L6.83325e-07 13.2707L-4.76838e-07 2.4399e-06L13.2 1.28592e-06L13.2 10.7293C13.2 19.7646 8.7064 24 1.966 24L1.62131e-06 24L1.10295e-06 18.0707Z" fill="#F2B202"/>
          </svg>
          <h2 className="section-title">{block.title}</h2>
        </div>
        
        <div className="two-column-text">
          <p>{block.columnText1}</p>
          <p>{block.columnText2}</p>
        </div>

        {/* Одно или два фото */}
        {showTwoImages ? (
          (block.imageUrl || block.imageUrl2) && (
            <div className="two-image-row">
              {block.imageUrl && (
                <div className="photo-container sport-photo">
                  <img src={block.imageUrl} alt={block.title} />
                </div>
              )}
              {block.imageUrl2 && (
                <div className="photo-container sport-photo">
                  <img src={block.imageUrl2} alt={block.title} />
                </div>
              )}
            </div>
          )
        ) : (
          block.imageUrl && (
            <div className={`photo-container ${block.imageSize || 'large'}`}>
              <img src={block.imageUrl} alt={block.title} />
            </div>
          )
        )}
      </div>
    </section>
  );
}

// Текст в 2 колонки
function TwoColumnTextBlock({ block }) {
  return (
    <section className="content-section bg-beige">
      <div className="container">
        <div className="section-header">
          <svg className="quote-icon" width="32" height="24" viewBox="0 0 32 24" fill="none">
            <path d="M18.8 18.0707L20.0637 18.0707C23.4338 18.0707 24.8383 16.6588 25.1192 13.2707L18.8 13.2707L18.8 7.96353e-07L32 -3.57628e-07L32 10.7293C32 19.7646 27.5064 24 20.766 24L18.8 24L18.8 18.0707ZM1.10295e-06 18.0707L1.26368 18.0707C4.63384 18.0707 6.03828 16.6588 6.31916 13.2707L6.83325e-07 13.2707L-4.76838e-07 2.4399e-06L13.2 1.28592e-06L13.2 10.7293C13.2 19.7646 8.7064 24 1.966 24L1.62131e-06 24L1.10295e-06 18.0707Z" fill="#F2B202"/>
          </svg>
          <h2 className="section-title">{block.title}</h2>
        </div>

        <div className="two-column-text">
          <p>{block.columnText1}</p>
          <p>{block.columnText2}</p>
        </div>
      </div>
    </section>
  );
}

// Одно изображение
function SingleImageBlock({ block }) {
  if (!block.imageUrl) return null;
  
  return (
    <section className="content-section bg-beige">
      <div className="container">
        <div className={`photo-container ${block.size}`}>
          <img src={block.imageUrl} alt="Фото" />
        </div>
      </div>
    </section>
  );
}

// Два изображения
function TwoImagesBlock({ block }) {
  if (!block.imageUrl1 && !block.imageUrl2) return null;
  
  return (
    <section className="content-section bg-beige">
      <div className="container">
        <div className="two-image-row">
          {block.imageUrl1 && (
            <div className="photo-container sport-photo">
              <img src={block.imageUrl1} alt="Фото 1" />
            </div>
          )}
          {block.imageUrl2 && (
            <div className="photo-container sport-photo">
              <img src={block.imageUrl2} alt="Фото 2" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Горизонтальный скроллер
function HorizontalScrollerBlock({ block, index }) {
  const scrollerId = `scroll-${block.id}`;
  const progressId = `progress-${block.id}`;

  React.useEffect(() => {
    const updateProgressBar = (scrollContainer, progressBar) => {
      if (!scrollContainer || !progressBar) return;
      const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const scrolled = scrollContainer.scrollLeft;
      const progress = (scrolled / scrollWidth) * 100;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    };

    const scrollContainer = document.getElementById(scrollerId);
    const progressBar = document.getElementById(progressId);

    const handleScroll = () => updateProgressBar(scrollContainer, progressBar);

    if (scrollContainer && progressBar) {
      scrollContainer.addEventListener('scroll', handleScroll);
      updateProgressBar(scrollContainer, progressBar);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollerId, progressId]);

  return (
    <section className="content-section bg-beige creativity-section">
      <svg className="background-logo" width="540" height="480" viewBox="0 0 540 480" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M357.907 176.849L375.629 176.858L357.907 224.451V334.383H394.381L413.723 300.343L465.194 300.305V300.286L445.804 266.18V266.15H431.789L449.214 235.53H419.84L481.744 162.737L390.379 181.745L419.687 130.993L508.842 130.983V97.6152L540 97.6254L527.642 130.983H536.427L486.422 266.15L497.809 266.18V300.286L514.664 300.277V334.393L481.02 334.402L461.621 368.508H427.853V402.596H323.823L346.638 429.021V480H310.844V429.021L288.029 402.596H276.726L299.54 429.021V480H263.746V429.021L240.932 402.596H229.628L252.442 429.021V480H216.648V429.021L193.834 402.596H90.9947V368.508H57.4929L37.8076 334.402H70.8326L50.847 280.969L20.5715 263.232L2.5248 188.54L8.08747 166.65L0 145.026H13.5778L13.5801 145.017L25.8689 96.7229L87.6022 52.4793L87.5925 63.8643L33.6441 102.195L22.7532 145.017L72.9858 144.998L57.655 103.605H96.2921V144.988L96.2824 144.998H114.042V334.393H204.76L139.893 160.961L203.312 160.932V160.914L187.982 119.531L226.608 119.521V160.923H244.369V193.945H248.857L248.867 1.91971L263.388 35.3157H255.583V193.945H271.144L257.537 218.125H255.583V334.393H277.537V176.829H295.554V135.437L334.182 135.446L318.851 176.82V176.839L351.18 176.849V33.4057H343.376L357.907 0V176.849ZM244.369 334.393H248.857V218.125H244.369V334.393ZM316.954 334.383H351.18V242.498L316.954 334.383ZM11.672 188.588L28.2891 257.367L45.8679 267.658L13.5396 181.226L11.672 188.588Z" fill="white" />
      </svg>
      
      <div className="container">
        <h2 className="section-title-left">{block.title}</h2>
        
        <div className="multi-column-layout" id={scrollerId}>
          {block.columns?.map((column, colIndex) => (
            <React.Fragment key={column.id}>
              <div className={`column ${column.isLarge ? 'large-column' : ''}`}>
                {column.quoteIcon && (
                  <svg className="quote-icon-small" width="32" height="24" viewBox="0 0 32 24">
                    <path d="M13.2 5.92928H11.9363C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293H13.2V24H0V13.2707C-7.89888e-07 4.23544 4.4936 2.40508e-05 11.234 0H13.2V5.92928ZM32 5.92928H30.7363C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293H32V24H18.8V13.2707C18.8 4.23544 23.2936 2.40508e-05 30.034 0H32V5.92928Z" fill="#F2B202"/>
                  </svg>
                )}
                {column.title && <h3 className="column-title">{column.title}</h3>}
                {column.text && <p>{column.text}</p>}
                {column.imageUrl && (
                  <div className="media-box">
                    <img src={column.imageUrl} alt={column.title || 'Фото'} />
                  </div>
                )}
              </div>
              {colIndex < block.columns.length - 1 && <div className="divider-vertical"></div>}
            </React.Fragment>
          ))}
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar-track">
            <div id={progressId} className="progress-bar-fill"></div>
          </div>
        </div>

        <div className="section-divider">
          <div className="divider-line full"></div>
          <div className="divider-line half"></div>
        </div>
      </div>
    </section>
  );
}

// Темная секция
function DarkQuoteSectionBlock({ block }) {
  return (
    <section className="dark-hero-section">
      {block.backgroundImage && (
        <img src={block.backgroundImage} alt={block.title} className="dark-hero-bg" />
      )}
      <div className="dark-hero-content">
        <h2 className="dark-hero-title">{block.title}</h2>
        <div className="quote-scroll">
          {block.quotes?.map((quote, index) => (
            <div key={quote.id} className={quote.isLarge ? 'quote-block' : 'quote-block-small'}>
              {index === 0 && (
                <svg className="quote-icon-white" width="32" height="24" viewBox="0 0 32 24" fill="none">
                  <path d="M18.8 18.0707L20.0637 18.0707C23.4338 18.0707 24.8383 16.6588 25.1192 13.2707L18.8 13.2707L18.8 7.96353e-07L32 -3.57628e-07L32 10.7293C32 19.7646 27.5064 24 20.766 24L18.8 24L18.8 18.0707ZM1.10295e-06 18.0707L1.26368 18.0707C4.63384 18.0707 6.03828 16.6588 6.31916 13.2707L6.83325e-07 13.2707L-4.76838e-07 2.4399e-06L13.2 1.28592e-06L13.2 10.7293C13.2 19.7646 8.7064 24 1.966 24L1.62131e-06 24L1.10295e-06 18.0707Z" fill="#F2B202"/>
                </svg>
              )}
              <p className={quote.isLarge ? 'quote-text-large' : 'quote-text-small'}>
                {quote.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Разделитель
function DividerBlock() {
  return (
    <div className="divider-container">
      <div className="page-divider"></div>
    </div>
  );
}

