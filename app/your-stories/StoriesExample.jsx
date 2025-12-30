"use client";

import React, { useEffect, useState } from 'react';
import StoriesBlock from './StoriesBlock';

const StoriesExample = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/stories');
        if (response.ok) {
          const data = await response.json();
          // Преобразуем данные из API в формат, который ожидает StoriesBlock
          const formattedStories = data.map(story => ({
            name: story.heroName,
            description: story.heroStory
          }));
          setStories(formattedStories);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
        // Fallback к примерам при ошибке
        setStories([
    {
      name: "Олександр Коваленко",
      description: "Олександр був учителем математики, який завжди знав, як знайти вихід із будь-якої складної ситуації. На фронті він застосовував ці навички, рятуючи життя своїх побратимів."
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        padding: '60px 20px', 
        textAlign: 'center', 
        color: '#17120E' 
      }}>
        Завантаження історій...
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div style={{ 
        padding: '60px 20px', 
        textAlign: 'center', 
        color: '#17120E' 
      }}>
        Поки що немає історій. Додайте першу історію в адмін-панелі.
      </div>
    );
  }

  return <StoriesBlock stories={stories} />;
};

export default StoriesExample;
