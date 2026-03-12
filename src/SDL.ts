// Lightweight TypeScript wrapper around selected pure SDL functions
import sdl from "./index";
import { ptr } from "bun:ffi";
import type { Pointer, CString } from "bun:ffi";
import * as Window from "./SDL/window";
import * as Display from "./SDL/display";
import * as Input from "./SDL/input";
import * as Renderer from "./SDL/renderer";
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
    return Window.createWindow(title, w, h, flags);
  }

  static destroyWindow(window: SDLWindow): void {
    Window.destroyWindow(window);
  }

  static setWindowTitle(window: SDLWindow, title: string): boolean {
    return Window.setWindowTitle(window, title);
  }

  static getWindowTitle(window: SDLWindow): string {
    return Window.getWindowTitle(window);
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
    return Window.setWindowSize(window, w, h);
  }

  static getWindowSize(window: SDLWindow): { w: number; h: number } {
    return Window.getWindowSize(window);
  }

  static setWindowPosition(window: SDLWindow, x: number, y: number): boolean {
    return Window.setWindowPosition(window, x, y);
  }

  static getWindowPosition(window: SDLWindow): { x: number; y: number } {
    return Window.getWindowPosition(window);
  }

  static getWindowFlags(window: SDLWindow): number {
    return Window.getWindowFlags(window);
  }

  static showWindow(window: SDLWindow): boolean {
    return Window.showWindow(window);
  }

  static hideWindow(window: SDLWindow): boolean {
    return Window.hideWindow(window);
  }

  static maximizeWindow(window: SDLWindow): boolean {
    return Window.maximizeWindow(window);
  }

  static minimizeWindow(window: SDLWindow): boolean {
    return Window.minimizeWindow(window);
  }

  static restoreWindow(window: SDLWindow): boolean {
    return Window.restoreWindow(window);
  }

  static setWindowFullscreen(window: SDLWindow, fullscreen: boolean): boolean {
    return Window.setWindowFullscreen(window, fullscreen);
  }

  // --- Display / System ---
  static getPlatform(): string {
    return Display.getPlatform();
  }

  static getPrimaryDisplay(): number {
    return Display.getPrimaryDisplay();
  }

  static getDisplayName(displayID: number): string {
    return Display.getDisplayName(displayID);
  }

  // --- Surface / Renderer ---
  static getWindowSurface(window: SDLWindow) {
    return Renderer.getWindowSurface(window);
  }

  static updateWindowSurface(window: SDLWindow): boolean {
    return Renderer.updateWindowSurface(window);
  }

  static savePNG(surface: any, file: string): boolean {
    return Renderer.savePNG(surface, file);
  }

  static saveBMP(surface: any, file: string): boolean {
    return Renderer.saveBMP(surface, file);
  }

  static destroySurface(surface: any): void {
    Renderer.destroySurface(surface);
  }

  static createRenderer(window: SDLWindow, namePtr?: Pointer) {
    return Renderer.createRenderer(window, namePtr as any);
  }

  static destroyRenderer(renderer: any): void {
    Renderer.destroyRenderer(renderer);
  }

  static setRenderDrawColor(renderer: any, r: number, g: number, b: number, a: number): boolean {
    return Renderer.setRenderDrawColor(renderer, r, g, b, a);
  }

  static renderClear(renderer: any): boolean {
    return Renderer.renderClear(renderer);
  }

  static renderPresent(renderer: any): boolean {
    return Renderer.renderPresent(renderer);
  }

  // --- Keyboard / Mouse ---
  static getKeyName(key: number): string {
    return Input.Keyboard.getKeyName(key);
  }

  static startTextInput(): void {
    Input.Keyboard.startTextInput();
  }

  static stopTextInput(): void {
    Input.Keyboard.stopTextInput();
  }

  static isTextInputActive(): boolean {
    return Input.Keyboard.isTextInputActive();
  }

  static setTextInputRect(x: number, y: number, w: number, h: number): void {
    Input.Keyboard.setTextInputRect(x, y, w, h);
  }

  static getMouseState(): { x: number; y: number; buttons: number } {
    return Input.Mouse.getMouseState();
  }

  static warpMouseInWindow(window: SDLWindow, x: number, y: number): void {
    Input.Mouse.warpMouseInWindow(window as any, x, y);
  }

  static showCursor(): boolean {
    Input.Mouse.showCursor(true);
    return true;
  }

  static hideCursor(): boolean {
    Input.Mouse.showCursor(false);
    return true;
  }

  static setRelativeMouseMode(enabled: boolean): void {
    Input.Mouse.setRelativeMouseMode(enabled);
  }

  // --- Gamepad ---
  static numJoysticks(): number {
    return Input.Gamepad.numJoysticks();
  }

  static openGamepad(index: number) {
    return Input.Gamepad.openGamepad(index);
  }

  static closeGamepad(gamepad: any): void {
    Input.Gamepad.closeGamepad(gamepad);
  }

  // --- Touch ---
  static numTouchDevices(): number {
    return Input.Touch.numTouchDevices();
  }

  static getTouchDevice(index: number) {
    return Input.Touch.getTouchDevice(index);
  }

  // --- Clipboard ---
  static setClipboardText(text: string): boolean {
    return Boolean(sdl.SDL_SetClipboardText(text as unknown as CString));
  }

  static getClipboardText(): string {
    return sdl.SDL_GetClipboardText() as unknown as string;
  }

  // --- Text input (windowed helpers kept for compatibility) ---
  static startTextInputWindow(window?: SDLWindow): boolean {
    return Boolean(sdl.SDL_StartTextInput((window ?? null) as any));
  }

  static stopTextInputWindow(window?: SDLWindow): boolean {
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
