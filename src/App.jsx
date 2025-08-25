import React, { useState } from 'react';
import floppySoundFile from './assets/floppy-sound.mp3';
import './App.css';
import Support from './Support';

function playFloppySound() {
  const audio = new window.Audio(floppySoundFile);
  audio.play();
}

function App() {
  const [page, setPage] = useState('home');
  if (page === 'support') return <Support />;
  return (
    <div className="picofloppy-main">
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
          <li><a href="#about">Why?</a></li>
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
