// Lightweight TypeScript wrapper around selected pure SDL functions
import sdl from "./index";
import { ptr } from "bun:ffi";
import type { Pointer, CString } from "bun:ffi";
import type { SDLWindow } from "./types";
import { SDL_EVENT_SIZE } from "./types";

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

  static createWindow(title: string, w: number, h: number, flags: number | bigint): SDLWindow {
    // pass flags through (FFI expects a u64). Caller may pass bigint for 64-bit flags.
    return sdl.SDL_CreateWindow(title as unknown as CString, w, h, flags as any) as Pointer as SDLWindow;
  }

  static destroyWindow(window: SDLWindow): void {
    sdl.SDL_DestroyWindow(window as any);
  }

  static setWindowTitle(window: SDLWindow, title: string): boolean {
    return Boolean(sdl.SDL_SetWindowTitle(window as any, title as unknown as CString));
  }

  static getWindowTitle(window: SDLWindow): string {
    return sdl.SDL_GetWindowTitle(window as any) as unknown as string;
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
}

export default SDL;
