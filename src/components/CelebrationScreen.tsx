import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import useSound from "use-sound";
import "./CelebrationScreen.css";

interface CelebrationScreenProps {
  playerName: string;
  prize: number;
  onFinish?: () => void;
}

export const CelebrationScreen = ({
  playerName,
  prize,
}: CelebrationScreenProps) => {
const searchParams = new URLSearchParams(window.location.search);
  const ninang = searchParams.get('ninang');
  const ninong = searchParams.get('ninong');
  
  const hostName = ninang || ninong || 'Jayar';
  const hostTitle = ninang ? 'Ninang' : 'Ninong';

  const celebrationRef = useRef<HTMLDivElement>(null);
  const [playWin] = useSound("/sounds/win.mp3");
  const [playChime] = useSound("/sounds/chime.mp3");

  useEffect(() => {
    playWin();
  }, []);

  const addWatermarkPattern = (element: HTMLElement) => {
    const watermarkContainer = document.createElement('div');
    watermarkContainer.className = 'watermark-pattern';
    
    // Create multiple watermark layers with different rotations and positions
    for (let i = 0; i < 7; i++) {
      const watermark = document.createElement('div');
      watermark.className = `watermark-text layer-${i}`;
      watermark.textContent = `PAMASKO-2024-${Date.now()}-${hostTitle}-${hostName}`;
      watermarkContainer.appendChild(watermark);
    }
    
    element.appendChild(watermarkContainer);
  };

  const captureAndShare = async () => {
    if (!celebrationRef.current) return;

    const prizeElement = celebrationRef.current.querySelector('.prize-amount');
    if (prizeElement) {
      addWatermarkPattern(prizeElement as HTMLElement);
    }
  

    playChime();

    try {
      const canvas = await html2canvas(celebrationRef.current);
      const imageBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), "image/png");
      });

      const watermarkPattern = celebrationRef.current.querySelector('.watermark-pattern');
      watermarkPattern?.remove();

      const shareData = {
        title: "Virtual Pamasko 2024",
        text: `🎄 I just won ₱${prize} from Virtual Pamasko 2024! 🎁\nMerry Christmas! ✨`,
        files: [
          new File([imageBlob], "virtual-pamasko-win.png", {
            type: "image/png",
          }),
        ],
      };

      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: Download image
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "virtual-pamasko-win.png";
        link.click();
      }
    } catch (error) {
      console.log("Sharing failed", error);
    }
  };



  const getNinongMessage = (prize: number) => {
    if (prize <= 300) {
      return `Bawi nalang next year! 😅\n- ${hostTitle} ${hostName}`;
    }
    if (prize <= 500) {
      return `Pwede na! Merry Christmas! 😊\n- ${hostTitle} ${hostName}`;
    }
    return `I'm gonna go broke but worth it! 🥲\nEnjoy your gift!\n- ${hostTitle} ${hostName}`;
  };

  return (
    <div className="celebration-screen">
      <div className="screenshot-area" ref={celebrationRef}>
        <div className="prize-reveal">
          <h1 className="winner-text">
            <span className="sparkle-text">✨</span>
            Congratulations {playerName}!
            <span className="sparkle-text">✨</span>
          </h1>
          <div className="prize-message">{getNinongMessage(prize)}</div>

          <div className="gift-box interactive">
            <div className="prize-amount">₱{prize}</div>
          </div>

          <div className="christmas-message">
            <h2>🎄 Merry Christmas! 🎄</h2>
            <button className="share-button" onClick={captureAndShare}>
              Share your gift! 🎁
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
