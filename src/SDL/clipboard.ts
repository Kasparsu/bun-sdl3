import sdl from "../index";
import type { CString } from "bun:ffi";

export function set(text: string): boolean {
  return Boolean(sdl.SDL_SetClipboardText(text as unknown as CString));
}

export function get(): string {
  return sdl.SDL_GetClipboardText() as unknown as string;
}

export function has(): boolean {
  // SDL_HasClipboardText exists on index binding
  return Boolean((sdl as any).SDL_HasClipboardText && (sdl as any).SDL_HasClipboardText());
}

export default { set, get, has };
