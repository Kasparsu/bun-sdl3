import sdl from "../../index";

export function state(): { x: number; y: number; buttons: number } {
  const px = new Int32Array(1);
  const py = new Int32Array(1);
  const buttons = sdl.SDL_GetMouseState(px.buffer as any, py.buffer as any) as number;
  return { x: px[0] as number, y: py[0] as number, buttons };
}

import { pick } from "../pick";

export const BUTTON = pick("SDL_BUTTON_");

export function warp(window: any, x: number, y: number): void {
  sdl.SDL_WarpMouseInWindow(window as any, x, y);
}

export function show(showFlag: boolean): void {
  if (showFlag) sdl.SDL_ShowCursor();
  else sdl.SDL_HideCursor();
}

export function setRelative(enabled: boolean): void {
  sdl.SDL_SetWindowRelativeMouseMode((null as any), enabled);
}
