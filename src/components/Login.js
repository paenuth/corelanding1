// src/components/Login.js
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useNavigate } from 'react-router-dom';

// Core Chain IDs
const CORE_MAINNET = 1116;
const CORE_TESTNET = 1114;

const injected = new InjectedConnector({
  supportedChainIds: [CORE_MAINNET, CORE_TESTNET]
});

export default function Login() {
  const { activate } = useWeb3React(); // Removed unused 'account'
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleWalletLogin = async () => {
    setIsLoading(true);
    try {
      await activate(injected);
      // Once connected, save login state
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loginMethod', 'wallet');
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Connection error:', error);
      alert('Failed to connect wallet. Please try again.');
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google login (in a real app, you'd use Firebase Auth or similar)
    setTimeout(() => {
      // Generate a random wallet address for demo purposes
      const randomWallet = '0x' + Array(40).fill(0).map(() => 
        Math.floor(Math.random() * 16).toString(16)).join('');
      
      // Save login state and generated wallet
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loginMethod', 'google');
      localStorage.setItem('userWallet', randomWallet);
      
      // Navigate to dashboard
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Play</h2>
        <p>Choose your preferred login method</p>
        
        <button 
          className="google-login-btn" 
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <span>🌐</span> Login with Google
          {isLoading && <span className="loading-spinner"></span>}
        </button>
        
        <div className="separator">
          <span>OR</span>
        </div>
        
        <button 
          className="wallet-login-btn" 
          onClick={handleWalletLogin}
          disabled={isLoading}
        >
          <span>🦊</span> Connect Wallet
          {isLoading && <span className="loading-spinner"></span>}
        </button>
        
        <p className="login-info">
          Login with Google to receive a pre-generated wallet address or connect your existing wallet.
        </p>
      </div>
    </div>
  );
}