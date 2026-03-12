import sdl from "../index";
import type { CString } from "bun:ffi";

export function platform(): string {
  return sdl.SDL_GetPlatform() as unknown as string;
}

export function primary(): number {
  return sdl.SDL_GetPrimaryDisplay();
}

export function name(displayID: number): string {
  return sdl.SDL_GetDisplayName(displayID) as unknown as string;
}
