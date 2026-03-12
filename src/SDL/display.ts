import sdl from "../index";
import type { CString } from "bun:ffi";

export function getPlatform(): string {
  return sdl.SDL_GetPlatform() as unknown as string;
}

export function getPrimaryDisplay(): number {
  return sdl.SDL_GetPrimaryDisplay();
}

export function getDisplayName(displayID: number): string {
  return sdl.SDL_GetDisplayName(displayID) as unknown as string;
}
