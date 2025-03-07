// src/components/Dashboard.js
import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';

// Placeholder NFT data
const placeholderNFTs = [
  {
    id: 1,
    name: "Speed Master Badge",
    image: "🏃‍♂️",
    description: "This badge increases your character's speed by 15%.",
    rarity: "Uncommon"
  },
  {
    id: 2,
    name: "Shield Guardian",
    image: "🛡️",
    description: "Provides a 10% damage reduction from all sources.",
    rarity: "Rare"
  },
  {
    id: 3,
    name: "Power Striker",
    image: "⚡",
    description: "Your attacks deal 20% more damage to enemies.",
    rarity: "Epic"
  }
];

export default function Dashboard() {
  const { account, active } = useWeb3React();
  const [userWallet, setUserWallet] = useState('');
  const [loginMethod, setLoginMethod] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/login');
      return;
    }

    // Get login method and wallet info
    const method = localStorage.getItem('loginMethod');
    setLoginMethod(method);
    
    if (method === 'google') {
      setUserWallet(localStorage.getItem('userWallet') || 'Not available');
    } else if (method === 'wallet' && active) {
      setUserWallet(account);
    }
  }, [active, account, navigate]);

  const handlePlayGame = () => {
    // Replace with your actual game URL
    window.location.href = 'https://your-game-url.com';
  };

  // Truncate wallet address for display
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Player Dashboard</h1>
        <div className="wallet-info">
          <p>
            <span>Login Method:</span> {loginMethod === 'google' ? 'Google Account' : 'Wallet Connection'}
          </p>
          <p>
            <span>Wallet Address:</span> {truncateAddress(userWallet)}
          </p>
        </div>
      </div>
      
      <div className="dashboard-section">
        <h2>Your Achievements</h2>
        <div className="nft-grid">
          {placeholderNFTs.map(nft => (
            <div key={nft.id} className="nft-card">
              <div className="nft-image">{nft.image}</div>
              <div className="nft-info">
                <h3>{nft.name}</h3>
                <span className={`nft-rarity ${nft.rarity.toLowerCase()}`}>{nft.rarity}</span>
                <p>{nft.description}</p>
              </div>
            </div>
          ))}
          <div className="nft-card nft-placeholder">
            <div className="nft-image">❓</div>
            <div className="nft-info">
              <h3>Next Achievement</h3>
              <p>Complete more levels to earn new badges!</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-section">
        <h2>How to Play</h2>
        <div className="how-to-play-container">
          <div className="instruction-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Start Your Adventure</h3>
              <p>Click the "Play the Game" button to launch the game. Your progress is automatically saved to your wallet.</p>
            </div>
          </div>
          
          <div className="instruction-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Collect Badges</h3>
              <p>Complete levels and challenges to earn NFT badges that enhance your character's abilities.</p>
            </div>
          </div>
          
          <div className="instruction-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Track Progress</h3>
              <p>Return to this dashboard anytime to view your achievements and badges.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="play-game-container">
        <button className="play-game-button" onClick={handlePlayGame}>
          Play the Game
        </button>
        <p>Your progress and achievements will be saved to your connected wallet!</p>
      </div>
    </div>
  );
}