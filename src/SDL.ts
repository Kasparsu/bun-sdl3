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
import type * as WindowModule from "./SDL/window";
import type * as DisplayModule from "./SDL/display";
import type * as InputModule from "./SDL/input";
import type * as RendererModule from "./SDL/renderer";
import type * as EventsModule from "./SDL/events";
import type * as ClipboardModule from "./SDL/clipboard";
import type * as ErrorsModule from "./SDL/errors";
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

  // Declared for TypeScript: these are attached at runtime below
  static InitFlags: Record<string, any>;
  static INIT: Record<string, any>;

  // Runtime-attached namespaces (modules) for convenience
  static Window: typeof WindowModule;
  static Display: typeof DisplayModule;
  static Input: typeof InputModule;
  static Renderer: typeof RendererModule;
  static Events: typeof EventsModule;
  static Clipboard: typeof ClipboardModule;
  static Errors: typeof ErrorsModule;

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
(function attachInitFlags() {
  function pick(prefix: string) {
    const out: Record<string, any> = {};
    for (const k in T) {
      if (k.startsWith(prefix)) {
        out[k.slice(prefix.length)] = (T as any)[k];
      }
    }
    return out;
  }

  (SDL as any).InitFlags = pick("SDL_INIT_");
  (SDL as any).INIT = (SDL as any).InitFlags;
})();
(SDL as any).Events = Events;
(SDL as any).Clipboard = Clipboard;
(SDL as any).Errors = Errors;
