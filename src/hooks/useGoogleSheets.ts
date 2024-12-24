import { useState } from 'react';
import { LocalStorageService } from '../services/localStorageService';

interface Error {
  message: string;
}

export const useGoogleSheets = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const storageService = new LocalStorageService();

  const checkPlayer = async (ipAddress: string) => {
    setLoading(true);
    setError(null);
    try {
      const hasPlayed = storageService.hasPlayerPlayed(ipAddress);
      return hasPlayed;
    } catch (error) {
      setError({ message: 'Failed to check player status. Please try again.' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const savePlayer = async (name: string, ipAddress: string, prize: number) => {
    setLoading(true);
    setError(null);
    try {
      storageService.addPlayer({
        name,
        ipAddress,
        prize,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      setError({ message: 'Failed to save player data. Please try again.' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    checkPlayer,
    savePlayer
  };
};
