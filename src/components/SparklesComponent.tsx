import { useState, useEffect } from 'react';
import './SparklesComponent.css';

interface Sparkle {
  id: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
    animation: string;
  };
}

export const SparklesComponent = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const colors = [
    '#FFD700', // Gold
    '#FF0000', // Christmas Red
    '#00FF00', // Christmas Green
    '#FFFFFF', // Snow White
    '#FFA500', // Orange
  ];

  const createSparkle = (): Sparkle => {
    return {
      id: Math.random(),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * (15 - 5) + 5,
      style: {
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        animation: `sparkle ${Math.random() * (3 - 1) + 1}s linear infinite`
      }
    };
  };

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 50 }, () => createSparkle());
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sparkles-container">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            ...sparkle.style,
            backgroundColor: sparkle.color,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`
          }}
        />
      ))}
    </div>
  );
};
