# bun-sdl3

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.10. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

Constants and convenience access
--------------------------------

This project exposes grouped SDL constants via the `SDLConstants` export on the `SDL` module. Import and use them like this:

```ts
import SDL, { SDLConstants } from './src/SDL';

// Example: check if a window flag is set
const flags = BigInt(0x0000000000000001);
if (flags & SDLConstants.WINDOW.FULLSCREEN) {
	console.log('fullscreen flag present');
}

// Access scancodes enum
const sc = SDLConstants.SCANCODE.A;
console.log('scancode for A:', sc);

// Access keymod masks
if (mods & SDLConstants.KEYMOD.CTRL) {
	// Ctrl held
}
```

`SDLConstants` groups related constants (INIT, WINDOW, EVENT, KEYMOD, BUTTON, KEYCODE, BLENDMODE, PIXELFORMAT, SCANCODE, GAMEPAD_BUTTON, etc.) and also exposes `SCANCODE` and `GAMEPAD_AXIS` enums directly.
