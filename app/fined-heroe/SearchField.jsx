import React, { useState } from 'react';
import './SearchField.css';

const SearchField = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const suggestions = [
    'Підказка 1',
    'Підказка 2',
    'Підказка 3'
  ];

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsExpanded(false), 200);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setIsExpanded(false);
  };

  return (
    <div className="search-field-container">
      <div className="search-input-wrapper">
        <svg className="search-icon-large" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_98_4249)">
            <path d="M9.43931 0C5.82175 0 2.87862 2.94313 2.87862 6.56069C2.87862 8.14497 3.44312 9.59984 4.3815 10.7349L0 15.1164L0.883625 16L5.26512 11.6185C6.40016 12.5569 7.85503 13.1214 9.43931 13.1214C13.0569 13.1214 16 10.1783 16 6.56069C16 2.94313 13.0569 0 9.43931 0ZM9.43931 11.8717C6.51081 11.8717 4.12828 9.48919 4.12828 6.56069C4.12828 3.63219 6.51081 1.24966 9.43931 1.24966C12.3678 1.24966 14.7503 3.63219 14.7503 6.56069C14.7503 9.48919 12.3678 11.8717 9.43931 11.8717Z" fill="#17120E"/>
          </g>
          <defs>
            <clipPath id="clip0_98_4249">
              <rect width="16" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Позивний/ПІБ"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      
      {isExpanded && (
        <div className="suggestions-container">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <svg className="search-icon-small" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_suggestion)">
                  <path d="M7.07948 0C4.36631 0 2.15897 2.20734 2.15897 4.92052C2.15897 6.10873 2.58234 7.19988 3.28612 8.05116L0 11.3373L0.662719 12L3.94884 8.71387C4.80012 9.41766 5.89127 9.84103 7.07948 9.84103C9.79266 9.84103 12 7.63369 12 4.92052C12 2.20734 9.79268 0 7.07948 0ZM7.07948 8.90379C4.88311 8.90379 3.09621 7.11689 3.09621 4.92052C3.09621 2.72414 4.88311 0.937242 7.07948 0.937242C9.27586 0.937242 11.0628 2.72414 11.0628 4.92052C11.0628 7.11689 9.27586 8.90379 7.07948 8.90379Z" fill="#17120E"/>
                </g>
                <defs>
                  <clipPath id="clip0_suggestion">
                    <rect width="12" height="12" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span className="suggestion-text">{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchField;
