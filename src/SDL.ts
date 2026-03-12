// Lightweight TypeScript wrapper around selected pure SDL functions
import sdl from "./index";
import { ptr } from "bun:ffi";
import type { Pointer, CString } from "bun:ffi";
import type { SDLWindow } from "./types";
import { SDL_EVENT_SIZE } from "./types";
import * as T from "./types";

export class SDL {
  static init(flags: number): boolean {
    return Boolean(sdl.SDL_Init(flags));
  }

  static quit(): void {
    sdl.SDL_Quit();
  }

  static getError(): string {
    return sdl.SDL_GetError() as unknown as string;
  }

  static createWindow(title: string, w: number, h: number, flags: number | bigint): SDLWindow {
    // pass flags through (FFI expects a u64). Caller may pass bigint for 64-bit flags.
    return sdl.SDL_CreateWindow(title as unknown as CString, w, h, flags as any) as Pointer as SDLWindow;
  }

  static destroyWindow(window: SDLWindow): void {
    sdl.SDL_DestroyWindow(window as any);
  }

  static setWindowTitle(window: SDLWindow, title: string): boolean {
    return Boolean(sdl.SDL_SetWindowTitle(window as any, title as unknown as CString));
  }

  static getWindowTitle(window: SDLWindow): string {
    return sdl.SDL_GetWindowTitle(window as any) as unknown as string;
  }

  static pollEvent(): { handled: boolean; buffer: ArrayBuffer } {
    const buf = new ArrayBuffer(SDL_EVENT_SIZE);
    const p = ptr(buf);
    const ok = sdl.SDL_PollEvent(p);
    return { handled: Boolean(ok), buffer: buf };
  }

  static waitEvent(): { handled: boolean; buffer: ArrayBuffer } {
    const buf = new ArrayBuffer(SDL_EVENT_SIZE);
    const p = ptr(buf);
    const ok = sdl.SDL_WaitEvent(p);
    return { handled: Boolean(ok), buffer: buf };
  }

  // --- Window helpers ---
  static setWindowSize(window: SDLWindow, w: number, h: number): boolean {
    return Boolean(sdl.SDL_SetWindowSize(window as any, w, h));
  }

  static getWindowSize(window: SDLWindow): { w: number; h: number } {
    const wBuf = new ArrayBuffer(4);
    const hBuf = new ArrayBuffer(4);
    const wPtr = ptr(wBuf);
    const hPtr = ptr(hBuf);
    sdl.SDL_GetWindowSize(window as any, wPtr, hPtr);
    const dvw = new DataView(wBuf);
    const dvh = new DataView(hBuf);
    return { w: dvw.getInt32(0, true), h: dvh.getInt32(0, true) };
  }

  static setWindowPosition(window: SDLWindow, x: number, y: number): boolean {
    return Boolean(sdl.SDL_SetWindowPosition(window as any, x, y));
  }

  static getWindowPosition(window: SDLWindow): { x: number; y: number } {
    const xBuf = new ArrayBuffer(4);
    const yBuf = new ArrayBuffer(4);
    const xPtr = ptr(xBuf);
    const yPtr = ptr(yBuf);
    sdl.SDL_GetWindowPosition(window as any, xPtr, yPtr);
    return { x: new DataView(xBuf).getInt32(0, true), y: new DataView(yBuf).getInt32(0, true) };
  }

  static getWindowFlags(window: SDLWindow): number {
    return sdl.SDL_GetWindowFlags(window as any) as number;
  }

  static showWindow(window: SDLWindow): boolean {
    return Boolean(sdl.SDL_ShowWindow(window as any));
  }

  static hideWindow(window: SDLWindow): boolean {
    return Boolean(sdl.SDL_HideWindow(window as any));
  }

  static maximizeWindow(window: SDLWindow): boolean {
    return Boolean(sdl.SDL_MaximizeWindow(window as any));
  }

  static minimizeWindow(window: SDLWindow): boolean {
    return Boolean(sdl.SDL_MinimizeWindow(window as any));
  }

  static restoreWindow(window: SDLWindow): boolean {
    return Boolean(sdl.SDL_RestoreWindow(window as any));
  }

  static setWindowFullscreen(window: SDLWindow, fullscreen: boolean): boolean {
    return Boolean(sdl.SDL_SetWindowFullscreen(window as any, fullscreen));
  }

  // --- Display / System ---
  static getPlatform(): string {
    return sdl.SDL_GetPlatform() as unknown as string;
  }

  static getPrimaryDisplay(): number {
    return sdl.SDL_GetPrimaryDisplay();
  }

  static getDisplayName(displayID: number): string {
    return sdl.SDL_GetDisplayName(displayID) as unknown as string;
  }

  // --- Surface ---
  static getWindowSurface(window: SDLWindow) {
    return sdl.SDL_GetWindowSurface(window as any) as Pointer as any;
  }

  static updateWindowSurface(window: SDLWindow): boolean {
    return Boolean(sdl.SDL_UpdateWindowSurface(window as any));
  }

  static savePNG(surface: any, file: string): boolean {
    return Boolean(sdl.SDL_SavePNG(surface as any, file as unknown as CString));
  }

  static saveBMP(surface: any, file: string): boolean {
    return Boolean(sdl.SDL_SaveBMP(surface as any, file as unknown as CString));
  }

  static destroySurface(surface: any): void {
    sdl.SDL_DestroySurface(surface as any);
  }

  // --- Renderer / Texture ---
  static createRenderer(window: SDLWindow, namePtr?: Pointer) {
    return sdl.SDL_CreateRenderer(window as any, (namePtr ?? null) as any) as Pointer as any;
  }

  static destroyRenderer(renderer: any): void {
    sdl.SDL_DestroyRenderer(renderer as any);
  }

  static setRenderDrawColor(renderer: any, r: number, g: number, b: number, a: number): boolean {
    return Boolean(sdl.SDL_SetRenderDrawColor(renderer as any, r, g, b, a));
  }

  static renderClear(renderer: any): boolean {
    return Boolean(sdl.SDL_RenderClear(renderer as any));
  }

  static renderPresent(renderer: any): boolean {
    return Boolean(sdl.SDL_RenderPresent(renderer as any));
  }

  // --- Keyboard / Mouse ---
  static getKeyName(key: number): string {
    return sdl.SDL_GetKeyName(key) as unknown as string;
  }

  static getMouseState(): { state: number; x: number; y: number } {
    const xBuf = new ArrayBuffer(4);
    const yBuf = new ArrayBuffer(4);
    const xPtr = ptr(xBuf);
    const yPtr = ptr(yBuf);
    const state = sdl.SDL_GetMouseState(xPtr, yPtr) as number;
    return { state, x: new DataView(xBuf).getInt32(0, true), y: new DataView(yBuf).getInt32(0, true) };
  }

  static warpMouseInWindow(window: SDLWindow, x: number, y: number): void {
    sdl.SDL_WarpMouseInWindow(window as any, x, y);
  }

  static showCursor(): boolean {
    return Boolean(sdl.SDL_ShowCursor());
  }

  static hideCursor(): boolean {
    return Boolean(sdl.SDL_HideCursor());
  }

  // --- Clipboard ---
  static setClipboardText(text: string): boolean {
    return Boolean(sdl.SDL_SetClipboardText(text as unknown as CString));
  }

  static getClipboardText(): string {
    return sdl.SDL_GetClipboardText() as unknown as string;
  }

  // --- Text input ---
  static startTextInput(window?: SDLWindow): boolean {
    return Boolean(sdl.SDL_StartTextInput((window ?? null) as any));
  }

  static stopTextInput(window?: SDLWindow): boolean {
    return Boolean(sdl.SDL_StopTextInput((window ?? null) as any));
  }

  // --- Misc ---
  static delay(ms: number): void {
    sdl.SDL_Delay(ms);
  }
}

export default SDL;

function pick(prefix: string) {
  const out: Record<string, any> = {};
  for (const k in T) {
    if (k.startsWith(prefix)) {
      out[k.slice(prefix.length)] = (T as any)[k];
    }
  }
  return out;
}

export const SDLConstants = {
  INIT: pick("SDL_INIT_"),
  WINDOW: pick("SDL_WINDOW_"),
  EVENT: pick("SDL_EVENT_"),
  KEYMOD: pick("SDL_KMOD_"),
  BUTTON: pick("SDL_BUTTON_"),
  KEYCODE: pick("SDLK_"),
  BLENDMODE: pick("SDL_BLENDMODE_"),
  PIXELFORMAT: pick("SDL_PIXELFORMAT_"),
  SCANCODE: T.SDLScancode,
  GAMEPAD_BUTTON: pick("SDL_GAMEPAD_BUTTON_"),
  GAMEPAD_AXIS: T.SDLGamepadAxis,
  GPU_SHADERFORMAT: pick("SDL_GPU_SHADERFORMAT_"),
  RENDERER_PRESENTATION: pick("SDL_LOGICAL_PRESENTATION_"),
};
