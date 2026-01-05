import React, { useState, useEffect, useRef } from 'react';
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
  const [showWin95, setShowWin95] = useState(false); // Controls Floppy Bird emulator overlay
  const [showBSOD, setShowBSOD] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const screenContainerRef = useRef(null); // Container for v86 emulator canvas
  const emulatorRef = useRef(null); // v86 emulator instance
  const [emulatorStatus, setEmulatorStatus] = useState(''); // Loading status message

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

  // Load v86 library and initialize Floppy Bird emulator when overlay is shown
  useEffect(() => {
    if (showWin95 && !window.V86) {
      setEmulatorStatus('Loading v86 emulator...');
      const script = document.createElement('script');
      script.src = '/v86/build/libv86.js';
      script.async = true;
      script.onload = () => {
        setEmulatorStatus('v86 loaded, initializing...');
        if (screenContainerRef.current && !emulatorRef.current && window.V86) {
          try {
            setEmulatorStatus('Creating V86 instance...');
            
            // Create v86 emulator instance with Floppy Bird disk image
            emulatorRef.current = new window.V86({
              wasm_path: "/v86/build/v86.wasm",
              memory_size: 16 * 1024 * 1024, // 16MB RAM
              vga_memory_size: 8 * 1024 * 1024, // 8MB VGA memory for graphics
              screen_container: screenContainerRef.current,
              bios: {
                url: "/v86/bios/seabios.bin",
              },
              vga_bios: {
                url: "/v86/bios/vgabios.bin",
              },
              fda: {
                url: "/v86/images/floppybird.img", // Bootable floppy disk image
                async: false,
              },
              boot_order: 0x1, // Boot from floppy only (1 = floppy, 2 = hdd, 3 = cdrom)
              autostart: true,
              disable_keyboard: false,
              disable_mouse: false,
            });

            setEmulatorStatus('Booting Floppy Bird from floppy disk...');

            // Hide status message after 2 seconds so we can see the game
            setTimeout(() => {
              setEmulatorStatus('');
            }, 2000);

            // Debug: Check for canvas and focus it for keyboard input
            setTimeout(() => {
              const canvas = screenContainerRef.current?.querySelector("canvas");
              if (canvas) {
                console.log('Canvas found:', canvas);
                console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
                console.log('Canvas display:', window.getComputedStyle(canvas).display);
                // Give canvas focus so it can receive keyboard input
                canvas.focus();
                canvas.click();
              } else {
                setEmulatorStatus('ERROR: Canvas not created');
              }
            }, 1000);

            // Periodically check if canvas is ready and auto-hide status
            const checkCanvas = setInterval(() => {
              const canvas = screenContainerRef.current?.querySelector("canvas");
              if (canvas && canvas.width > 0) {
                setEmulatorStatus('');
                canvas.focus();
                clearInterval(checkCanvas);
              }
            }, 500);

            emulatorRef.current.add_listener("emulator-started", () => {
              console.log('Floppy Bird emulator started!');
            });
          } catch(e) {
            setEmulatorStatus('ERROR: ' + e.message);
          }
        }
      };
      script.onerror = () => {
        setEmulatorStatus('ERROR: Failed to load v86.js');
      };
      document.head.appendChild(script);
    } else if (showWin95 && window.V86 && screenContainerRef.current && !emulatorRef.current) {
      // v86 already loaded, just create the emulator instance
      setEmulatorStatus('v86 already loaded, initializing...');
      try {
        emulatorRef.current = new window.V86({
          wasm_path: "/v86/build/v86.wasm",
          memory_size: 16 * 1024 * 1024,
          vga_memory_size: 8 * 1024 * 1024,
          screen_container: screenContainerRef.current,
          bios: {
            url: "/v86/bios/seabios.bin",
          },
          vga_bios: {
            url: "/v86/bios/vgabios.bin",
          },
          fda: {
            url: "/v86/images/floppybird.img",
            async: false,
          },
          boot_order: 0x1,
          autostart: true,
          disable_keyboard: false,
          disable_mouse: false,
        });

        setEmulatorStatus('Booting Floppy Bird from floppy disk...');

        // Hide status message after 3 seconds so we can see the game
        setTimeout(() => {
          setEmulatorStatus('');
        }, 3000);

        emulatorRef.current.add_listener("emulator-started", () => {
          console.log('Floppy Bird emulator started!');
        });
      } catch(e) {
        setEmulatorStatus('ERROR: ' + e.message);
      }
    }
  }, [showWin95]);

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

  // Handle ESC key to exit Floppy Bird emulator
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showWin95) {
        setShowWin95(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [showWin95]);

  if (page === 'support') return <Support />;
  return (
    <div className="picofloppy-main">
      {/* Floppy Bird Emulator Fullscreen Overlay */}
      {showWin95 && (
        <div className="win95-overlay">
          <div className="win95-header">
            <div className="win95-title">
              <strong>🐦 Floppy Bird</strong> - A bootable x86 Flappy Bird clone running in v86 emulator | Press any key to flap | Press ESC to exit
            </div>
            <button 
              className="win95-close" 
              onClick={() => setShowWin95(false)} 
              title="Press ESC or click to exit"
            >
              ✕ Exit
            </button>
          </div>
          {emulatorStatus && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '20px',
              fontFamily: 'monospace',
              background: 'rgba(0,0,0,0.7)',
              padding: '20px',
              borderRadius: '8px',
              zIndex: 10003
            }}>
              {emulatorStatus}
            </div>
          )}
          <div ref={screenContainerRef} className="win95-iframe">
            <div style={{whiteSpace: 'pre', font: '14px monospace', lineHeight: '14px'}}></div>
            <canvas></canvas>
          </div>
        </div>
      )}
      {/* Blue Screen of Death Easter Egg */}
      {showBSOD && (
        <div className="bsod-overlay" onClick={() => setShowBSOD(false)}>
          <div className="bsod-content">
            <pre>{`Windows
A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +
00010E36. The current application will be terminated.

* Press any key to terminate the current application.
* Press CTRL+ALT+DEL again to restart your computer. You will
  lose any unsaved information in all applications.

                    Press any key to continue _`}</pre>
          </div>
        </div>
      )}
      {showDosSpoof && (
        <div className="dos-spoof-overlay">
          <div className="dos-spoof-content">
            <pre>{dosSteps[dosStep]}</pre>
          </div>
        </div>
      )}
      {/* Cookie Consent Parody */}
      {showCookieBanner && (
        <div className="cookie-banner">
          <p>
            🍪 This website uses floppy disks to store your preferences. 
            By continuing, you agree to let us fill your A:\ drive with absolutely nothing useful.
          </p>
          <button onClick={() => setShowCookieBanner(false)}>Accept (Like You Have a Choice)</button>
          <button onClick={() => setShowCookieBanner(false)}>Decline (Just Kidding, This Does Nothing)</button>
        </div>
      )}
      <nav className="picofloppy-nav">
        <div className="picofloppy-logo">
          <span className="logo-floppy red"></span>
          <span className="logo-floppy green"></span>
          <span className="logo-floppy blue"></span>
          <span className="logo-floppy yellow"></span>
          <span className="logo-text">picofloppy</span>
        </div>
        <ul>
          <li><a href="#products">Trollducts</a></li>
          <li><a href="#floppybird" onClick={e => { e.preventDefault(); setShowWin95(true); }}>Run Floppy Bird</a></li>
          <li><a href="#support" onClick={e => { e.preventDefault(); setPage('support'); }}>Support</a></li>
          <li><a href="#chkdsk" onClick={e => { e.preventDefault(); setShowDosSpoof(true); setDosStep(0); }}>CHKDSK</a></li>
          <li><a href="#bsod" onClick={e => { e.preventDefault(); setShowBSOD(true); }}>BSOD</a></li>
        </ul>
      </nav>
      <header className="picofloppy-hero">
        <h1>Welcome to picofloppy.com</h1>
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
          <div className="product-card">
            <h3>Internet Flopplorer 4.0</h3>
            <p>Browse the web at 56k speeds! Takes 20 minutes to load Google. Comes with bonzi buddy.</p>
          </div>
          <div className="product-card">
            <h3>FloppyDefender</h3>
            <p>Antivirus that only detects viruses from 1995. Perfect for modern threats!</p>
          </div>
          <div className="product-card">
            <h3>Floppy Media Player</h3>
            <p>Play your entire MP3 collection! (Max 1 song per floppy disk)</p>
          </div>
        </div>
      </section>
      <section className="picofloppy-requirements">
        <h2>System Requirements</h2>
        <div className="requirements-box">
          <h3>Minimum Requirements:</h3>
          <ul>
            <li>Intel 486DX processor or equivalent potato</li>
            <li>8 MB of RAM (16 MB recommended for multitasking, like running Notepad AND Calculator)</li>
            <li>50 MB of hard disk space (we're generous)</li>
            <li>VGA graphics card (256 colors! Living the dream!)</li>
            <li>3.5" floppy disk drive (obviously)</li>
            <li>Sound Blaster 16 or compatible (for those sweet MIDI sounds)</li>
            <li>MS-DOS 6.22 or higher</li>
            <li>A sense of humor (non-negotiable)</li>
          </ul>
        </div>
      </section>
      <section className="picofloppy-testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-list">
          <div className="testimonial-card">
            <p>"I tried to install FloppyOS 95 and it asked for disk 47 of 200. I only have 3 floppy disks."</p>
            <span>— Steve, IT Support</span>
          </div>
          <div className="testimonial-card">
            <p>"FloppyCloud deleted all my files and replaced them with low-res clipart. 10/10 would use again."</p>
            <span>— Karen, Accountant</span>
          </div>
          <div className="testimonial-card">
            <p>"I asked FloppyGPT for help with my code. It made floppy noises for 3 hours. More useful than Stack Overflow."</p>
            <span>— Dev, Software Engineer</span>
          </div>
          <div className="testimonial-card">
            <p>"My computer now only boots if I insert a floppy disk. Send help. Or more floppy disks."</p>
            <span>— Anonymous</span>
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
          <div className="gallery-card">
            <img src="/floppy.png" alt="floppy disk collection" />
            <p>"My entire game collection: Doom (12 disks), Windows 95 (13 disks), and that one demo from PC Gamer."</p>
          </div>
          <div className="gallery-card">
            <img src="/floppy.png" alt="corrupted floppy" />
            <p>"Disk read error on disk 39 of 40. Starting over."</p>
          </div>
          <div className="gallery-card">
            <img src="/floppy.png" alt="floppy magnets" />
            <p>"Keep away from magnets. And speakers. And other floppy disks. And Wednesdays."</p>
          </div>
        </div>
      </section>
      <footer className="picofloppy-footer">
        <p>© {new Date().getFullYear()} Picofloppy.<br /> Not affiliated with Microsoft or Macrohard, we are not not big or hard enough. <br />
        All rights reserved to the Floppyverse.<br />
        Contact: <a href="mailto:floppy@picofloppy.com">floppy@picofloppy.com</a><br />
        If you read this, you probably need a hobby.<br />
        Powered by 100% recycled memes.</p>
      </footer>
    </div>
  );
}

export default App;
