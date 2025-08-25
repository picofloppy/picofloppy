# picofloppy.com

A spoof Microsoft-style website for the fictional Picofloppy brand. This site is a playful homage to retro computing, featuring memes, sound effects, a gallery, and humorous support content. Built with Vite + React.

## Features
- Retro hero section with floppy disk branding
- Meme gallery and sound effects
- Navigation bar with links to products, download, and support
- Support page with humorous content
- Responsive design and modern UI
- Favicon and link preview meta tags for sharing
- HTTPS-ready deployment (Caddy + Vite)

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
	The site will be available at `http://localhost:3000`.

### Building for Production
```sh
npm run build
```
The output will be in the `dist` folder.

### Deployment
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

