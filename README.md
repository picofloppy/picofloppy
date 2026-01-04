# picofloppy.com

A spoof Microsoft-style website for the fictional Picofloppy brand. Features retro computing humor, a bootable Floppy Bird game running in a v86 x86 emulator, DOS spoofs, BSOD easter eggs, and more!

## Features
- 🎮 **Floppy Bird** - Bootable Flappy Bird clone running in v86 emulator
- 💾 Retro hero section with floppy disk branding
- 🎭 Parody products ("Trollducts") 
- 🔊 Sound effects (floppy disk sounds, spinning drive)
- 💀 BSOD (Blue Screen of Death) easter egg
- 🖥️ DOS spoof animations (CHKDSK water drain)
- 🍪 Cookie consent banner parody
- 📱 Responsive design
- 🚀 Built with Vite + React

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/cconstab/picofloppy.git
   cd picofloppy
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

### Building for Production

**Easy way:**
```sh
./build.sh
```

**Manual way:**
```sh
npm run build
# Then copy v86 files
mkdir -p dist/v86/{build,bios,images}
cp public/v86/build/*.js public/v86/build/*.wasm dist/v86/build/
cp public/v86/bios/* dist/v86/bios/
cp public/v86/images/floppybird.img dist/v86/images/
```

The output will be in the `dist` folder - upload this entire folder to your web server.

## Project Structure

```
picofloppy/
├── src/
│   ├── App.jsx          # Main component with all features
│   ├── App.css          # Styling
│   ├── Support.jsx      # Support page
│   └── assets/          # Sounds and images
├── public/
│   ├── v86/             # v86 emulator files (self-hosted)
│   │   ├── build/       # libv86.js, v86.wasm
│   │   ├── bios/        # SeaBIOS, VGA BIOS
│   │   └── images/      # floppybird.img (bootable floppy)
│   └── floppy.png       # Floppy disk icon
├── build.sh             # Build script
└── package.json
```

## v86 Emulator & Floppy Bird

The site includes a self-hosted v86 x86 emulator that boots **Floppy Bird** - a Flappy Bird clone written in x86 assembly that runs from a bootable floppy disk image.

- **Controls**: Any key to flap, ESC to exit
- **Image size**: 8.5KB bootable floppy disk
- **Documentation**: See `public/v86/README.md`

### Why self-hosted?
The v86 files are served from `/public/v86/` to avoid CORS issues and ensure reliable loading.

## Deployment
- The site is configured for HTTPS using Caddy and Vite.
-
#### Deploying with Caddy
##### Quick Start (Manual)

1. Install Caddy (see https://caddyserver.com/docs/install)
2. Build your site:
	```sh
	npm run build
	```
3. Create a `Caddyfile` in your project root with content like:
	```
	picofloppy.com {
		 root * /path/to/picofloppy/dist
		 file_server
		 encode gzip
		 tls you@example.com
	}
	```
	Replace `/path/to/picofloppy/dist` with the absolute path to your build output.
4. Start Caddy manually:
	```sh
	caddy run --config Caddyfile
	```
5. Visit your domain to verify deployment.

##### Running Caddy as a Service (systemctl)

Once you have verified your Caddy setup manually, you can run Caddy as a system service for production:

1. Follow the official [Caddy service setup guide](https://caddyserver.com/docs/running#systemd)
2. Copy your Caddyfile to `/etc/caddy/Caddyfile` and set permissions as needed
3. Start and enable the service:
	```sh
	sudo systemctl start caddy
	sudo systemctl enable caddy
	```
4. Check status:
	```sh
	systemctl status caddy
	```

1. Install Caddy (see https://caddyserver.com/docs/install)
2. Create a `Caddyfile` in your project root with content like:
	```
	picofloppy.com {
		 root * /path/to/picofloppy/dist
		 file_server
		 encode gzip
		 tls you@example.com
	}
	```
	Replace `/path/to/picofloppy/dist` with the absolute path to your build output.
3. Build your site:
	```sh
	npm run build
	```
4. Start Caddy:
	```sh
	caddy run --config Caddyfile
	```
5. Visit your domain to verify deployment.

For more advanced configuration, see the [Caddy documentation](https://caddyserver.com/docs/).

## Credits
- Created by cconstab
- Floppy disk icon and assets are original or public domain

## License
This project is for entertainment and parody purposes only. See LICENSE for details.

