"use client"

import React, { useEffect } from 'react';
import './HeroPageFull.css';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const HeroPageFull = ({ hero, footerSettings }) => {
  useEffect(() => {
    const updateProgressBar = (scrollContainer, progressBar) => {
      if (!scrollContainer || !progressBar) return;
      
      const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const scrolled = scrollContainer.scrollLeft;
      const progress = (scrolled / scrollWidth) * 100;
      
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    };

    const creativityScroll = document.getElementById('creativity-scroll');
    const creativityProgress = document.getElementById('creativity-progress');
    const memoryScroll = document.getElementById('memory-scroll');
    const memoryProgress = document.getElementById('memory-progress');

    const handleCreativityScroll = () => updateProgressBar(creativityScroll, creativityProgress);
    const handleMemoryScroll = () => updateProgressBar(memoryScroll, memoryProgress);

    if (creativityScroll && creativityProgress) {
      creativityScroll.addEventListener('scroll', handleCreativityScroll);
      // Initial update
      updateProgressBar(creativityScroll, creativityProgress);
    }

    if (memoryScroll && memoryProgress) {
      memoryScroll.addEventListener('scroll', handleMemoryScroll);
      // Initial update
      updateProgressBar(memoryScroll, memoryProgress);
    }

    return () => {
      if (creativityScroll) {
        creativityScroll.removeEventListener('scroll', handleCreativityScroll);
      }
      if (memoryScroll) {
        memoryScroll.removeEventListener('scroll', handleMemoryScroll);
      }
    };
  }, []);
  // Если hero не передан, используем демо-данные
  const heroData = hero || {
    callSign: 'Жрець',
    name: 'Володимир Плетньов',
    imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/f62a753ba21a06c9e2fc1cc53021b7f63a2ea755?width=2880'
  }

  return (
    <>
      {/* Desktop Version */}
      <div className="hero-page-full-desktop">
        <Header />

        {/* Hero Section */}
        <section className="hero-section">
          <img 
            src={heroData.imageUrl || "https://api.builder.io/api/v1/image/assets/TEMP/f62a753ba21a06c9e2fc1cc53021b7f63a2ea755?width=2880"}
            alt={heroData.name || "Герой"}
            className="hero-image"
          />
          <div className="hero-content">
            <h1 className="hero-title">{heroData.callSign || "Позивний"}</h1>
            <p className="hero-subtitle">{heroData.name || "Ім'я Прізвище"}</p>
          </div>
        </section>

        {/* Section 2 - Ким він був для нас */}
        <section className="content-section bg-beige">
          <div className="container">
            <div className="section-header">
              <svg className="quote-icon" width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.8 18.0707L20.0637 18.0707C23.4338 18.0707 24.8383 16.6588 25.1192 13.2707L18.8 13.2707L18.8 7.96353e-07L32 -3.57628e-07L32 10.7293C32 19.7646 27.5064 24 20.766 24L18.8 24L18.8 18.0707ZM1.10295e-06 18.0707L1.26368 18.0707C4.63384 18.0707 6.03828 16.6588 6.31916 13.2707L6.83325e-07 13.2707L-4.76838e-07 2.4399e-06L13.2 1.28592e-06L13.2 10.7293C13.2 19.7646 8.7064 24 1.966 24L1.62131e-06 24L1.10295e-06 18.0707Z" fill="#F2B202"/>
              </svg>
              <h2 className="section-title">Ким він був для нас</h2>
            </div>
            
            <div className="two-column-text">
              <p>Володимир Плетньов народився 19 лютого 1999 року в Харкові. Навчався у школі №37, а потім закінчив історичний факультет Харківського національного педагогічного університету імені Григорія Сковороди. Його викладачі та друзі згадують активного, світлого юнака, який вдихав кожну мить життя на повні груди. Він був самостійним ще з підліткового віку — сам підготувався до вступу на бюджет, почав підробляти, щоб не залежати від батьків.</p>
              <p>Володимир завжди знав, чого хоче, і йшов до своєї мети. Для всіх, хто його знав, він був справжнім Жрецем — тому що це насправді відображало його суть. Він з дитинства серйозно вивчав слов'янську віру, скандинавську міфологію, давні обряди. Міг годинами розповідати про ритуали, про те, як жреці були провідниками вищих сил на Землі. Для нього це не було простим захопленням — це була частина того, ким він є.</p>
            </div>

            <div className="photo-container large">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/d2a2cabf67b080c3b8796e7be44004622865c008?width=2400" alt="Фото" />
            </div>
          </div>
        </section>

        {/* Section 3 - Творчість та природа */}
        <section className="content-section bg-beige creativity-section">
          <svg className="background-logo" width="540" height="480" viewBox="0 0 540 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M357.907 176.849L375.629 176.858L357.907 224.451V334.383H394.381L413.723 300.343L465.194 300.305V300.286L445.804 266.18V266.15H431.789L449.214 235.53H419.84L481.744 162.737L390.379 181.745L419.687 130.993L508.842 130.983V97.6152L540 97.6254L527.642 130.983H536.427L486.422 266.15L497.809 266.18V300.286L514.664 300.277V334.393L481.02 334.402L461.621 368.508H427.853V402.596H323.823L346.638 429.021V480H310.844V429.021L288.029 402.596H276.726L299.54 429.021V480H263.746V429.021L240.932 402.596H229.628L252.442 429.021V480H216.648V429.021L193.834 402.596H90.9947V368.508H57.4929L37.8076 334.402H70.8326L50.847 280.969L20.5715 263.232L2.5248 188.54L8.08747 166.65L0 145.026H13.5778L13.5801 145.017L25.8689 96.7229L87.6022 52.4793L87.5925 63.8643L33.6441 102.195L22.7532 145.017L72.9858 144.998L57.655 103.605H96.2921V144.988L96.2824 144.998H114.042V334.393H204.76L139.893 160.961L203.312 160.932V160.914L187.982 119.531L226.608 119.521V160.923H244.369V193.945H248.857L248.867 1.91971L263.388 35.3157H255.583V193.945H271.144L257.537 218.125H255.583V334.393H277.537V176.829H295.554V135.437L334.182 135.446L318.851 176.82V176.839L351.18 176.849V33.4057H343.376L357.907 0V176.849ZM244.369 334.393H248.857V218.125H244.369V334.393ZM316.954 334.383H351.18V242.498L316.954 334.383ZM11.672 188.588L28.2891 257.367L45.8679 267.658L13.5396 181.226L11.672 188.588Z" fill="white" />
          </svg>
          <div className="container">
            <h2 className="section-title-left">Творчість та природа</h2>
            
            <div className="multi-column-layout" id="creativity-scroll">
              <div className="column">
                <svg className="quote-icon-small" width="32" height="24" viewBox="0 0 32 24">
                  <path d="M13.2 5.92928H11.9363C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293H13.2V24H0V13.2707C-7.89888e-07 4.23544 4.4936 2.40508e-05 11.234 0H13.2V5.92928ZM32 5.92928H30.7363C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293H32V24H18.8V13.2707C18.8 4.23544 23.2936 2.40508e-05 30.034 0H32V5.92928Z" fill="#F2B202"/>
                </svg>
                <h3 className="column-title">Володимир мав велике серце — чисте й водночас справедливе.</h3>
                <p>Він міг пройти десятки кілометрів по лісу сам, щоб побути наодинці з природою. Обожнював тварин — рятував безпритульних котів і собак, захищав їх, як міг. Друзі жартували, що він міг би зупинити ведмедя однією рукою, а другою — погладити кошеня.</p>
                <p>«У нас був виїзд, ротація в Водяне у 2021 році. Ми знаходилися в будинку, відпочивали після зміни, і почався дуже великий дощ на вулиці, шторм просто. І Вова під час цього шторму, замість того щоб знаходитися в будинку, у теплі, вийшов на вулицю холостив, повзав, повністю у всьому спорядженні, повністю заряджений — ПКМ, рюкзак. Отакий він був».</p>
              </div>

              <div className="divider-vertical"></div>

              <div className="column">
                <svg className="quote-icon-small" width="32" height="24" viewBox="0 0 32 24">
                  <path d="M13.2 5.92928H11.9363C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293H13.2V24H0V13.2707C-7.89888e-07 4.23544 4.4936 2.40508e-05 11.234 0H13.2V5.92928ZM32 5.92928H30.7363C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293H32V24H18.8V13.2707C18.8 4.23544 23.2936 2.40508e-05 30.034 0H32V5.92928Z" fill="#F2B202"/>
                </svg>
                <h3 className="column-title">Але найбільше Жреця розкривала творчість.</h3>
                <p>Він малював, ліпив з глини фігурки, писав вірші та есе. Все, що він створював, родина зберігає досі як найдорожчу пам'ять. Його твори — частинки його душі, яку він залишив тут, з нами, а слова у них завжди були глибокими та чесними, навіть відвертими.</p>
                <p>Одна з його думок, яку він записав ще до війни, розкриває його філософію життя:</p>
                <h3 className="column-title">«Що таке життя? Життя — це рух.</h3>
              </div>

              <div className="divider-vertical"></div>

              <div className="column">
                <h3 className="column-title">«Що таке життя? Життя — це рух.</h3>
                <p>Зірки мільярди років рухаються Чумацьким Шляхом, Земля невпинно обертається навколо Сонця, найдрібніші частинки також перебувають у постійному русі. У кожному живому організмі ніколи не припиняються життєві процеси. Серце постійно скорочується, запускаючи в рух по венах і артеріях кров, мозок навіть уві сні не припиняє своєї роботи з керування всім організмом, регенерація клітин відбувається постійно. Якщо вони зупиняють свою роботу — людина вмирає.</p>
                <h3 className="column-title">Тобто, відсутність руху — це явище, протилежне життю, тобто смерть.</h3>
                <svg className="quote-icon-small quote-end" width="32" height="24" viewBox="0 0 32 24">
                  <path d="M18.8 18.0707L20.0637 18.0707C23.4338 18.0707 24.8383 16.6588 25.1192 13.2707L18.8 13.2707L18.8 1.28592e-06L32 2.4399e-06L32 10.7293C32 19.7646 27.5064 24 20.766 24L18.8 24L18.8 18.0707ZM4.1517e-08 18.0707L1.26368 18.0707C4.63384 18.0707 6.03828 16.6588 6.31916 13.2707L4.61146e-07 13.2707L1.62131e-06 -3.57627e-07L13.2 7.96353e-07L13.2 10.7293C13.2 19.7646 8.7064 24 1.966 24L-4.76837e-07 24L4.1517e-08 18.0707Z" fill="#F2B202"/>
                </svg>
              </div>

              <div className="divider-vertical"></div>

              <div className="column large-column">
                <div className="media-box">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/c0bdb4172858337dfa951ee5af172758a904860f?width=1200" alt="Творчість" />
                </div>
                <svg className="quote-icon-small" width="32" height="24" viewBox="0 0 32 24">
                  <path d="M13.2 5.92928H11.9363C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293L13.2 10.7293L13.2 24H0L0 13.2707C-7.89888e-07 4.23544 4.4936 2.40508e-05 11.234 0L13.2 0V5.92928ZM32 5.92928H30.7363C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293H32V24H18.8L18.8 13.2707C18.8 4.23544 23.2936 2.40508e-05 30.034 0L32 0V5.92928Z" fill="#F2B202"/>
                </svg>
                <p>Тільки в постійному русі людина може залишатися живою і здоровою. Причому як у фізичному, так і в духовному плані. Відсутність навантажень на м'язи призводить до їх атрофії, відсутність інтелектуального навантаження призводить до отупіння. Не можна залишатися на одному рівні в чому б те не було — статичність означає деградацію, деградація означає смерть.</p>
              </div>

              <div className="divider-vertical"></div>

              <div className="column">
                <h3 className="column-title">Причому смерть не лише фізичну, а й моральну,</h3>
                <p>після якої починається не життя, а існування, що набагато гірше за фізичну смерть. Ніколи не зупиняйтеся, будьте як Сонце, що мільярди років рухається Чумацьким Шляхом і дає своїм жаром тепло і світло всьому живому на Землі! Так і ви, постійно йдіть вперед, безкінечно вдосконалюючись, своїм внутрішнім полум'ям зігріваючи інших і освітлюючи їм шлях!» — з думок Володимира (переклад з російської)</p>
                <p>Багато чого згоріло в Маріуполі, але те, що вціліло — тепер як реліквії.</p>
                <svg className="quote-icon-small quote-end" width="32" height="24" viewBox="0 0 32 24">
                  <path d="M18.8 18.0707L20.0637 18.0707C23.4338 18.0707 24.8383 16.6588 25.1192 13.2707L18.8 13.2707L18.8 7.96353e-07L32 -3.57628e-07L32 10.7293C32 19.7646 27.5064 24 20.766 24L18.8 24L18.8 18.0707ZM1.10295e-06 18.0707L1.26368 18.0707C4.63384 18.0707 6.03828 16.6588 6.31916 13.2707L6.83325e-07 13.2707L-4.76838e-07 2.4399e-06L13.2 1.28592e-06L13.2 10.7293C13.2 19.7646 8.7064 24 1.966 24L1.62131e-06 24L1.10295e-06 18.0707Z" fill="#F2B202"/>
                </svg>
              </div>
            </div>

            <div className="scroll-progress-container">
              <div className="scroll-progress-bar" id="creativity-progress"></div>
            </div>

            <div className="section-divider">
              <div className="divider-line full"></div>
              <div className="divider-line half"></div>
            </div>
          </div>
        </section>

        {/* Section 4 - Книги та історія */}
        <section className="content-section bg-beige">
          <div className="container">
            <div className="section-header">
              <svg className="quote-icon" width="32" height="24" viewBox="0 0 32 24" fill="none">
                <path d="M18.8 18.0707L20.0637 18.0707C23.4338 18.0707 24.8383 16.6588 25.1192 13.2707L18.8 13.2707L18.8 7.96353e-07L32 -3.57628e-07L32 10.7293C32 19.7646 27.5064 24 20.766 24L18.8 24L18.8 18.0707ZM1.10295e-06 18.0707L1.26368 18.0707C4.63384 18.0707 6.03828 16.6588 6.31916 13.2707L6.83325e-07 13.2707L-4.76838e-07 2.4399e-06L13.2 1.28592e-06L13.2 10.7293C13.2 19.7646 8.7064 24 1.966 24L1.62131e-06 24L1.10295e-06 18.0707Z" fill="#F2B202"/>
              </svg>
              <h2 className="section-title">Книги та історія</h2>
            </div>

            <div className="two-column-text">
              <p>«Спогади про Вову — тільки добрі, позитивні. Через те, що людина була позитивна. Його вигляд не відповідав тому, який він був у реальності. Це була дуже добра людина. Я таких людей нікого не бачив. Багато про історію спілкувалися. Він дуже начитана людина, дуже багато книг читав, дуже багато цитат із різних книг наводив» Володимир збирав свою бібліотеку змалечку — там були унікальні, рідкісні книги, енциклопедії, історичні видання.</p>
              <p>Найкращим подарунком для нього завжди була книга. Ще з перших класів школи його захоплювала історія України та козацтва — міг годинами розповідати про битви, давніх гетьманів, життя воїнів. З восьми років цікавився бойовим мистецтвом, зброєю, релігіями. Читання для нього було способом пізнавати світ і самого себе. Він міг зачитатися так, що забував про все навколо.</p>
            </div>

            <div className="photo-container medium">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/7c21728d554e9d19738c77b9a00336ae33b63f8f?width=2400" alt="Книги" />
            </div>
          </div>
        </section>

        <div className="divider-container">
          <div className="page-divider"></div>
        </div>

        {/* Section 5 - Спорт */}
        <section className="content-section bg-beige">
          <div className="container">
            <div className="section-header">
              <svg className="quote-icon" width="32" height="24" viewBox="0 0 32 24" fill="none">
                <path d="M18.8 18.0707L20.0637 18.0707C23.4338 18.0707 24.8383 16.6588 25.1192 13.2707L18.8 13.2707L18.8 7.96353e-07L32 -3.57628e-07L32 10.7293C32 19.7646 27.5064 24 20.766 24L18.8 24L18.8 18.0707ZM1.10295e-06 18.0707L1.26368 18.0707C4.63384 18.0707 6.03828 16.6588 6.31916 13.2707L6.83325e-07 13.2707L-4.76838e-07 2.4399e-06L13.2 1.28592e-06L13.2 10.7293C13.2 19.7646 8.7064 24 1.966 24L1.62131e-06 24L1.10295e-06 18.0707Z" fill="#F2B202"/>
              </svg>
              <h2 className="section-title">Спорт</h2>
            </div>

            <div className="two-column-text">
              <p>Володимир займався спортом майже все своє життя. Почав з плавання у п'ять років, потім була стрільба з лука, легка атлетика, баскетбол, бокс. Згодом він захопився важкою атлетикою, боротьбою, кросфітом. Він сам складав собі програми тренувань і постійно підвищував планку. Не тому, що хотів когось вразити, а тому що для нього це було про постійну роботу над собою, про силу духу, а не лише м'язів.</p>
              <p>«У нього руки були більші, ніж у деяких голова. Але він був настільки добрий, що це не вкладалося в голові». Володимир вдосконалював свої спортивні навички, щоб потрапити до «Азову», який на той час вже став легендарним. Він мріяв стати справжнім воїном, як предки-козаки. Він був у неймовірній фізичній формі, але найсильнішим завжди залишався його дух та характер.</p>
            </div>

            <div className="two-image-row">
              <div className="photo-container sport-photo">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/cd1e0d444d8405f7f21fa415cce5cf3fe8b222e5?width=1168" alt="Спорт 1" />
              </div>
              <div className="photo-container sport-photo">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/a954b5c03a6021a345c9a9b9afbf985302e6e785?width=1168" alt="Спорт 2" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 - Служба в Азові */}
        <section className="content-section bg-beige">
          <div className="container">
            <div className="section-header">
              <svg className="quote-icon" width="32" height="24" viewBox="0 0 32 24" fill="none">
                <path d="M18.8 18.0707L20.0637 18.0707C23.4338 18.0707 24.8383 16.6588 25.1192 13.2707L18.8 13.2707L18.8 7.96353e-07L32 -3.57628e-07L32 10.7293C32 19.7646 27.5064 24 20.766 24L18.8 24L18.8 18.0707ZM1.10295e-06 18.0707L1.26368 18.0707C4.63384 18.0707 6.03828 16.6588 6.31916 13.2707L6.83325e-07 13.2707L-4.76838e-07 2.4399e-06L13.2 1.28592e-06L13.2 10.7293C13.2 19.7646 8.7064 24 1.966 24L1.62131e-06 24L1.10295e-06 18.0707Z" fill="#F2B202"/>
              </svg>
              <h2 className="section-title">Служба в «Азові»</h2>
            </div>

            <div className="two-column-text">
              <p>З початком війни на Сході в 2014 році Володимир хотів піти добровольцем, але довелося чекати повноліття. Тоді він брав участь у виїздах у зону АТО та волонтерських акціях. Він знав, що буде війна, і готувався до цього дуже давно. «Він пішов у 2019-му. А до війни він готувався дуже серйозно, у нього була чітка ціль — захищати нашу країну… Він був готовий зустрічати ворогів з самого початку. І пішов, щоб бути корисним по-справжньому, у найкращому підрозділі нашої країни».</p>
              <p>Був кулеметником у розвідці (ГРСП). Маючи також навички медика, він став одним з найкращих бійців підрозділу. Побратими згадують його як надзвичайно мотивованого бійця, якому подобалася його справа. «Ти розумієш, що ця людина була надзвичайно мотивована, і йому подобалася його справа, яку він обрав. Першочергово — іти воювати, захищати свою країну, вбивати ворогів». Навіть після потрапляння на службу він встигав брати участь у житті фанатського колективу.</p>
            </div>

            <div className="photo-container large">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/637936f0980c26b8cf582b597b03d11cf992a466?width=2560" alt="Азов" />
            </div>
          </div>
        </section>

        {/* Section 7 - 24 лютого 2022 */}
        <section className="dark-hero-section">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/5c69410ee9c51723185851fcf6d00e210ab1bc87?width=4230"
            alt="24 лютого 2022"
            className="dark-hero-bg"
          />
          <div className="dark-hero-content">
            <h2 className="dark-hero-title">24 лютого 2022</h2>
            <div className="quote-scroll">
              <div className="quote-block">
                <svg className="quote-icon-white" width="32" height="24" viewBox="0 0 32 24" fill="none">
                  <path d="M18.8 18.0707L20.0637 18.0707C23.4338 18.0707 24.8383 16.6588 25.1192 13.2707L18.8 13.2707L18.8 7.96353e-07L32 -3.57628e-07L32 10.7293C32 19.7646 27.5064 24 20.766 24L18.8 24L18.8 18.0707ZM1.10295e-06 18.0707L1.26368 18.0707C4.63384 18.0707 6.03828 16.6588 6.31916 13.2707L6.83325e-07 13.2707L-4.76838e-07 2.4399e-06L13.2 1.28592e-06L13.2 10.7293C13.2 19.7646 8.7064 24 1.966 24L1.62131e-06 24L1.10295e-06 18.0707Z" fill="#F2B202"/>
                </svg>
                <p className="quote-text-large">«Я спілкувався з ним за п'ять днів до початку повномасштабної війни. Я завжди радився з ним щодо цих моментів, і він казав: "Все буде чітко. Зараз ми їх розкатаємо, швиденько, і все буде класно"», — згадує Михайло Козак.</p>
                <svg className="quote-icon-white quote-end-icon" width="32" height="24" viewBox="0 0 32 24" fill="none">
                  <path d="M13.2 5.92928L11.9363 5.92928C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293L13.2 10.7293L13.2 24L0 24L1.87597e-06 13.2707C2.66586e-06 4.23544 4.4936 2.48364e-05 11.234 1.96421e-06L13.2 2.30796e-06L13.2 5.92928ZM32 5.92929L30.7363 5.92929C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293L32 10.7293L32 24L18.8 24L18.8 13.2707C18.8 4.23544 23.2936 2.81235e-05 30.034 5.25131e-06L32 5.59506e-06L32 5.92929Z" fill="#F2B202"/>
                </svg>
              </div>

              <div className="quote-block-small">
                <p className="quote-text-small">24 лютого 2022 року, в перші години повномасштабного вторгнення, Жрець виконував бойове завдання у напрямку Широкиного — саме його група першою зустріла ворога. Він сів у автомобіль, який був передовим, у дозорі. Залишив усе спорядження на задньому місці, навіть каску. Через те, що автомобіль був передовим, ворог відкрив вогонь, і Володимир отримав пряме кульове поранення в голову.</p>
              </div>

              <div className="quote-block-small">
                <p className="quote-text-small">Побратими надали першу допомогу та евакуювали його до шпиталю в Маріуполі. Наступного ранку, 25 лютого 2022 року, Володимир Плетньов помер. Йому було всього 23 роки.</p>
              </div>

              <div className="quote-block-small">
                <p className="quote-text-small">«Повинен був я бути на його місці. Повинен був я їхати в тому автомобілі. Я міг би їхати в касці, я б міг би зберегти собі життя таким чином. Замість мене сів Жрець. І вийшло так, що він загинув. Але, знаєте, мені здається, що в його позивному є щось більше... жрець. Жреці — це люди, які лікують інших, і врятовують, і в кращий світ їх забирають. І мені здається так, що він пожертвував собою заради мене», — згадує побратим Дмитро Канупер.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8 - Мама */}
        <section className="content-section bg-beige">
          <div className="container">
            <div className="section-header">
              <svg className="quote-icon" width="32" height="24" viewBox="0 0 32 24" fill="none">
                <path d="M18.8 18.0707L20.0637 18.0707C23.4338 18.0707 24.8383 16.6588 25.1192 13.2707L18.8 13.2707L18.8 7.96353e-07L32 -3.57628e-07L32 10.7293C32 19.7646 27.5064 24 20.766 24L18.8 24L18.8 18.0707ZM1.10295e-06 18.0707L1.26368 18.0707C4.63384 18.0707 6.03828 16.6588 6.31916 13.2707L6.83325e-07 13.2707L-4.76838e-07 2.4399e-06L13.2 1.28592e-06L13.2 10.7293C13.2 19.7646 8.7064 24 1.966 24L1.62131e-06 24L1.10295e-06 18.0707Z" fill="#F2B202"/>
              </svg>
              <h2 className="section-title">Мама, яка продовжила його шлях</h2>
            </div>

            <div className="two-column-text">
              <p>«Мама на той момент була вже медиком. Я коли вийшов з полону, я дізнався, що вона воювала більше двох років. Воювала бойовим медиком на нулі в бойовому підрозділі. Ви повинні розуміти, наскільки в нього крута мама. Крута мама, яка після смерті свого сина пішла воювати, і вона ще й собі татуювання з позивним Жрець набила», — Дмитро Канупер. Мама Володимира, Тетяна Плетньова, після загибелі сина пішла воювати бойовим медиком на передову.</p>
              <p>«У перші години повномасштабної війни син виконував бойове завдання у напрямку Широкиного. Група Володі першою зустріла ворога. Син отримав важке поранення в голову. Через два дні мені подзвонили його командири і побратими, що вранці 25 лютого Володя помер у Маріуполі. Приблизно в той час наді мною пролетів білий лебідь. А за день-два до загибелі сина в мене зламався браслет годинника, який подарував Володя. Син досі не похований. Я тричі здавала ДНК, але співпадіння поки що немає», — розповідає Тетяна.</p>
            </div>
          </div>
        </section>

        {/* Section 9 - Пам'ять */}
        <section className="content-section bg-beige memory-section">
          <div className="container">
            <h2 className="section-title-left">Пам'ять</h2>

            <div className="memory-grid" id="memory-scroll">
              <div className="memory-item">
                <div className="photo-container memory-photo">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/69c16ec65583c88afd8dd83b21dc54dc1428dcce?width=600" alt="Пам'ять 1" />
                </div>
                <svg className="quote-icon-small" width="32" height="24" viewBox="0 0 32 24">
                  <path d="M13.2 5.92928H11.9363C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293H13.2V24H0V13.2707C-7.89888e-07 4.23544 4.4936 2.40508e-05 11.234 0H13.2V5.92928ZM32 5.92928H30.7363C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293H32V24H18.8V13.2707C18.8 4.23544 23.2936 2.40508e-05 30.034 0H32V5.92928Z" fill="#F2B202"/>
                </svg>
                <p>«Володя мріяв про сім'ю, дітей, свою справу. Про власний будинок біля моря і лісу. Мав наречену. Любив тварин і природу. У нього було велике серце — ніжне, сильне й справедливе».</p>
              </div>

              <div className="divider-vertical"></div>

              <div className="memory-item">
                <svg className="quote-icon-small" width="32" height="24" viewBox="0 0 32 24">
                  <path d="M13.2 5.92928H11.9363C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293H13.2V24H0V13.2707C-7.89888e-07 4.23544 4.4936 2.40508e-05 11.234 0H13.2V5.92928ZM32 5.92928H30.7363C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293H32V24H18.8V13.2707C18.8 4.23544 23.2936 2.40508e-05 30.034 0H32V5.92928Z" fill="#F2B202"/>
                </svg>
                <p>23 серпня 2023 року на будівлі школи №37 у Харкові, де навчався Володимир, відкрили меморіальну дошку. Його побратими з «Азову» та фанати «Металіста» організовують спортивні події на його честь.</p>
                <h3 className="column-title">— як символ шляху і сили духу.</h3>
              </div>

              <div className="divider-vertical"></div>

              <div className="memory-item">
                <div className="photo-container memory-photo">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/bb41df5d54cb56e890f9bf426d5f5c90c236b778?width=600" alt="Пам'ять 2" />
                </div>
                <svg className="quote-icon-small" width="32" height="24" viewBox="0 0 32 24">
                  <path d="M13.2 5.92928H11.9363C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293H13.2V24H0V13.2707C-7.89888e-07 4.23544 4.4936 2.40508e-05 11.234 0H13.2V5.92928ZM32 5.92928H30.7363C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293H32V24H18.8V13.2707C18.8 4.23544 23.2936 2.40508e-05 30.034 0H32V5.92928Z" fill="#F2B202"/>
                </svg>
                <p>«Кожен підйом — це частинка пам'яті про Вову. Він був із тих, хто не зупиняється, навіть коли важко».</p>
              </div>

              <div className="divider-vertical"></div>

              <div className="memory-item">
                <svg className="quote-icon-small" width="32" height="24" viewBox="0 0 32 24">
                  <path d="M13.2 5.92928H11.9363C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293H13.2V24H0V13.2707C-7.89888e-07 4.23544 4.4936 2.40508e-05 11.234 0H13.2V5.92928ZM32 5.92928H30.7363C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293H32V24H18.8V13.2707C18.8 4.23544 23.2936 2.40508e-05 30.034 0H32V5.92928Z" fill="#F2B202"/>
                </svg>
                <p>Володимир Плетньов був захисником і опорою своєї сім'ї. Прикладом для всіх, хто його знав. Він залишив після себе не просто спогади, а справжнє відчуття того, яким має бути</p>
                <h3 className="column-title">справжній чоловік, друг, син і воїн.</h3>
                <p>«Вова? Він неймовірний чоловік, дуже хороший друг, я вважаю, один з найкращих синів нашої нації. Дуже чистий, дуже прозорий», — Михайло Козак.</p>
              </div>

              <div className="divider-vertical"></div>

              <div className="memory-item large-memory">
                <div className="photo-container memory-photo-large">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/2fb664545dcf3572743d715f5242c77e064eb9ad?width=1160" alt="Пам'ять 3" />
                </div>
                <svg className="quote-icon-small" width="32" height="24" viewBox="0 0 32 24">
                  <path d="M13.2 5.92928H11.9363C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293H13.2V24H0V13.2707C-7.89888e-07 4.23544 4.4936 2.40508e-05 11.234 0H13.2V5.92928ZM32 5.92928H30.7363C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293H32V24H18.8V13.2707C18.8 4.23544 23.2936 2.40508e-05 30.034 0H32V5.92928Z" fill="#F2B202"/>
                </svg>
                <p>«Дуже хороший чоловік, добрий. Він має велике серце. Неймовірний чоловік. Позитивний, енергійний, ввічливий, розумний, цілеспрямований. Друже, я тебе люблю та сумую!» — Дмитро Канупер.</p>
                <h3 className="column-title">Пам'ять про нього продовжує жити в кожному, хто про нього розповідає.</h3>
              </div>
            </div>

            <div className="scroll-progress-container">
              <div className="scroll-progress-bar" id="memory-progress"></div>
            </div>

            <div className="section-divider">
              <div className="divider-line full"></div>
              <div className="divider-line half"></div>
            </div>
          </div>
        </section>

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

      {/* Mobile Version - Placeholder for now */}
      <div className="hero-page-full-mobile">
        {/* Mobile implementation would go here */}
        <p style={{padding: '20px', textAlign: 'center'}}>Mobile version in development</p>
      </div>
    </>
  );
};

export default HeroPageFull;
