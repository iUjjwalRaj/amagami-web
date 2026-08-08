import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { characterData } from './data';
import './App.css';

function App() {
  const [activeChar, setActiveChar] = useState(characterData[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div 
      className={`app-container ${isDarkMode ? 'dark-theme' : ''}`} 
      style={{ '--active-theme': activeChar.themeColor }}
    >
      <div className="ambient-glow"></div>

      <nav className="navbar">
        <div className="logo">
          Amagami<span>Shrine</span>
        </div>
        
        <button 
          className="theme-toggle" 
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </nav>

      <main className="shrine-layout">
        <section className="selection-panel">
          <h1>Subject Registry</h1>
          <p className="subtitle">Select a profile to access classified data.</p>
          
          <div className="button-group">
            {characterData.map((char) => (
              <motion.button 
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
                key={char.id}
                onClick={() => setActiveChar(char)}
                className={`char-btn ${activeChar.id === char.id ? 'active' : ''}`}
                style={{
                  borderLeftColor: char.themeColor,
                  backgroundColor: activeChar.id === char.id ? `${char.themeColor}20` : 'var(--btn-bg)'
                }}
              >
                {char.name}
              </motion.button>
            ))}
          </div>
        </section>

        <section className="profile-panel">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeChar.id}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="profile-card glass-panel"
              style={{ borderTop: `4px solid ${activeChar.themeColor}` }}
            >
              
              <div className="card-header">
                <img 
                  src={activeChar.imageUrl} 
                  alt={activeChar.name} 
                  className="char-avatar"
                  style={{ borderColor: activeChar.themeColor }}
                />
                <div className="header-text">
                  <h2 className="char-name">{activeChar.name}</h2>
                  <h3 className="char-role" style={{ color: activeChar.themeColor }}>
                    {activeChar.role}
                  </h3>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Age</span>
                  <span className="stat-value">{activeChar.age}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Affinity / Hobby</span>
                  <span className="stat-value">{activeChar.hobby}</span>
                </div>
              </div>

              <div className="bio-section">
                <h4>Background Data</h4>
                <p>{activeChar.bio}</p>
              </div>
              
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}

export default App;