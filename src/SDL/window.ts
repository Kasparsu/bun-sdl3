import sdl from "../index";
import { ptr } from "bun:ffi";
import type { Pointer, CString } from "bun:ffi";
import type { SDLWindow } from "../types";

export function createWindow(title: string, w: number, h: number, flags: number | bigint): SDLWindow {
  return sdl.SDL_CreateWindow(title as unknown as CString, w, h, flags as any) as Pointer as SDLWindow;
}

export function destroyWindow(window: SDLWindow): void {
  sdl.SDL_DestroyWindow(window as any);
}

export function setWindowTitle(window: SDLWindow, title: string): boolean {
  return Boolean(sdl.SDL_SetWindowTitle(window as any, title as unknown as CString));
}

export function getWindowTitle(window: SDLWindow): string {
  return sdl.SDL_GetWindowTitle(window as any) as unknown as string;
}

export function setWindowSize(window: SDLWindow, w: number, h: number): boolean {
  return Boolean(sdl.SDL_SetWindowSize(window as any, w, h));
}

export function getWindowSize(window: SDLWindow): { w: number; h: number } {
  const wBuf = new ArrayBuffer(4);
  const hBuf = new ArrayBuffer(4);
  const wPtr = ptr(wBuf);
  const hPtr = ptr(hBuf);
  sdl.SDL_GetWindowSize(window as any, wPtr, hPtr);
  return { w: new DataView(wBuf).getInt32(0, true), h: new DataView(hBuf).getInt32(0, true) };
}

export function setWindowPosition(window: SDLWindow, x: number, y: number): boolean {
  return Boolean(sdl.SDL_SetWindowPosition(window as any, x, y));
}

export function getWindowPosition(window: SDLWindow): { x: number; y: number } {
  const xBuf = new ArrayBuffer(4);
  const yBuf = new ArrayBuffer(4);
  const xPtr = ptr(xBuf);
  const yPtr = ptr(yBuf);
  sdl.SDL_GetWindowPosition(window as any, xPtr, yPtr);
  return { x: new DataView(xBuf).getInt32(0, true), y: new DataView(yBuf).getInt32(0, true) };
}

export function getWindowFlags(window: SDLWindow): number {
  return sdl.SDL_GetWindowFlags(window as any) as number;
}

export function showWindow(window: SDLWindow): boolean {
  return Boolean(sdl.SDL_ShowWindow(window as any));
}

export function hideWindow(window: SDLWindow): boolean {
  return Boolean(sdl.SDL_HideWindow(window as any));
}

export function maximizeWindow(window: SDLWindow): boolean {
  return Boolean(sdl.SDL_MaximizeWindow(window as any));
}

export function minimizeWindow(window: SDLWindow): boolean {
  return Boolean(sdl.SDL_MinimizeWindow(window as any));
}

export function restoreWindow(window: SDLWindow): boolean {
  return Boolean(sdl.SDL_RestoreWindow(window as any));
}

export function setWindowFullscreen(window: SDLWindow, fullscreen: boolean): boolean {
  return Boolean(sdl.SDL_SetWindowFullscreen(window as any, fullscreen));
}
