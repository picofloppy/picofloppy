import React, { useState } from 'react';
import floppySoundFile from './assets/floppy-sound.mp3';
import spinSoundFile from './assets/spin-sound.mp3';
import './App.css';
import Support from './Support';

function playFloppySound() {
  const audio = new window.Audio(floppySoundFile);
  audio.play();
}

function App() {
  const [page, setPage] = useState('home');
  const [showDosSpoof, setShowDosSpoof] = useState(false);
  const [dosStep, setDosStep] = useState(0);

  // DOS spoof steps
  const dosSteps = [
    'A:\\> drain',
    'Detecting water in floppy drive...',
    'Warning: Water detected! Initiating cleanup...',
    'Spinning up floppy drive...',
    'Spin in progress... █▒▒▒▒▒▒▒▒▒',
    'Spin in progress... ███▒▒▒▒▒▒▒',
    'Spin in progress... █████▒▒▒▒▒',
    'Spin in progress... ███████▒▒▒',
    'Spin in progress... ██████████',
    'All clear! No water detected.',
    'Press any key to continue...'
  ];

  // Play and stop spin sound at appropriate steps
  React.useEffect(() => {
    // Always stop previous spin sound before starting a new one
    if (showDosSpoof && dosStep === 3) {
      if (window._spinAudio) {
        window._spinAudio.pause();
        window._spinAudio.currentTime = 0;
        window._spinAudio = null;
      }
      const spinAudio = new window.Audio(spinSoundFile);
      spinAudio.loop = true;
      spinAudio.play();
      window._spinAudio = spinAudio;
    }
    // Stop sound after Spin complete (step 8)
    if (showDosSpoof && dosStep === 8 && window._spinAudio) {
      window._spinAudio.pause();
      window._spinAudio.currentTime = 0;
      window._spinAudio = null;
    }
    if (showDosSpoof && dosStep < dosSteps.length - 1) {
      const timer = setTimeout(() => setDosStep(dosStep + 1), 1200);
      return () => clearTimeout(timer);
    }
  }, [showDosSpoof, dosStep]);

  // Handle key press or auto-exit after 3 seconds on 'Press any key to continue...' step
  React.useEffect(() => {
    if (showDosSpoof && dosStep === dosSteps.length - 1) {
      const handleKey = () => {
        setShowDosSpoof(false);
        setDosStep(0);
        setTimeout(() => setPage('home'), 1200);
      };
      window.addEventListener('keydown', handleKey);
      const autoTimer = setTimeout(() => {
        setShowDosSpoof(false);
        setDosStep(0);
        setTimeout(() => setPage('home'), 1200);
      }, 3000);
      return () => {
        window.removeEventListener('keydown', handleKey);
        clearTimeout(autoTimer);
      };
    }
  }, [showDosSpoof, dosStep]);

  if (page === 'support') return <Support />;
  return (
    <div className="picofloppy-main">
      {showDosSpoof && (
        <div className="dos-spoof-overlay">
          <div className="dos-spoof-content">
            <pre>{dosSteps[dosStep]}</pre>
          </div>
        </div>
      )}
      <nav className="picofloppy-nav">
        <div className="picofloppy-logo">
          <span className="logo-square red"></span>
          <span className="logo-square green"></span>
          <span className="logo-square blue"></span>
          <span className="logo-square yellow"></span>
          <span className="logo-text">picofloppy</span>
        </div>
        <ul>
          <li><a href="#products">Trollducts</a></li>
          <li><a href="#download" onClick={e => { e.preventDefault(); playFloppySound(); }}>Download FloppyOS 95</a></li>
          <li><a href="#support" onClick={e => { e.preventDefault(); setPage('support'); }}>Support</a></li>
          <li><a href="#chkdsk" onClick={e => { e.preventDefault(); setShowDosSpoof(true); setDosStep(0); }}>CHKDSK</a></li>
        </ul>
      </nav>
      <header className="picofloppy-hero">
        <h1>Welcome to Picofloppy.com</h1>
        <img src="/floppy.png" alt="Floppy Disk" style={{width: '120px'}} />
        <p>
          The only site where floppy disks are still cool.<br />
          Try FloppyOS 95, now with 100% more floppiness!
        </p>
        <div className="picofloppy-meme">
          <span>"Smaller than micro, not just soft but floppy"</span><br />
          <span>"It will never stay up"</span>
        </div>
        <button className="hero-btn" onClick={playFloppySound}>
          Download Now (Warning: May Actually Be a Meme)
        </button>
      </header>
      <section id="products" className="picofloppy-products">
        <h2>Our Trollducts</h2>
        <div className="product-list">
          <div className="product-card">
            <h3>FloppyOS 95</h3>
            <p>The operating system that crashes before it boots. Now with Clippy 2.0 (he roasts you).</p>
          </div>
          <div className="product-card">
            <h3>FloppyCloud</h3>
            <p>Store up to 1.44MB in the cloud. Yes, that's megabytes. Good luck.</p>
          </div>
          <div className="product-card">
            <h3>FloppyGPT</h3>
            <p>AI that only answers in floppy disk noises. Useful? Not really.</p>
          </div>
        </div>
      </section>
      <section className="picofloppy-retro-gallery">
        <h2>Retro Gallery</h2>
        <div className="gallery-list">
          <div className="gallery-card">
            <img src="/floppy.png" alt="3.5 inch floppy" />
            <p>"When 1.44MB was all you needed. Unless you needed 1.45MB."</p>
          </div>
          <div className="gallery-card">
            <img src="/floppy.png" alt="5.25 inch floppy" />
            <p>"The original 'save' icon. Kids today will never know."</p>
          </div>
          <div className="gallery-card">
            <img src="/floppy.png" alt="8 inch floppy" />
            <p>"When your storage was bigger than your computer."</p>
          </div>
        </div>
      </section>
      <footer className="picofloppy-footer">
        <p>© 2025 Picofloppy.<br /> Not affiliated with Microsoft or Macrohard, we are not not big or hard enough. <br />
        All rights reserved to the Floppyverse.<br />
        If you read this, you probably need a hobby.<br />
        Powered by 100% recycled memes.</p>
      </footer>
    </div>
  );
}

export default App;
