// src/App.js
import './App.css';
import Navbar from './components/Navbar';
import PlayButton from './components/PlayButton';

function App() {
  // Team members data with roles
  const teamMembers = [
    {
      name: 'Llyod',
      role: 'Game Artist & Front-end Developer',
      description: 'Designed front-end components and artworks, assets and animations'
    },
    {
      name: 'Jhos',
      role: 'Game Developer & UI/UX',
      description: 'Game Programmer - Handled User Interface and Experience'
    },
    {
      name: 'Hane',
      role: 'Front-end & Back-end Developer',
      description: 'Frontend design & Integration of Web3 Wallet'
    },
    {
      name: 'Adrean',
      role: 'Game Developer',
      description: 'Game Programmer - Design - Mechanics - Physics of the game'
    }
  ];

  return (
    <div className="App">
      <Navbar />
      
      <section id="hero">
        <h1>Escape The Chasm</h1>
        <p>Connect your wallet and start playing our CORE blockchain game!</p>
        <PlayButton />
      </section>
      
      <section id="how-to-play">
        <h2>How to Play</h2>
        <div className="instructions-container">
          <div className="instruction-card">
            <div className="instruction-icon">🎮</div>
            <h3>Connect</h3>
            <p>Link your Core wallet to access the game and secure your progress.</p>
          </div>
          
          <div className="instruction-card">
            <div className="instruction-icon">🏆</div>
            <h3>Play</h3>
            <p>Enjoy our hypercasual game with simple mechanics and addictive gameplay.</p>
          </div>
          
          <div className="instruction-card">
            <div className="instruction-icon">💰</div>
            <h3>Earn</h3>
            <p>Win rewards and unlock special items as you progress through levels.</p>
          </div>
        </div>
      </section>

      <section id="developers">
        <h2>Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.name} className="developer-card">
              <div className="avatar-placeholder">{member.name.charAt(0)}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section id="roadmap">
        <h2>Development Roadmap</h2>
        <div className="roadmap-container">
          <div className="phase-card">
            <h3><span>1</span>Foundation Phase</h3>
            <p>Establishing the core mechanics and infrastructure.</p>
            <ul>
              <li>Develop game prototype with basic mechanics</li>
              <li>Implement wallet connection functionality</li>
              <li>Design character and environment assets</li>
              <li>Setup smart contract development environment</li>
            </ul>
          </div>
          
          <div className="phase-card">
            <h3><span>2</span>Core Gameplay</h3>
            <p>Building and refining the main gameplay features.</p>
            <ul>
              <li>Launch beta version with key features</li>
              <li>Implement token rewards system</li>
              <li>Add progressive difficulty levels</li>
              <li>Create leaderboard functionality</li>
            </ul>
          </div>
          
          <div className="phase-card">
            <h3><span>3</span>Multiplayer Integration</h3>
            <p>Adding social and competitive features.</p>
            <ul>
              <li>Develop real-time multiplayer capabilities</li>
              <li>Implement in-game chat functionality</li>
              <li>Create tournament structure</li>
              <li>Add friend system and team battles</li>
            </ul>
          </div>
          
          <div className="phase-card">
            <h3><span>4</span>Economy Expansion</h3>
            <p>Developing a robust in-game economy.</p>
            <ul>
              <li>Launch NFT collectibles</li>
              <li>Implement marketplace for trading items</li>
              <li>Create staking mechanisms</li>
              <li>Develop governance token system</li>
            </ul>
          </div>
          
          <div className="phase-card">
            <h3><span>5</span>Metaverse Integration</h3>
            <p>Expanding beyond the game into wider applications.</p>
            <ul>
              <li>Create 3D social spaces</li>
              <li>Implement cross-game asset compatibility</li>
              <li>Develop SDK for community-created content</li>
              <li>Partner with other Core ecosystem projects</li>
            </ul>
          </div>
        </div>
      </section>
      
      <footer>
        <p>© 2025 Escape the Chasm | Built on <a href="https://www.coredao.org/">Core Chain</a></p>
      </footer>
    </div>
  );
}

export default App;