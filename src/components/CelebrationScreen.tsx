import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import './CelebrationScreen.css';

interface CelebrationScreenProps {
  playerName: string;
  prize: number;
  onFinish?: () => void;
}

export const CelebrationScreen = ({ playerName, prize }: CelebrationScreenProps) => {
  const [showInteractive, setShowInteractive] = useState(false);
  const [playWin] = useSound('/sounds/win.mp3');
  const [playChime] = useSound('/sounds/chime.mp3');

  useEffect(() => {
    playWin();
    const timer = setTimeout(() => setShowInteractive(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleGiftClick = () => {
    playChime();
    const gifts = ['🎁', '🎄', '🎅', '⭐'];
    const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
    // Create floating gift animation
    const gift = document.createElement('div');
    gift.className = 'floating-gift';
    gift.textContent = randomGift;
    document.body.appendChild(gift);
    setTimeout(() => gift.remove(), 1000);
  };

  return (
    <div className="celebration-screen">
      {/* Previous confetti code remains */}
      
      <div className="prize-reveal">
        <h1 className="winner-text">
          <span className="sparkle-text">✨</span>
          Congratulations {playerName}!
          <span className="sparkle-text">✨</span>
        </h1>
        
        <div 
          className="gift-box interactive"
          onClick={handleGiftClick}
        >
          <div className="prize-amount">₱{prize}</div>
          {showInteractive && (
            <div className="tap-instruction">
              Tap for more surprises!
            </div>
          )}
        </div>
        
        <div className="christmas-message">
          <h2>🎄 Merry Christmas! 🎄</h2>
          <p>Santa's elves have prepared your special gift!</p>
          <button 
            className="share-button"
            onClick={() => {
              playChime();
              // Add share functionality
            }}
          >
            Share your gift! 🎁
          </button>
        </div>
      </div>
    </div>
  );
};
