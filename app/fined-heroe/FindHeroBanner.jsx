'use client';

import React, { useState, useEffect, useRef } from 'react';
import './FindHeroBanner.css';

const FindHeroBanner = ({ title = 'Знайти героя', searchPlaceholder = 'Позивний/ПІБ', medalImageUrl = 'https://api.builder.io/api/v1/image/assets/TEMP/12daba71a01ffc2fafdfaa3af92bdeb993584487?width=560' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const response = await fetch(`/api/heroes?search=${searchQuery}&limit=5`);
        
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.heroes || []);
          setShowSuggestions((data.heroes && data.heroes.length > 0));
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (hero) => {
    setSearchQuery(`${hero.callSign} - ${hero.name}`);
    setShowSuggestions(false);
    // Можно добавить навигацию к профилю героя
  };

  return (
    <div className="find-hero-banner">
      <div className="background-names-container">
        <div className="background-names">
         
        </div>
      </div>

      <div className="content-wrapper">
        <div className="medal-section">
          <div className="brace-left">{'{'}</div>
          <img 
            className="medal-image1" 
            src={medalImageUrl} 
            alt="Medal of Honor" 
          />
          <div className="brace-right">{'}'}</div>
        </div>

        <h1 className="title">{title}</h1>

        <div className="search-container" ref={searchRef}>
          <div className="search-field">
            <svg 
              className="search-icon" 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_93_4239)">
                <path 
                  d="M9.43931 0C5.82175 0 2.87862 2.94313 2.87862 6.56069C2.87862 8.14497 3.44312 9.59984 4.3815 10.7349L0 15.1164L0.883625 16L5.26512 11.6185C6.40016 12.5569 7.85503 13.1214 9.43931 13.1214C13.0569 13.1214 16 10.1783 16 6.56069C16 2.94313 13.0569 0 9.43931 0ZM9.43931 11.8717C6.51081 11.8717 4.12828 9.48919 4.12828 6.56069C4.12828 3.63219 6.51081 1.24966 9.43931 1.24966C12.3678 1.24966 14.7503 3.63219 14.7503 6.56069C14.7503 9.48919 12.3678 11.8717 9.43931 11.8717Z" 
                  fill="#17120E"
                />
              </g>
              <defs>
                <clipPath id="clip0_93_4239">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <input 
              type="text" 
              className="search-input" 
              placeholder={searchPlaceholder} 
              aria-label="Search hero by call sign or name"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => searchQuery.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
            />
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((hero) => (
                <div 
                  key={hero.id} 
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(hero)}
                >
                  <svg 
                    className="suggestion-icon" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_93_4239)">
                      <path 
                        d="M9.43931 0C5.82175 0 2.87862 2.94313 2.87862 6.56069C2.87862 8.14497 3.44312 9.59984 4.3815 10.7349L0 15.1164L0.883625 16L5.26512 11.6185C6.40016 12.5569 7.85503 13.1214 9.43931 13.1214C13.0569 13.1214 16 10.1783 16 6.56069C16 2.94313 13.0569 0 9.43931 0ZM9.43931 11.8717C6.51081 11.8717 4.12828 9.48919 4.12828 6.56069C4.12828 3.63219 6.51081 1.24966 9.43931 1.24966C12.3678 1.24966 14.7503 3.63219 14.7503 6.56069C14.7503 9.48919 12.3678 11.8717 9.43931 11.8717Z" 
                        fill="#17120E"
                        opacity="0.5"
                      />
                    </g>
                  </svg>
                  <div className="suggestion-text">
                    <span className="suggestion-callsign">{hero.callSign}</span>
                    <span className="suggestion-name"> - {hero.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindHeroBanner;
