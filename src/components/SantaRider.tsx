import { useEffect, useState } from 'react';
import './SantaRider.css';

export const SantaRider = () => {
  const [position, setPosition] = useState(-200);

  useEffect(() => {
    const animate = () => {
      const moveRider = () => {
        setPosition(prev => {
          if (prev > window.innerWidth) {
            return -200;
          }
          return prev + 3;
        });
      };

      const animation = setInterval(moveRider, 30);
      return () => clearInterval(animation);
    };

    const rider = animate();
    return () => rider();
  }, []);

  return (
    <div 
      className="santa-rider"
      style={{ 
        transform: `translateX(${position}px)`,
      }}
    >
      <div className="sleigh">
        <div className="reindeers">
          <span>🦌</span>
          <span>🦌</span>
          <span>🦌</span>
        </div>
        <div className="santa">🎅</div>
      </div>
      <div className="magic-trail" />
    </div>
  );
};
