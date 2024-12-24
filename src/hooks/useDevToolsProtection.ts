import { useEffect } from 'react';

export const useDevToolsProtection = () => {
  useEffect(() => {
    // Detect devtools opening
    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      
      if (widthThreshold || heightThreshold) {
        document.body.innerHTML = '🎄 Nice try! Merry Christmas! 🎄';
      }
    };

    // Prevent right-click
    const preventInspect = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Prevent keyboard shortcuts
    const preventShortcuts = (e: KeyboardEvent) => {
      if (
        // Chrome, Firefox, Edge
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U') ||
        e.key === 'F12' ||
        // Mac specific
        (e.metaKey && e.altKey && e.key === 'I') ||
        (e.metaKey && e.altKey && e.key === 'J') ||
        (e.metaKey && e.altKey && e.key === 'C') ||
        // Additional shortcuts
        (e.ctrlKey && e.key === 'S') ||
        (e.ctrlKey && e.key === 'P') ||
        (e.altKey && e.key === 'PrintScreen')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Add capture phase event listeners for better prevention
    window.addEventListener('resize', detectDevTools, true);
    document.addEventListener('contextmenu', preventInspect, true);
    document.addEventListener('keydown', preventShortcuts, true);

    return () => {
      window.removeEventListener('resize', detectDevTools, true);
      document.removeEventListener('contextmenu', preventInspect, true);
      document.removeEventListener('keydown', preventShortcuts, true);
    };
  }, []);
};
