import { useState, useRef } from 'react';
import './GiftRoulette.css';

interface GiftRouletteProps {
  onComplete: (prize: number) => void;
  generatePrize: () => number;
}

const rangePrize = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

export const GiftRoulette = ({ onComplete }: GiftRouletteProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const generateWeightedPrize = () => {
    const random = Math.random() * 100;
    
    // 5% chance for high prizes
    if (random <= 5) {
      const highPrizes = [1000, 900, 800, 600, 700];
      return highPrizes[Math.floor(Math.random() * highPrizes.length)];
    }
    
    // 95% chance for lower prizes
    const regularPrizes = [100, 200, 300, 400, 500];
    return regularPrizes[Math.floor(Math.random() * regularPrizes.length)];
  };

  const spinWheel = () => {
    setIsSpinning(true);
    const prize = generateWeightedPrize();

    const prizeIndex = rangePrize.indexOf(prize);
    const baseRotations = 5;
    const finalRotation = baseRotations * 360 + (36 * prizeIndex);

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      onComplete(prize);
    }, 5000);
  };

  return (
    <div className="roulette-container">
      <div className="gift-pointer">🎁</div>
      <div 
        ref={wheelRef}
        className={`wheel ${isSpinning ? 'spinning' : ''}`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {rangePrize.map((prize, index) => (
          <div
            key={prize}
            className="wheel-section"
            style={{
              transform: `rotate(${index * 36}deg)`,
              backgroundColor: index % 2 === 0 ? '#ff4444' : '#44bb44'
            }}
          >
            <span className="prize-text">₱{prize}</span>
          </div>
        ))}
      </div>
      <button 
        className="spin-button"
        onClick={spinWheel}
        disabled={isSpinning}
      >
        {isSpinning ? '🎄 Good luck! 🎄' : '🎁 Spin for your gift! 🎁'}
      </button>
    </div>
  );
};