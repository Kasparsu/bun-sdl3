import sdl from "../../index";
import type { CString } from "bun:ffi";

export function getKeyName(scancode: number): string {
  return sdl.SDL_GetScancodeName(scancode as any) as unknown as string;
}

export function startTextInput(window?: any): void {
  sdl.SDL_StartTextInput((window ?? null) as any);
}

export function stopTextInput(window?: any): void {
  sdl.SDL_StopTextInput((window ?? null) as any);
}

export function isTextInputActive(window?: any): boolean {
  return Boolean(sdl.SDL_TextInputActive((window ?? null) as any));
}

export function setTextInputRect(x: number, y: number, w: number, h: number): void {
  // SDL_Rect { x, y, w, h } layout: 4 ints
  const buf = new Int32Array([x, y, w, h]);
  sdl.SDL_SetTextInputRect(buf.buffer as any);
}
