import React from 'react';
import './HeroSlider.css';

const HeroSlider = () => {
  const heroes = [
    { id: 1, image: 'https://api.builder.io/api/v1/image/assets/TEMP/a27c7adabb939ff75ba4656c129dbc4c6a241fa0?width=640' },
    { id: 2, image: 'https://api.builder.io/api/v1/image/assets/TEMP/0a167cb2ef9c411fe2ea6a78ba273852cbe22e7c?width=640' },
    { id: 3, image: 'https://api.builder.io/api/v1/image/assets/TEMP/0a167cb2ef9c411fe2ea6a78ba273852cbe22e7c?width=640' },
    { id: 4, image: 'https://api.builder.io/api/v1/image/assets/TEMP/0a167cb2ef9c411fe2ea6a78ba273852cbe22e7c?width=640' },
    { id: 5, image: 'https://api.builder.io/api/v1/image/assets/TEMP/0a167cb2ef9c411fe2ea6a78ba273852cbe22e7c?width=640' },
    { id: 6, image: 'https://api.builder.io/api/v1/image/assets/TEMP/257f7f48714fe82dde55e32135034ba2192482dd?width=640', hasIcon: false }
  ];

  return (
    <div className="hero-slider-section">
      <h2 className="hero-slider-title">
        <span className="bracket-accent">{'{'}</span>
        {' Герої Алеї '}
        <span className="bracket-accent">{'}'}</span>
      </h2>

      <div className="hero-cards-container">
        {heroes.map((hero) => (
          <div key={hero.id} className="hero-card">
            <div className="hero-photo-wrapper">
              <img 
                src={hero.image} 
                alt="Герой" 
                className="hero-photo"
              />
            </div>
            {hero.hasIcon !== false && (
              <svg className="hero-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_168_713)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.3 11.9C11.5934 10.1934 11.5927 7.0833 13.3 5.37599L14 4.67599L12.6 3.27599L11.9 3.97599C10.6582 5.21779 10.038 6.92719 10.0373 8.6373L1.4 6.11959e-08L7.89182e-07 1.4L8.63729 10.0373C6.9272 10.038 5.2178 10.6582 3.976 11.9L3.276 12.6L4.676 14L5.376 13.3C7.08329 11.5927 10.1934 11.5934 11.9 13.3L12.6 14L14 12.6L13.3 11.9Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_168_713">
                    <rect width="14" height="14" fill="white" transform="translate(14) rotate(90)"/>
                  </clipPath>
                </defs>
              </svg>
            )}
          </div>
        ))}
      </div>

      <button className="view-all-heroes-btn">
        <span className="btn-text">Перейти до всіх героїв</span>
        <svg className="btn-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_168_713_btn)">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.3 11.9C11.5934 10.1934 11.5927 7.0833 13.3 5.37599L14 4.67599L12.6 3.27599L11.9 3.97599C10.6582 5.21779 10.038 6.92719 10.0373 8.6373L1.4 6.11959e-08L7.89182e-07 1.4L8.63729 10.0373C6.9272 10.038 5.2178 10.6582 3.976 11.9L3.276 12.6L4.676 14L5.376 13.3C7.08329 11.5927 10.1934 11.5934 11.9 13.3L12.6 14L14 12.6L13.3 11.9Z" fill="#17120E"/>
          </g>
          <defs>
            <clipPath id="clip0_168_713_btn">
              <rect width="14" height="14" fill="white" transform="translate(14) rotate(90)"/>
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default HeroSlider;
