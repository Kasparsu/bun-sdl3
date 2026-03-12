import sdl from "../index";
import { ptr } from "bun:ffi";
import type { Pointer, CString } from "bun:ffi";
import type { SDLWindow } from "../types";

export function getWindowSurface(window: SDLWindow) {
  return sdl.SDL_GetWindowSurface(window as any) as Pointer as any;
}

export function updateWindowSurface(window: SDLWindow): boolean {
  return Boolean(sdl.SDL_UpdateWindowSurface(window as any));
}

export function savePNG(surface: any, file: string): boolean {
  return Boolean(sdl.SDL_SavePNG(surface as any, file as unknown as CString));
}

export function saveBMP(surface: any, file: string): boolean {
  return Boolean(sdl.SDL_SaveBMP(surface as any, file as unknown as CString));
}

export function destroySurface(surface: any): void {
  sdl.SDL_DestroySurface(surface as any);
}

export function createRenderer(window: SDLWindow, namePtr?: Pointer) {
  return sdl.SDL_CreateRenderer(window as any, (namePtr ?? null) as any) as Pointer as any;
}

export function destroyRenderer(renderer: any): void {
  sdl.SDL_DestroyRenderer(renderer as any);
}

export function setRenderDrawColor(renderer: any, r: number, g: number, b: number, a: number): boolean {
  return Boolean(sdl.SDL_SetRenderDrawColor(renderer as any, r, g, b, a));
}

export function renderClear(renderer: any): boolean {
  return Boolean(sdl.SDL_RenderClear(renderer as any));
}

export function renderPresent(renderer: any): boolean {
  return Boolean(sdl.SDL_RenderPresent(renderer as any));
}
