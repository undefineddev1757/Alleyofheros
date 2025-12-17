"use client";

import React from 'react';
import './YourStoriesBanner.css';

const YourStoriesBanner = () => {
  const backgroundNames = [
    'мадяр', 'жрець', 'малиш', 'Грінка', 'мадяр', 'жрець', 'григорович', 'малиш', 'жрець', 'малиш', 'жрець', 'малиш', 'Грінка', 'Грінка',
    'фенікс', 'бтр', 'таксист', 'григорович', 'атлет', 'фенікс', 'бтр', 'таксист', 'атлет', 'Грінка', 'григорович', 'мадяр', 'жрець', 'малиш',
    'карая', 'хват', 'жрець', 'сєвєр', 'сідней', 'да вінчі', 'карая', 'хват', 'сєвєр', 'сідней', 'да вінчі', 'бтр', 'таксист', 'григорович', 'атлет',
    'мадяр', 'жрець', 'малиш', 'Грінка', 'мадяр', 'жрець', 'григорович', 'малиш', 'жрець', 'малиш', 'жрець', 'малиш', 'Грінка', 'Грінка',
    'фенікс', 'бтр', 'таксист', 'григорович', 'атлет', 'фенікс', 'бтр', 'таксист', 'атлет', 'Грінка', 'григорович', 'мадяр', 'жрець', 'малиш',
    'карая', 'хват', 'жрець', 'сєвєр', 'сідней', 'да вінчі', 'карая', 'хват', 'сєвєр', 'сідней', 'да вінчі', 'бтр', 'таксист', 'григорович', 'атлет'
  ];

  const renderBackgroundText = () => {
    const rows = [];
    const namesPerRow = 14;
    const totalRows = 14;
    
    for (let i = 0; i < totalRows; i++) {
      const rowNames = [];
      for (let j = 0; j < namesPerRow; j++) {
        const index = (i * namesPerRow + j) % backgroundNames.length;
        rowNames.push(
          <div key={`${i}-${j}`} className="background-name">
            {backgroundNames[index]}
          </div>
        );
      }
      rows.push(
        <div key={i} className="background-row">
          {rowNames}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="banner-container">
      <div className="background-mask background-mask-left">
      
      </div>

      <div className="background-mask background-mask-right">
       
      </div>

      <div className="banner-content">
        <div className="content-wrapper">
        <svg class="quote-icon1" width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_104_4577)"><path d="M13.2 5.92928H11.9363C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293H13.2V24H0V13.2707C-7.89888e-07 4.23544 4.4936 2.40508e-05 11.234 0H13.2V5.92928ZM32 5.92928H30.7363C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293H32V24H18.8V13.2707C18.8 4.23544 23.2936 2.40508e-05 30.034 0H32V5.92928Z" fill="#F2B202"></path></g><defs><clipPath id="clip0_104_4577"><rect width="32" height="24" fill="white"></rect></clipPath></defs></svg>

          <div className="text-content">
            <h1 className="banner-title">ВАШ ІСТОРІЇ</h1>
            <p className="banner-subtitle">
              Ми створюємо місце, де на стінах з'являються портрети загиблих військових.
            </p>
          </div>

       
        </div>

        <div className="search-field">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_168_3453)">
              <path d="M9.43931 0C5.82175 0 2.87862 2.94313 2.87862 6.56069C2.87862 8.14497 3.44312 9.59984 4.3815 10.7349L0 15.1164L0.883625 16L5.26512 11.6185C6.40016 12.5569 7.85503 13.1214 9.43931 13.1214C13.0569 13.1214 16 10.1783 16 6.56069C16 2.94313 13.0569 0 9.43931 0ZM9.43931 11.8717C6.51081 11.8717 4.12828 9.48919 4.12828 6.56069C4.12828 3.63219 6.51081 1.24966 9.43931 1.24966C12.3678 1.24966 14.7503 3.63219 14.7503 6.56069C14.7503 9.48919 12.3678 11.8717 9.43931 11.8717Z" fill="#17120E"/>
            </g>
            <defs>
              <clipPath id="clip0_168_3453">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Позивний/ПІБ"
            aria-label="Пошук за позивним або ПІБ"
          />
        </div>
        <svg class="quote-icon1" width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_104_4577)"><path d="M13.2 5.92928H11.9363C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293H13.2V24H0V13.2707C-7.89888e-07 4.23544 4.4936 2.40508e-05 11.234 0H13.2V5.92928ZM32 5.92928H30.7363C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293H32V24H18.8V13.2707C18.8 4.23544 23.2936 2.40508e-05 30.034 0H32V5.92928Z" fill="#F2B202"></path></g><defs><clipPath id="clip0_104_4577"><rect width="32" height="24" fill="white"></rect></clipPath></defs></svg>
      </div>
    </div>
  );
};

export default YourStoriesBanner;
