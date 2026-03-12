// Lightweight TypeScript wrapper around selected pure SDL functions
import sdl from "./index";
import { ptr } from "bun:ffi";
import type { Pointer, CString } from "bun:ffi";
import * as Window from "./SDL/window";
import * as Display from "./SDL/display";
import * as Input from "./SDL/input";
import * as Renderer from "./SDL/renderer";
import * as Events from "./SDL/events";
import * as Clipboard from "./SDL/clipboard";
import * as Errors from "./SDL/errors";
import type { SDLWindow } from "./types";
import { SDL_EVENT_SIZE } from "./types";
import * as T from "./types";

export class SDL {
  static init(flags: number): boolean {
    return Boolean(sdl.SDL_Init(flags));
  }

  static quit(): void {
    sdl.SDL_Quit();
  }

  // core helpers remain on SDL

  // Misc
  static delay(ms: number): void {
    sdl.SDL_Delay(ms);
  }
}

export default SDL;

function pick(prefix: string) {
  const out: Record<string, any> = {};
  for (const k in T) {
    if (k.startsWith(prefix)) {
      out[k.slice(prefix.length)] = (T as any)[k];
    }
  }
  return out;
}

(SDL as any).Window = Window;
(SDL as any).Display = Display;
(SDL as any).Input = Input;
(SDL as any).Renderer = Renderer;
(SDL as any).Events = Events;
(SDL as any).Clipboard = Clipboard;
(SDL as any).Errors = Errors;
