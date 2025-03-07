// src/components/PlayButton.js
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';

export default function PlayButton() {
  const { account } = useWeb3React();
  const [isHovering, setIsHovering] = useState(false);

  const handlePlay = () => {
    if (!account) {
      alert('Please connect your wallet first to start playing!');
      return;
    }
    
    // Can add loading here
    console.log('Starting game for account:', account);
    window.location.href = 'https://game-url.com';
  };

  return (
    <button 
      className="play-button" 
      onClick={handlePlay}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      🎮 {isHovering ? "LET'S GO!" : "PLAY NOW"}
    </button>
  );
}