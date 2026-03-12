import sdl from "../../index";
import * as T from "../../types";

export function state(): { x: number; y: number; buttons: number } {
  const px = new Int32Array(1);
  const py = new Int32Array(1);
  const buttons = sdl.SDL_GetMouseState(px.buffer as any, py.buffer as any) as number;
  return { x: px[0] as number, y: py[0] as number, buttons };
}

export const BUTTON = {
  LEFT: T.SDL_BUTTON_LEFT,
  MIDDLE: T.SDL_BUTTON_MIDDLE,
  RIGHT: T.SDL_BUTTON_RIGHT,
  X1: T.SDL_BUTTON_X1,
  X2: T.SDL_BUTTON_X2,
  LMASK: T.SDL_BUTTON_LMASK,
  MMASK: T.SDL_BUTTON_MMASK,
  RMASK: T.SDL_BUTTON_RMASK,
  X1MASK: T.SDL_BUTTON_X1MASK,
  X2MASK: T.SDL_BUTTON_X2MASK,
} as const;

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
