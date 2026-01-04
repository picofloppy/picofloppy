# v86 Emulator Setup for Picofloppy.com

This directory contains the v86 x86 PC emulator used to run **Floppy Bird** on picofloppy.com.

## Directory Structure

```
v86/
├── build/          # Compiled v86 emulator files
│   ├── libv86.js   # Main v86 JavaScript library (327KB)
│   └── v86.wasm    # WebAssembly binary (2MB)
├── bios/           # BIOS files required for emulation
│   ├── seabios.bin # SeaBIOS (rel-1.16.2-0-gea1b7a0)
│   └── vgabios.bin # VGA BIOS for graphics
└── images/         # Bootable disk images
    └── floppybird.img  # Floppy Bird game (8.5KB bootable floppy)
```

## Floppy Bird

**Floppy Bird** is a Flappy Bird clone written entirely in 16-bit x86 assembly that boots from a floppy disk.

- **Size**: 8.5KB (fits on a single boot sector + additional sectors)
- **Format**: DOS/MBR boot sector
- **Graphics**: VGA 320x200 @ 256 colors
- **Controls**: 
  - Any key to flap
  - ESC to exit
  - Backspace for random background color
  - Tab for random bird color
- **Source**: https://github.com/icebreaker/floppybird

## v86 Configuration

The emulator is configured in `src/App.jsx` with:

- **Memory**: 16MB RAM
- **VGA Memory**: 8MB (optimized for graphics)
- **Boot Order**: `0x1` (floppy only)
  - 1 = Floppy disk
  - 2 = Hard disk  
  - 3 = CD-ROM
- **Keyboard/Mouse**: Enabled
- **Autostart**: true

## Building v86 from Source

The v86 files in `/build` were compiled from the official v86 repository:

```bash
cd public/v86
git clone https://github.com/copy/v86.git temp
cd temp
make
cp build/libv86.js ../build/
cp build/v86.wasm ../build/
cd ..
rm -rf temp
```

## Getting Floppy Bird Image

The floppybird.img was obtained by cloning the repo and using the pre-built binary:

```bash
cd public/v86/images
git clone https://github.com/icebreaker/floppybird.git temp_floppybird
cp temp_floppybird/build/floppybird.img .
rm -rf temp_floppybird
file floppybird.img  # Should show: DOS/MBR boot sector
```

**Note**: Downloading the image directly from GitHub's raw URL doesn't work - it returns HTML redirects instead of the binary file. You must clone the repo to get the actual binary.

## Implementation Notes

### Canvas Focus
The v86 canvas needs explicit focus to receive keyboard input. The code automatically:
- Calls `canvas.focus()` when the canvas is created
- Clicks the canvas to ensure it's active
- Polls every 500ms until the canvas is ready

### Boot Order
Initially used `0x132` (CD-ROM, HDD, Floppy) which caused SeaBIOS to try CD-ROM first, showing:
```
Booting from DVD/CD...
Boot failed: Could not read from CDROM (code 0003)
Booting from Floppy...
```

Changed to `0x1` to boot from floppy only, eliminating the unnecessary CD-ROM attempt.

### Memory Configuration
- Reduced RAM from 32MB to 16MB (sufficient for boot sector games)
- Increased VGA memory from 2MB to 8MB for better graphics performance

## Credits

- **v86**: https://github.com/copy/v86 - x86 PC emulator in JavaScript/WebAssembly
- **Floppy Bird**: https://github.com/icebreaker/floppybird - Bootable Flappy Bird clone in x86 assembly
- **SeaBIOS**: https://www.seabios.org/ - Open source x86 BIOS implementation

---

For the original v86 documentation, see `V86_ORIGINAL_README.md`.
