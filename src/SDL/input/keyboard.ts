import sdl from "../../index";
import type { CString } from "bun:ffi";
import * as T from "../../types";

export const KEYMOD = {
  NONE: T.SDL_KMOD_NONE,
  LSHIFT: T.SDL_KMOD_LSHIFT,
  RSHIFT: T.SDL_KMOD_RSHIFT,
  LEVEL5: T.SDL_KMOD_LEVEL5,
  LCTRL: T.SDL_KMOD_LCTRL,
  RCTRL: T.SDL_KMOD_RCTRL,
  LALT: T.SDL_KMOD_LALT,
  RALT: T.SDL_KMOD_RALT,
  LGUI: T.SDL_KMOD_LGUI,
  RGUI: T.SDL_KMOD_RGUI,
  NUM: T.SDL_KMOD_NUM,
  CAPS: T.SDL_KMOD_CAPS,
  MODE: T.SDL_KMOD_MODE,
  SCROLL: T.SDL_KMOD_SCROLL,
  CTRL: T.SDL_KMOD_CTRL,
  SHIFT: T.SDL_KMOD_SHIFT,
  ALT: T.SDL_KMOD_ALT,
  GUI: T.SDL_KMOD_GUI,
} as const;

export const KEYCODE = {
  UNKNOWN: T.SDLK_UNKNOWN,
  RETURN: T.SDLK_RETURN,
  ESCAPE: T.SDLK_ESCAPE,
  BACKSPACE: T.SDLK_BACKSPACE,
  TAB: T.SDLK_TAB,
  SPACE: T.SDLK_SPACE,
  EXCLAIM: T.SDLK_EXCLAIM,
  QUOTE: T.SDLK_QUOTE,
  COMMA: T.SDLK_COMMA,
  MINUS: T.SDLK_MINUS,
  PERIOD: T.SDLK_PERIOD,
  SLASH: T.SDLK_SLASH,
  0: T.SDLK_0,
  1: T.SDLK_1,
  2: T.SDLK_2,
  3: T.SDLK_3,
  4: T.SDLK_4,
  5: T.SDLK_5,
  6: T.SDLK_6,
  7: T.SDLK_7,
  8: T.SDLK_8,
  9: T.SDLK_9,
  A: T.SDLK_A,
  B: T.SDLK_B,
  C: T.SDLK_C,
  D: T.SDLK_D,
  E: T.SDLK_E,
  F: T.SDLK_F,
  G: T.SDLK_G,
  H: T.SDLK_H,
  I: T.SDLK_I,
  J: T.SDLK_J,
  K: T.SDLK_K,
  L: T.SDLK_L,
  M: T.SDLK_M,
  N: T.SDLK_N,
  O: T.SDLK_O,
  P: T.SDLK_P,
  Q: T.SDLK_Q,
  R: T.SDLK_R,
  S: T.SDLK_S,
  T: T.SDLK_T,
  U: T.SDLK_U,
  V: T.SDLK_V,
  W: T.SDLK_W,
  X: T.SDLK_X,
  Y: T.SDLK_Y,
  Z: T.SDLK_Z,
  F1: T.SDLK_F1,
  F2: T.SDLK_F2,
  F3: T.SDLK_F3,
  F4: T.SDLK_F4,
  F5: T.SDLK_F5,
  F6: T.SDLK_F6,
  F7: T.SDLK_F7,
  F8: T.SDLK_F8,
  F9: T.SDLK_F9,
  F10: T.SDLK_F10,
  F11: T.SDLK_F11,
  F12: T.SDLK_F12,
  PRINTSCREEN: T.SDLK_PRINTSCREEN,
  SCROLLLOCK: T.SDLK_SCROLLLOCK,
  PAUSE: T.SDLK_PAUSE,
  INSERT: T.SDLK_INSERT,
  HOME: T.SDLK_HOME,
  PAGEUP: T.SDLK_PAGEUP,
  END: T.SDLK_END,
  PAGEDOWN: T.SDLK_PAGEDOWN,
  RIGHT: T.SDLK_RIGHT,
  LEFT: T.SDLK_LEFT,
  DOWN: T.SDLK_DOWN,
  UP: T.SDLK_UP,
} as const;

export function getName(scancode: number): string {
  return sdl.SDL_GetScancodeName(scancode as any) as unknown as string;
}

export function start(window?: any): void {
  sdl.SDL_StartTextInput((window ?? null) as any);
}

export function stop(window?: any): void {
  sdl.SDL_StopTextInput((window ?? null) as any);
}

export function isActive(window?: any): boolean {
  return Boolean(sdl.SDL_TextInputActive((window ?? null) as any));
}

export function setRect(x: number, y: number, w: number, h: number): void {
  // SDL_Rect { x, y, w, h } layout: 4 ints
  const buf = new Int32Array([x, y, w, h]);
  sdl.SDL_SetTextInputRect(buf.buffer as any);
}
