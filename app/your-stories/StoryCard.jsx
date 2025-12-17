"use client";

import React from 'react';
import './StoryCard.css';

const WheatIcon = ({ isActive }) => (
  <svg 
    className="story-card-icon" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M19 17C16.562 14.562 16.561 10.119 19 7.67999L20 6.67999L18 4.67999L17 5.67999C15.226 7.45399 14.34 9.89599 14.339 12.339L2 8.74231e-08L7.86805e-07 2L12.339 14.339C9.896 14.34 7.454 15.226 5.68 17L4.68 18L6.68 20L7.68 19C10.119 16.561 14.562 16.562 17 19L18 20L20 18L19 17Z" 
        fill="#17120E" 
        fillOpacity={isActive ? "1" : "0.25"}
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="20" height="20" fill="white" transform="translate(20) rotate(90)"/>
      </clipPath>
    </defs>
  </svg>
);

const StoryCard = ({ name, description }) => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div 
      className={`story-card ${isActive ? 'story-card-active' : ''}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="story-card-content">
        <h3 className="story-card-name">{name}</h3>
        <div className="story-card-divider"></div>
        <p className={`story-card-description ${isActive ? 'story-card-description-active' : ''}`}>
          {description}
        </p>
      </div>
      <WheatIcon isActive={isActive} />
    </div>
  );
};

export default StoryCard;
