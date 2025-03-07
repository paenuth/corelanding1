// src/components/Navbar.js (revised)
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Core Chain IDs
const CORE_MAINNET = 1116;
const CORE_TESTNET = 1114;

const injected = new InjectedConnector({
  supportedChainIds: [CORE_MAINNET, CORE_TESTNET]
});

export default function Navbar() {
  const { activate, deactivate, active } = useWeb3React(); // Removed unused 'account' and 'chainId'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user was logged in previously
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
      
      // If they were using wallet, reconnect it
      if (localStorage.getItem('loginMethod') === 'wallet') {
        const connectWalletOnPageLoad = async () => {
          try {
            await activate(injected);
          } catch (error) {
            console.error('Failed to connect wallet on page load:', error);
          }
        };
        connectWalletOnPageLoad();
      }
    }
  }, [activate]);

  const handlePlayNow = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  // Logout function
  const handleLogout = () => {
    if (active) {
      deactivate();
    }
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginMethod');
    localStorage.removeItem('userWallet');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <h2 onClick={() => navigate('/')} style={{cursor: 'pointer'}}>CORE</h2>
        <div>
          {isLoggedIn && (
            <button 
              onClick={() => navigate('/dashboard')} 
              className="dashboard-button"
              style={{marginRight: '1rem'}}
            >
              Go to Dashboard
            </button>
          )}
          <button
            onClick={isLoggedIn ? handleLogout : handlePlayNow}
            className="wallet-button"
          >
            {isLoggedIn ? 'Logout' : 'Play Now'}
          </button>
        </div>
      </div>
    </nav>
  );
}