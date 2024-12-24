import { useState } from 'react'
import { useGoogleSheets } from './hooks/useGoogleSheets'
import { LoadingOverlay } from './components/LoadingOverlay'
import { ErrorMessage } from './components/ErrorMessage'
import { SparklesComponent } from './components/SparklesComponent'
import { SantaRider } from './components/SantaRider'
import { GiftRoulette } from './components/GiftRoulette'
import { PlayerForm } from './components/PlayerForm'
import './App.css'
import { useIpAddress } from './hooks/useIpAddress'
import { CelebrationScreen } from './components/CelebrationScreen'

interface Player {
  name: string;
  ipAddress: string;
  hasPlayed: boolean;
  prize?: number;
}

function App() {

  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [gameState, setGameState] = useState<'initial' | 'playing' | 'finished'>('initial');
  const { ipAddress } = useIpAddress();
  const { loading, error, checkPlayer, savePlayer } = useGoogleSheets();


  const handleStartGame = async (playerName: string) => {
    try {
      if (!ipAddress) throw new Error('Unable to detect IP address');
      
      const hasPlayed = await checkPlayer(ipAddress);
      if (hasPlayed) {
        alert('Ho ho ho! You already received your gift! Merry Christmas! 🎄');
        return;
      }

      setCurrentPlayer({
        name: playerName,
        ipAddress,
        hasPlayed: false
      });
      setGameState('playing');
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  };

  const handleRetry = () => {
    setGameState('initial');
    setCurrentPlayer(null);
  };

  const handleGameComplete = async (prize: number) => {
    if (!currentPlayer || !ipAddress) return;
    
    console.log('Game complete, prize:', currentPlayer.name, ipAddress, prize);
    
    try {
      await savePlayer(currentPlayer.name, ipAddress, prize);
      setCurrentPlayer({ ...currentPlayer, prize, hasPlayed: true });
      setGameState('finished');
    } catch (error) {
      console.error('Failed to save game result:', error);
      // User will see error message through ErrorMessage component 
      // since error state is managed by useGoogleSheets hook
    }
  };
  const generatePrize = (): number => {
    const random = Math.random() * 100;
    
    // 3% chance for 1000
    if (random <= 3) {
      return 1000;
    }
    
    // Generate random amounts divisible by 100 between 100-900
    const possibleAmounts = Array.from({length: 9}, (_, i) => (i + 1) * 100);
    const randomIndex = Math.floor(Math.random() * possibleAmounts.length);
    return possibleAmounts[randomIndex];
  };
  

  return (
    <div className="christmas-container">
      <SparklesComponent />
      <SantaRider />
      
      {loading && <LoadingOverlay />}
      
      {error ? (
        <ErrorMessage 
          message={error.message} 
          onRetry={handleRetry} 
        />
      ) : (
        <>
          {gameState === 'initial' && (
            <PlayerForm onSubmit={handleStartGame} />
          )}

          {gameState === 'playing' && (
            <GiftRoulette 
              onComplete={handleGameComplete}
              generatePrize={generatePrize}
            />
          )}

          {gameState === 'finished' && currentPlayer && (
            <CelebrationScreen 
            playerName={currentPlayer.name}
            prize={currentPlayer.prize!}
          />
          )}
        </>
      )}
    </div>
  );
}

export default App;
