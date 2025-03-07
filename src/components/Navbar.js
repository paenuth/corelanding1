// src/components/Navbar.js
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useEffect } from 'react';

// Core Chain IDs
const CORE_MAINNET = 1116;
const CORE_TESTNET = 1114;

const injected = new InjectedConnector({
  supportedChainIds: [CORE_MAINNET, CORE_TESTNET]
});

export default function Navbar() {
  const { activate, deactivate, active, account, chainId } = useWeb3React();

  // Check if wallet was connected previously
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected);
        } catch (error) {
          console.error('Failed to connect on page load:', error);
          localStorage.removeItem('isWalletConnected');
        }
      }
    };
    connectWalletOnPageLoad();
  }, [activate]);

  // Connect wallet function
  const connectWallet = async () => {
    try {
      await activate(injected);
      localStorage.setItem('isWalletConnected', 'true');
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    try {
      deactivate();
      localStorage.removeItem('isWalletConnected');
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  // Check if connected to Core Chain
  const isConnectedToCore = 
    active && (chainId === CORE_MAINNET || chainId === CORE_TESTNET);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <h2>CORE</h2>
        <button
          onClick={active ? disconnectWallet : connectWallet}
          className="wallet-button"
        >
          {active 
            ? isConnectedToCore
              ? `${account.substring(0,6)}...${account.substring(account.length-4)}`
              : 'Switch to Core Chain'
            : 'Connect Wallet'}
        </button>
      </div>
    </nav>
  );
}