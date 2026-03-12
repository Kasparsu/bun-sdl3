import sdl from "../index";
import { ptr } from "bun:ffi";
import type { Pointer, CString } from "bun:ffi";
import type { SDLWindow } from "../types";
import * as T from "../types";

export const WINDOW = {
  FULLSCREEN: T.SDL_WINDOW_FULLSCREEN,
  OPENGL: T.SDL_WINDOW_OPENGL,
  HIDDEN: T.SDL_WINDOW_HIDDEN,
  BORDERLESS: T.SDL_WINDOW_BORDERLESS,
  RESIZABLE: T.SDL_WINDOW_RESIZABLE,
  MINIMIZED: T.SDL_WINDOW_MINIMIZED,
  MAXIMIZED: T.SDL_WINDOW_MAXIMIZED,
  HIGH_PIXEL_DENSITY: T.SDL_WINDOW_HIGH_PIXEL_DENSITY,
  ALWAYS_ON_TOP: T.SDL_WINDOW_ALWAYS_ON_TOP,
  INPUT_FOCUS: T.SDL_WINDOW_INPUT_FOCUS,
  MOUSE_FOCUS: T.SDL_WINDOW_MOUSE_FOCUS,
  VULKAN: T.SDL_WINDOW_VULKAN,
} as const;

export function create(title: string, w: number, h: number, flags: number | bigint): SDLWindow {
  return sdl.SDL_CreateWindow(title as unknown as CString, w, h, flags as any) as Pointer as SDLWindow;
}

export function destroy(window: SDLWindow): void {
  sdl.SDL_DestroyWindow(window as any);
}

export function setTitle(window: SDLWindow, title: string): boolean {
  return Boolean(sdl.SDL_SetWindowTitle(window as any, title as unknown as CString));
}

export function getTitle(window: SDLWindow): string {
  return sdl.SDL_GetWindowTitle(window as any) as unknown as string;
}

export function setSize(window: SDLWindow, w: number, h: number): boolean {
  return Boolean(sdl.SDL_SetWindowSize(window as any, w, h));
}

export function getSize(window: SDLWindow): { w: number; h: number } {
  const wBuf = new ArrayBuffer(4);
  const hBuf = new ArrayBuffer(4);
  const wPtr = ptr(wBuf);
  const hPtr = ptr(hBuf);
  sdl.SDL_GetWindowSize(window as any, wPtr, hPtr);
  return { w: new DataView(wBuf).getInt32(0, true), h: new DataView(hBuf).getInt32(0, true) };
}

export function setPosition(window: SDLWindow, x: number, y: number): boolean {
  return Boolean(sdl.SDL_SetWindowPosition(window as any, x, y));
}

export function getPosition(window: SDLWindow): { x: number; y: number } {
  const xBuf = new ArrayBuffer(4);
  const yBuf = new ArrayBuffer(4);
  const xPtr = ptr(xBuf);
  const yPtr = ptr(yBuf);
  sdl.SDL_GetWindowPosition(window as any, xPtr, yPtr);
  return { x: new DataView(xBuf).getInt32(0, true), y: new DataView(yBuf).getInt32(0, true) };
}

export function flags(window: SDLWindow): number {
  return sdl.SDL_GetWindowFlags(window as any) as number;
}

export function show(window: SDLWindow): boolean {
  return Boolean(sdl.SDL_ShowWindow(window as any));
}

export function hide(window: SDLWindow): boolean {
  return Boolean(sdl.SDL_HideWindow(window as any));
}

export function maximize(window: SDLWindow): boolean {
  return Boolean(sdl.SDL_MaximizeWindow(window as any));
}

export function minimize(window: SDLWindow): boolean {
  return Boolean(sdl.SDL_MinimizeWindow(window as any));
}

export function restore(window: SDLWindow): boolean {
  return Boolean(sdl.SDL_RestoreWindow(window as any));
}

export function setFullscreen(window: SDLWindow, fullscreen: boolean): boolean {
  return Boolean(sdl.SDL_SetWindowFullscreen(window as any, fullscreen));
}
