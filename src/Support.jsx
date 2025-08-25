import './App.css';

export default function Support() {
  return (
    <div className="picofloppy-support">
      <nav className="picofloppy-nav">
        <div className="picofloppy-logo">
          <span className="logo-square red"></span>
          <span className="logo-square green"></span>
          <span className="logo-square blue"></span>
          <span className="logo-square yellow"></span>
          <span className="logo-text">picofloppy</span>
        </div>
  {/* No navigation links on support page */}
      </nav>
      <button className="back-btn" onClick={() => window.location.href = '/'} style={{margin: '1em 0', padding: '0.5em 1.5em', fontSize: '1em', borderRadius: '4px', background: '#0078d4', color: '#fff', border: 'none', cursor: 'pointer'}}>← Back to Main Page</button>
  <h1>Support</h1>
      <h2>How a Computer Boots (Excruciating Detail)</h2>
      <ol>
        <li><strong>Power On:</strong> You press the power button. Electricity flows. Capacitors charge. The power supply fan spins up, making a noise reminiscent of a distant jet engine. LEDs flicker to life.</li>
        <li><strong>POST (Power-On Self Test):</strong> The motherboard runs a series of tests. RAM is counted, sometimes slowly, one megabyte at a time. If something is wrong, the computer beeps. If everything is right, it still beeps, just to keep you guessing.</li>
        <li><strong>Peripheral Detection:</strong> The system checks for attached devices: keyboard, mouse, monitor, and that one printer you haven’t used since 2003. If a floppy drive is present, it makes a satisfying click-whirr noise.</li>
        <li><strong>BIOS/UEFI Loads:</strong> The BIOS/UEFI firmware initializes. It displays a logo or a wall of intimidating text. You can press DEL, F2, or F12 to enter setup, but you never do.</li>
        <li><strong>Drive Enumeration:</strong> The BIOS/UEFI scans for bootable devices: hard drives, SSDs, USB sticks, and, of course, floppy disks. It checks the boot order, which is always wrong.</li>
        <li><strong>Boot Device Found:</strong> The BIOS/UEFI finds a bootable device. If it’s a floppy, you’re in for a treat. If not, it tries the next device. If nothing is found, you get a cryptic error message.</li>
        <li><strong>Boot Sector Read:</strong> The first 512 bytes of the boot device are read into memory. If it’s a floppy, you hear the iconic grind. The bootloader is loaded and executed.</li>
        <li><strong>Bootloader Loads:</strong> The bootloader (GRUB, Windows Boot Manager, LILO, or something ancient) loads the operating system kernel. It may present a menu with options you never use.</li>
        <li><strong>Kernel Initializes:</strong> The kernel takes control, initializes hardware, mounts filesystems, and starts system processes. It prints messages about things you don’t understand.</li>
        <li><strong>Hardware Drivers:</strong> The kernel loads drivers for your hardware. If a driver fails, you get a blue screen, kernel panic, or a mysterious error code.</li>
        <li><strong>System Services Start:</strong> Services like networking, audio, and display start. The system clock is set, sometimes incorrectly. If you hear a floppy noise, you are officially retro.</li>
        <li><strong>Login Screen:</strong> The login manager appears. You enter your password incorrectly three times. Caps Lock is on. You try again.</li>
        <li><strong>Desktop Loads:</strong> The desktop environment loads. Icons appear. You open 47 browser tabs. The computer sighs and the fan spins up in protest.</li>
        <li><strong>Background Processes:</strong> Antivirus, update managers, and other background apps start. You ignore all notifications.</li>
        <li><strong>User Session:</strong> You are finally ready to use your computer. You immediately click "Restart" by accident.</li>
      </ol>
      <p><strong>Please read every word above before calling support. There will be a quiz.</strong></p>
      <p>If your computer is still not working, just try to <span style={{color: '#0078d4', fontWeight: 'bold'}}>reboot reboot</span> (yes, reboot reboot) and see if that helps.</p>
    </div>
  );
}
