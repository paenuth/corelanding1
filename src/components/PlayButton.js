// src/components/PlayButton.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlayButton() {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate('/login');
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