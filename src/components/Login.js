// src/components/Login.js
import { useState, useEffect } from 'react';
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
  const { activate, account, active, library } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(true);
  const navigate = useNavigate();
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  // Check if MetaMask is installed
  useEffect(() => {
    if (window.ethereum) {
      setHasMetaMask(true);
    } else {
      setHasMetaMask(false);
    }
  }, []);

  // Switch to CORE Testnet
  const switchToTestnet = async () => {
    if (!window.ethereum) return false;
    
    try {
      // Try to switch to the CORE Testnet
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x45A' }], // 0x45A is hex for 1114 (CORE_TESTNET)
      });
      return true;
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x45A',
                chainName: 'CORE Testnet',
                nativeCurrency: {
                  name: 'CORE',
                  symbol: 'CORE',
                  decimals: 18
                },
                rpcUrls: ['https://rpc.test.btcs.network/'],
                blockExplorerUrls: ['https://scan.test.btcs.network/']
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error('Error adding the network:', addError);
          return false;
        }
      }
      console.error('Failed to switch networks:', switchError);
      return false;
    }
  };

  const handleWalletLogin = async () => {
    setIsLoading(true);
    
    if (!window.ethereum) {
      alert("No wallet extension found. Please install MetaMask and try again.");
      setIsLoading(false);
      return;
    }
    
    try {
      // First switch to CORE Testnet
      const switched = await switchToTestnet();
      if (!switched) {
        alert("Failed to switch to CORE Testnet. Please try again.");
        setIsLoading(false);
        return;
      }
      
      // Then activate the wallet
      await activate(injected);
      
      // Wait briefly for the connection to establish
      setTimeout(() => {
        // Check if connection was successful
        if (active) {
          // Store the actual wallet address instead of just 'wallet'
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('loginMethod', 'wallet');
          localStorage.setItem('userWallet', account); // Store the actual address
          
          // You can also log some wallet info
          console.log("Connected to wallet:", account);
          console.log("Connected to network:", library?.network?.name);
          
          // Dispatch custom event to update Navbar
          window.dispatchEvent(new Event('loginStatusChanged'));
          
          // Navigate to dashboard after successful login
          navigate('/dashboard');
        } else {
          alert('Wallet connection failed. Please try again.');
        }
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Connection error:', error);
      alert('Failed to connect wallet. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, you would use Firebase Auth or a similar service
      // For demonstration, we'll create a pre-generated wallet for CORE blockchain
      
      // Generate a deterministic wallet address based on a user identifier
      // This is a simplified example - in production, you should use proper key derivation
      
      // Simulate API call to generate a wallet
      const response = await generateWalletForUser("google-user-id");
      
      if (response.success) {
        // Save login state and the pre-generated wallet
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loginMethod', 'google');
        localStorage.setItem('userWallet', response.walletAddress);
        
        // Dispatch custom event to update Navbar
        window.dispatchEvent(new Event('loginStatusChanged'));
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        alert("Failed to generate wallet. Please try again.");
      }
    } catch (error) {
      console.error('Google login error:', error);
      alert('Failed to login with Google. Please try again.');
    }
    
    setIsLoading(false);
  };

  // Function to simulate wallet generation
  // In production, this would be a backend API call
  const generateWalletForUser = async (userId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would be generated securely on the backend
    // and would involve actual cryptographic wallet creation
    const walletAddress = '0x' + Array(40).fill(0).map(() => 
      Math.floor(Math.random() * 16).toString(16)).join('');
    
    return {
      success: true,
      walletAddress
    };
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
        
        {!hasMetaMask && (
          <div className="wallet-warning">
            No wallet extension found. Please install MetaMask and try again.
          </div>
        )}
        
        <button 
          className="wallet-login-btn" 
          onClick={handleWalletLogin}
          disabled={isLoading}
        >
          <span>🦊</span> Connect Wallet
          {isLoading && <span className="loading-spinner"></span>}
        </button>

        {/* connection status here */}
        {active && (
          <div className="connection-status success">
            <span>✅</span> Connected to wallet: {account ? truncateAddress(account) : "Unknown"}
          </div>
        )}

        <p className="login-info">
          Login with Google to receive a pre-generated wallet address or connect your existing wallet.
        </p>
      </div>
    </div>
  );
}