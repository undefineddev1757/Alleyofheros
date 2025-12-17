"use client";

import React from 'react';
import StoryCard from './StoryCard';
import './StoriesBlock.css';

const StoriesBlock = ({ stories }) => {
  // Разделяем истории на 3 колонки
  const column1 = stories.filter((_, index) => index % 3 === 0);
  const column2 = stories.filter((_, index) => index % 3 === 1);
  const column3 = stories.filter((_, index) => index % 3 === 2);

  // Дублируем контент для бесконечной прокрутки
  const duplicatedColumn1 = [...column1, ...column1, ...column1];
  const duplicatedColumn2 = [...column2, ...column2, ...column2];
  const duplicatedColumn3 = [...column3, ...column3, ...column3];

  return (
    <div className="stories-block-container">
      <div className="stories-block-grid">
        {/* Колонка 1 - движение вверх */}
        <div className="stories-column stories-column-up">
          {duplicatedColumn1.map((story, index) => (
            <StoryCard 
              key={`col1-${index}`}
              name={story.name}
              description={story.description}
            />
          ))}
        </div>

        {/* Колонка 2 - движение вниз */}
        <div className="stories-column stories-column-down">
          {duplicatedColumn2.map((story, index) => (
            <StoryCard 
              key={`col2-${index}`}
              name={story.name}
              description={story.description}
            />
          ))}
        </div>

        {/* Колонка 3 - движение вверх */}
        <div className="stories-column stories-column-up">
          {duplicatedColumn3.map((story, index) => (
            <StoryCard 
              key={`col3-${index}`}
              name={story.name}
              description={story.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoriesBlock;
