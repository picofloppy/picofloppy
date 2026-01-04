#!/bin/bash
set -e

echo "🔨 Building picofloppy.com..."

# Build the Vite project
echo "📦 Running Vite build..."
npm run build

# Copy v86 files to dist
echo "📂 Copying v86 emulator files..."
mkdir -p dist/v86/{build,bios,images}
cp public/v86/build/*.js public/v86/build/*.wasm dist/v86/build/ 2>/dev/null || true
cp public/v86/bios/* dist/v86/bios/
cp public/v86/images/floppybird.img dist/v86/images/

echo "✅ Build complete! Upload the 'dist' folder to your web server."
echo ""
echo "📊 Build output:"
ls -lh dist/
echo ""
echo "🎮 v86 files:"
ls -lh dist/v86/build/*.js dist/v86/build/*.wasm dist/v86/images/*.img 2>/dev/null || true
