import sdl from "../index";
import type { CString } from "bun:ffi";
import { pick } from "./pick";
import type { SDLWindow } from "../types";

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

export function screenSaverEnabled(): boolean {
  return Boolean(sdl.SDL_ScreenSaverEnabled());
}

export function enableScreenSaver(): boolean {
  return Boolean(sdl.SDL_EnableScreenSaver());
}

export function disableScreenSaver(): boolean {
  return Boolean(sdl.SDL_DisableScreenSaver());
}

export function forWindow(window: SDLWindow): number {
  return sdl.SDL_GetDisplayForWindow(window as any) as number;
}
