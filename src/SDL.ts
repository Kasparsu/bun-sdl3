// Lightweight TypeScript wrapper around selected pure SDL functions
import sdl from "./index";
import { ptr } from "bun:ffi";
import type { Pointer, CString } from "bun:ffi";
import * as Window from "./SDL/window";
import * as Display from "./SDL/display";
import * as Input from "./SDL/input";
import * as Renderer from "./SDL/renderer";
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

  static getError(): string {
    return sdl.SDL_GetError() as unknown as string;
  }

  static pollEvent(): { handled: boolean; buffer: ArrayBuffer } {
    const buf = new ArrayBuffer(SDL_EVENT_SIZE);
    const p = ptr(buf);
    const ok = sdl.SDL_PollEvent(p);
    return { handled: Boolean(ok), buffer: buf };
  }

  static waitEvent(): { handled: boolean; buffer: ArrayBuffer } {
    const buf = new ArrayBuffer(SDL_EVENT_SIZE);
    const p = ptr(buf);
    const ok = sdl.SDL_WaitEvent(p);
    return { handled: Boolean(ok), buffer: buf };
  }

  // Clipboard helpers left on SDL class
  static setClipboardText(text: string): boolean {
    return Boolean(sdl.SDL_SetClipboardText(text as unknown as CString));
  }

  static getClipboardText(): string {
    return sdl.SDL_GetClipboardText() as unknown as string;
  }

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

export const SDLConstants = {
  INIT: pick("SDL_INIT_"),
  WINDOW: pick("SDL_WINDOW_"),
  EVENT: pick("SDL_EVENT_"),
  KEYMOD: pick("SDL_KMOD_"),
  BUTTON: pick("SDL_BUTTON_"),
  KEYCODE: pick("SDLK_"),
  BLENDMODE: pick("SDL_BLENDMODE_"),
  PIXELFORMAT: pick("SDL_PIXELFORMAT_"),
  SCANCODE: T.SDLScancode,
  GAMEPAD_BUTTON: pick("SDL_GAMEPAD_BUTTON_"),
  GAMEPAD_AXIS: T.SDLGamepadAxis,
  GPU_SHADERFORMAT: pick("SDL_GPU_SHADERFORMAT_"),
  RENDERER_PRESENTATION: pick("SDL_LOGICAL_PRESENTATION_"),
};

// Attach submodule namespaces to `SDL` so callers can use `SDL.Window.create`, etc.
(SDL as any).Window = Window;
(SDL as any).Display = Display;
(SDL as any).Input = Input;
(SDL as any).Renderer = Renderer;
(SDL as any).Constants = SDLConstants;
