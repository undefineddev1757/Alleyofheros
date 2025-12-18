"use client";

import React from 'react';
import './HeroesList.css';

const HeroesList = ({ heroes = [], currentPage = 1, totalPages = 5, onPageChange }) => {
  const defaultHeroes = [
    { id: 1, callsign: 'Позивний', name: 'Прізвище Ім\'я' },
    { id: 2, callsign: 'Позивний', name: 'Прізвище Ім\'я' },
    { id: 3, callsign: 'Позивний', name: 'Прізвище Ім\'я' },
    { id: 4, callsign: 'Позивний', name: 'Прізвище Ім\'я' },
    { id: 5, callsign: 'Позивний', name: 'Прізвище Ім\'я' },
    { id: 6, callsign: 'Позивний', name: 'Прізвище Ім\'я' },
    { id: 7, callsign: 'Позивний', name: 'Прізвище Ім\'я' },
    { id: 8, callsign: 'Позивний', name: 'Прізвище Ім\'я' },
    { id: 9, callsign: 'Позивний', name: 'Прізвище Ім\'я' },
    { id: 10, callsign: 'Позивний', name: 'Прізвище Ім\'я' }
  ];

  const heroList = heroes.length > 0 ? heroes : defaultHeroes;

  return (
    <div className="heroes-section">
      <div className="heroes-list">
        {heroList.map((hero, index) => (
          <React.Fragment key={hero.id || index}>
            <div className="hero-item">
              <div className="hero-info">
                <div className="hero-callsign2">{hero.callsign}</div>
                <div className="hero-name1">{hero.name}</div>
              </div>
              <svg className="hero-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22.8 20.4C19.8744 17.4744 19.8732 12.1428 22.8 9.21599L24 8.01599L21.6 5.61599L20.4 6.81599C18.2712 8.94479 17.208 11.8752 17.2068 14.8068L2.4 1.04907e-07L-9.50498e-09 2.4L14.8068 17.2068C11.8752 17.208 8.9448 18.2712 6.816 20.4L5.616 21.6L8.016 24L9.216 22.8C12.1428 19.8732 17.4744 19.8744 20.4 22.8L21.6 24L24 21.6L22.8 20.4Z" fill="#17120E" fillOpacity="0.25"/>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="24" height="24" fill="white" transform="translate(24 1.04907e-06) rotate(90)"/>
                  </clipPath>
                </defs>
              </svg>
              <svg className="hero-icon-hover" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip1)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M20.4 1.20002C17.4744 4.12562 12.1428 4.1268 9.21599 1.2L8.01599 1.40156e-06L5.61599 2.4L6.81599 3.6C8.94479 5.7288 11.8752 6.792 14.8068 6.79321L4.19628e-07 21.6L2.4 24L17.2068 9.19322C17.208 12.1248 18.2712 15.0552 20.4 17.184L21.6 18.384L24 15.984L22.8 14.784C19.8732 11.8572 19.8744 6.52562 22.8 3.60002L24 2.40002L21.6 1.63651e-05L20.4 1.20002Z" fill="#17120E"/>
                </g>
                <defs>
                  <clipPath id="clip1">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <svg className="hero-decoration" width="360" height="140" viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.25" fillRule="evenodd" clipRule="evenodd" d="M238.604 118.164L250.42 118.17L238.604 149.97V223.423H262.92L275.815 200.679L310.129 200.653V200.64L297.203 177.852V177.832H287.859L299.476 157.372H279.893L321.163 108.735L260.252 121.435L279.791 87.5245L339.228 87.518V65.2231L360 65.2297L351.761 87.518H357.618L324.282 177.832L331.873 177.852V200.64L343.11 200.634V223.429L320.68 223.435L307.747 246.224H285.235V269H60.663V246.224H38.3286L25.2052 223.435H47.2216L33.9012 187.736L13.7142 175.882L1.68332 125.976L5.39291 111.346L0 96.9014H9.05177L17.246 64.6268L58.4015 35.0649L58.395 42.6718L22.4293 68.2829L15.1688 96.8948L48.6572 96.8823L38.4367 69.2253H64.1947V96.8758L64.1882 96.8823H76.0282V223.429H136.507L93.262 107.548L135.542 107.529V107.517L125.321 79.8663L151.072 79.8598V107.523H162.913V129.587H165.905L165.911 1.28278L175.592 23.5968H170.389V129.587H180.762L171.691 145.743H170.389V223.429H185.025V118.151H197.036V90.4943L222.788 90.5002L212.567 118.145V118.157L234.12 118.164V22.3204H228.917L238.604 0V118.164ZM162.913 223.429H165.905V145.743H162.913V223.429ZM211.303 223.423H234.12V162.028L211.303 223.423ZM7.78133 126.008L18.8594 171.964L30.5791 178.84L9.02633 121.088L7.78133 126.008Z" fill="#F6F3E8"/>
              </svg>
            </div>
            {index < heroList.length - 1 && <div className="hero-separator"></div>}
          </React.Fragment>
        ))}
      </div>

      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <React.Fragment key={pageNum}>
              <button
                className={`pagination-item ${pageNum === currentPage ? 'active' : ''}`}
                onClick={() => onPageChange && onPageChange(pageNum)}
              >
                {pageNum}
              </button>
              {pageNum === 1 && <div className="pagination-line"></div>}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default HeroesList;
