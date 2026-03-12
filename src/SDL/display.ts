import sdl from "../index";
import type { CString } from "bun:ffi";
import { pick } from "./pick";

export const DISPLAY = {
  // no broad display constants in types; keep placeholder
};

export function platform(): string {
  return sdl.SDL_GetPlatform() as unknown as string;
}

export function primary(): number {
  return sdl.SDL_GetPrimaryDisplay();
}

export function name(displayID: number): string {
  return sdl.SDL_GetDisplayName(displayID) as unknown as string;
}
