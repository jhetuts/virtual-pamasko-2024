import { useState, useEffect } from 'react';

export const useIpAddress = () => {
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (err) {
        setError('Failed to fetch IP address');
        console.error('Error fetching IP:', err);
      }
    };

    getIpAddress();
  }, []);

  return { ipAddress, error };
};
