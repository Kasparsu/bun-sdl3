import sdl from "../../index";
import type { CString } from "bun:ffi";
import { pick } from "../pick";
import * as T from "../../types";

export const KEYMOD = pick("SDL_KMOD_");
export const KEYCODE = pick("SDLK_");
export const SCANCODE = T.SDLScancode;

export function getName(scancode: number): string {
  return sdl.SDL_GetScancodeName(scancode as any) as unknown as string;
}

export function start(window?: any): void {
  sdl.SDL_StartTextInput((window ?? null) as any);
}

export function stop(window?: any): void {
  sdl.SDL_StopTextInput((window ?? null) as any);
}

export function isActive(window?: any): boolean {
  return Boolean(sdl.SDL_TextInputActive((window ?? null) as any));
}

export function setRect(x: number, y: number, w: number, h: number): void {
  // SDL_Rect { x, y, w, h } layout: 4 ints
  const buf = new Int32Array([x, y, w, h]);
  sdl.SDL_SetTextInputRect(buf.buffer as any);
}
