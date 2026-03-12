import sdl from "../index";
import { ptr } from "bun:ffi";
import * as T from "../types";

// Re-export common event constants for convenience
export const QUIT = T.SDL_EVENT_QUIT;
export const WINDOW_SHOWN = T.SDL_EVENT_WINDOW_SHOWN;
export const WINDOW_HIDDEN = T.SDL_EVENT_WINDOW_HIDDEN;
export const WINDOW_EXPOSED = T.SDL_EVENT_WINDOW_EXPOSED;
export const WINDOW_MOVED = T.SDL_EVENT_WINDOW_MOVED;
export const WINDOW_RESIZED = T.SDL_EVENT_WINDOW_RESIZED;
export const WINDOW_PIXEL_SIZE_CHANGED = T.SDL_EVENT_WINDOW_PIXEL_SIZE_CHANGED;
export const WINDOW_MINIMIZED = T.SDL_EVENT_WINDOW_MINIMIZED;
export const WINDOW_MAXIMIZED = T.SDL_EVENT_WINDOW_MAXIMIZED;
export const WINDOW_RESTORED = T.SDL_EVENT_WINDOW_RESTORED;
export const WINDOW_FOCUS_GAINED = T.SDL_EVENT_WINDOW_FOCUS_GAINED;
export const WINDOW_FOCUS_LOST = T.SDL_EVENT_WINDOW_FOCUS_LOST;
export const WINDOW_CLOSE_REQUESTED = T.SDL_EVENT_WINDOW_CLOSE_REQUESTED;

export const KEY_DOWN = T.SDL_EVENT_KEY_DOWN;
export const KEY_UP = T.SDL_EVENT_KEY_UP;

export const MOUSE_MOTION = T.SDL_EVENT_MOUSE_MOTION;
export const MOUSE_BUTTON_DOWN = T.SDL_EVENT_MOUSE_BUTTON_DOWN;
export const MOUSE_BUTTON_UP = T.SDL_EVENT_MOUSE_BUTTON_UP;
export const MOUSE_WHEEL = T.SDL_EVENT_MOUSE_WHEEL;

export const JOYSTICK_AXIS = T.SDL_EVENT_JOYSTICK_AXIS_MOTION;
export const JOYSTICK_HAT = T.SDL_EVENT_JOYSTICK_HAT_MOTION;
export const JOYSTICK_BUTTON_DOWN = T.SDL_EVENT_JOYSTICK_BUTTON_DOWN;
export const JOYSTICK_BUTTON_UP = T.SDL_EVENT_JOYSTICK_BUTTON_UP;

export const GAMEPAD_AXIS = T.SDL_EVENT_GAMEPAD_AXIS_MOTION;
export const GAMEPAD_BUTTON_DOWN = T.SDL_EVENT_GAMEPAD_BUTTON_DOWN;
export const GAMEPAD_BUTTON_UP = T.SDL_EVENT_GAMEPAD_BUTTON_UP;

// Typed event payloads (mirrors previous `src/events.ts` types)
export interface BaseEvent {
  type: number;
  timestamp?: number;
  name?: string;
}

export interface KeyboardEvent extends BaseEvent {
  scancode: number;
  key: number;
  mod: number;
  down: boolean;
  repeat: boolean;
}

export interface MouseMotionEvent extends BaseEvent {
  state: number;
  x: number;
  y: number;
  xrel: number;
  yrel: number;
}

export interface MouseButtonEvent extends BaseEvent {
  button: number;
  down: boolean;
  clicks: number;
  x: number;
  y: number;
}

export interface MouseWheelEvent extends BaseEvent {
  x: number;
  y: number;
  direction: number;
}

export interface JoyAxisEvent extends BaseEvent {
  which: number;
  axis: number;
  value: number;
}

export interface JoyButtonEvent extends BaseEvent {
  which: number;
  button: number;
  down: boolean;
}

export interface JoyHatEvent extends BaseEvent {
  which: number;
  hat: number;
  value: number;
}

export type ParsedEvent =
  | KeyboardEvent
  | MouseMotionEvent
  | MouseButtonEvent
  | MouseWheelEvent
  | JoyAxisEvent
  | JoyButtonEvent
  | JoyHatEvent
  | BaseEvent;

function eventName(type: number): string {
  switch (type) {
    case T.SDL_EVENT_QUIT:
      return "QUIT";
    case T.SDL_EVENT_WINDOW_SHOWN:
      return "WINDOW_SHOWN";
    case T.SDL_EVENT_WINDOW_HIDDEN:
      return "WINDOW_HIDDEN";
    case T.SDL_EVENT_WINDOW_EXPOSED:
      return "WINDOW_EXPOSED";
    case T.SDL_EVENT_WINDOW_MOVED:
      return "WINDOW_MOVED";
    case T.SDL_EVENT_WINDOW_RESIZED:
      return "WINDOW_RESIZED";
    case T.SDL_EVENT_WINDOW_PIXEL_SIZE_CHANGED:
      return "WINDOW_PIXEL_SIZE_CHANGED";
    case T.SDL_EVENT_WINDOW_MINIMIZED:
      return "WINDOW_MINIMIZED";
    case T.SDL_EVENT_WINDOW_MAXIMIZED:
      return "WINDOW_MAXIMIZED";
    case T.SDL_EVENT_WINDOW_RESTORED:
      return "WINDOW_RESTORED";
    case T.SDL_EVENT_WINDOW_FOCUS_GAINED:
      return "WINDOW_FOCUS_GAINED";
    case T.SDL_EVENT_WINDOW_FOCUS_LOST:
      return "WINDOW_FOCUS_LOST";
    case T.SDL_EVENT_WINDOW_CLOSE_REQUESTED:
      return "WINDOW_CLOSE_REQUESTED";
    case T.SDL_EVENT_KEY_DOWN:
      return "KEY_DOWN";
    case T.SDL_EVENT_KEY_UP:
      return "KEY_UP";
    case T.SDL_EVENT_MOUSE_MOTION:
      return "MOUSE_MOTION";
    case T.SDL_EVENT_MOUSE_BUTTON_DOWN:
      return "MOUSE_BUTTON_DOWN";
    case T.SDL_EVENT_MOUSE_BUTTON_UP:
      return "MOUSE_BUTTON_UP";
    case T.SDL_EVENT_MOUSE_WHEEL:
      return "MOUSE_WHEEL";
    case T.SDL_EVENT_JOYSTICK_AXIS_MOTION:
      return "JOY_AXIS";
    case T.SDL_EVENT_JOYSTICK_HAT_MOTION:
      return "JOY_HAT";
    case T.SDL_EVENT_JOYSTICK_BUTTON_DOWN:
      return "JOY_BUTTON_DOWN";
    case T.SDL_EVENT_JOYSTICK_BUTTON_UP:
      return "JOY_BUTTON_UP";
    case T.SDL_EVENT_GAMEPAD_AXIS_MOTION:
      return "GAMEPAD_AXIS";
    case T.SDL_EVENT_GAMEPAD_BUTTON_DOWN:
      return "GAMEPAD_BUTTON_DOWN";
    case T.SDL_EVENT_GAMEPAD_BUTTON_UP:
      return "GAMEPAD_BUTTON_UP";
    default:
      return `EVENT_0x${type.toString(16)}`;
  }
}

// Build reverse lookup for SDLK_* constants for readable key names
const KEY_NAME_MAP: Record<number, string> = {};
for (const k in T) {
  if (k.startsWith("SDLK_")) {
    (KEY_NAME_MAP as any)[(T as any)[k]] = k.replace("SDLK_", "");
  }
}

const MOD_FLAGS: Array<[string, number]> = [
  ["LSHIFT", T.SDL_KMOD_LSHIFT],
  ["RSHIFT", T.SDL_KMOD_RSHIFT],
  ["LSHIFT|RSHIFT", T.SDL_KMOD_SHIFT],
  ["LCTRL", T.SDL_KMOD_LCTRL],
  ["RCTRL", T.SDL_KMOD_RCTRL],
  ["LCTRL|RCTRL", T.SDL_KMOD_CTRL],
  ["LALT", T.SDL_KMOD_LALT],
  ["RALT", T.SDL_KMOD_RALT],
  ["LGUI", T.SDL_KMOD_LGUI],
  ["RGUI", T.SDL_KMOD_RGUI],
  ["NUM", T.SDL_KMOD_NUM],
  ["CAPS", T.SDL_KMOD_CAPS],
  ["MODE", T.SDL_KMOD_MODE],
  ["SCROLL", T.SDL_KMOD_SCROLL],
];

function modToNames(mod: number): string[] {
  const out: string[] = [];
  for (const [name, val] of MOD_FLAGS) {
    if (val && (mod & (val as number)) !== 0) out.push(name);
  }
  return out;
}

function scancodeName(sc: number): string | undefined {
  // SDLScancode is an enum so reverse mapping exists
  try {
    return (T.SDLScancode as any)[sc] as string | undefined;
  } catch {
    return undefined;
  }
}

function readIntOrFloat(dv: DataView, offset: number): number {
  const i = dv.getInt32(offset, true);
  if (Math.abs(i) > 1_000_000) {
    const f = dv.getFloat32(offset, true);
    if (Number.isFinite(f) && Math.abs(f) < 1_000_000) return f;
  }
  return i;
}

// Parse an SDL_Event stored in an ArrayBuffer (SDL uses little-endian on x86-64)
export function parseEvent(buf: ArrayBuffer): ParsedEvent {
  const dv = new DataView(buf);
  const type = dv.getUint32(0, true);

  switch (type) {
    case T.SDL_EVENT_KEY_DOWN:
    case T.SDL_EVENT_KEY_UP: {
      const scancode = dv.getUint32(T.SDL_KEYBOARD_EVENT_SCANCODE, true);
      const key = dv.getUint32(T.SDL_KEYBOARD_EVENT_KEY, true);
      const mod = dv.getUint32(T.SDL_KEYBOARD_EVENT_MOD, true);
      const down = !!dv.getUint8(T.SDL_KEYBOARD_EVENT_DOWN);
      const repeat = !!dv.getUint8(T.SDL_KEYBOARD_EVENT_REPEAT);
      const scName = scancodeName(scancode);
      const keyName = (KEY_NAME_MAP as any)[key] ?? String(key);
      const modNames = modToNames(mod);
      return {
        type,
        scancode,
        key,
        mod,
        down,
        repeat,
        name: eventName(type),
        // Additional readable fields
        scancodeName: scName,
        keyName,
        modNames,
      } as unknown as KeyboardEvent;
    }
    case T.SDL_EVENT_MOUSE_MOTION: {
      const state = dv.getUint32(T.SDL_MOUSE_MOTION_STATE, true);
      const x = readIntOrFloat(dv, T.SDL_MOUSE_MOTION_X);
      const y = readIntOrFloat(dv, T.SDL_MOUSE_MOTION_Y);
      const xrel = readIntOrFloat(dv, T.SDL_MOUSE_MOTION_XREL);
      const yrel = readIntOrFloat(dv, T.SDL_MOUSE_MOTION_YREL);
      return {
        type,
        state,
        x,
        y,
        xrel,
        yrel,
        name: eventName(type),
      } as MouseMotionEvent;
    }
    case T.SDL_EVENT_MOUSE_BUTTON_DOWN:
    case T.SDL_EVENT_MOUSE_BUTTON_UP: {
      const button = dv.getUint8(T.SDL_MOUSE_BUTTON_BUTTON);
      const down = !!dv.getUint8(T.SDL_MOUSE_BUTTON_DOWN);
      const clicks = dv.getUint8(T.SDL_MOUSE_BUTTON_CLICKS);
      const x = readIntOrFloat(dv, T.SDL_MOUSE_BUTTON_X);
      const y = readIntOrFloat(dv, T.SDL_MOUSE_BUTTON_Y);
      const buttonName = button === 1 ? "LEFT" : button === 2 ? "MIDDLE" : button === 3 ? "RIGHT" : `BTN_${button}`;
      return {
        type,
        button,
        down,
        clicks,
        x,
        y,
        name: eventName(type),
        // readable
        buttonName,
      } as unknown as MouseButtonEvent;
    }
    case T.SDL_EVENT_MOUSE_WHEEL: {
      const x = dv.getInt32(T.SDL_MOUSE_WHEEL_X, true);
      const y = dv.getInt32(T.SDL_MOUSE_WHEEL_Y, true);
      const direction = dv.getInt32(T.SDL_MOUSE_WHEEL_DIR, true);
      return { type, x, y, direction, name: eventName(type) } as MouseWheelEvent;
    }
    case T.SDL_EVENT_JOYSTICK_AXIS_MOTION:
    case T.SDL_EVENT_GAMEPAD_AXIS_MOTION: {
      const which = dv.getUint32(T.SDL_JOY_EVENT_WHICH, true);
      const axis = dv.getUint8(T.SDL_JOY_AXIS_EVENT_AXIS);
      const value = dv.getInt16(T.SDL_JOY_AXIS_EVENT_VALUE, true);
      return { type, which, axis, value, name: eventName(type) } as JoyAxisEvent;
    }
    case T.SDL_EVENT_JOYSTICK_BUTTON_DOWN:
    case T.SDL_EVENT_JOYSTICK_BUTTON_UP:
    case T.SDL_EVENT_GAMEPAD_BUTTON_DOWN:
    case T.SDL_EVENT_GAMEPAD_BUTTON_UP: {
      const which = dv.getUint32(T.SDL_JOY_EVENT_WHICH, true);
      const button = dv.getUint8(T.SDL_JOY_BUTTON_EVENT_BUTTON);
      const down = !!dv.getUint8(T.SDL_JOY_BUTTON_EVENT_DOWN);
      return { type, which, button, down, name: eventName(type) } as JoyButtonEvent;
    }
    case T.SDL_EVENT_JOYSTICK_HAT_MOTION: {
      const which = dv.getUint32(T.SDL_JOY_EVENT_WHICH, true);
      const hat = dv.getUint8(T.SDL_JOY_HAT_EVENT_HAT);
      const value = dv.getUint8(T.SDL_JOY_HAT_EVENT_VALUE);
      return { type, which, hat, value, name: eventName(type) } as JoyHatEvent;
    }
    default:
      return { type, name: eventName(type) } as BaseEvent;
  }
}

export function poll(): ParsedEvent | null {
  const buf = new ArrayBuffer(T.SDL_EVENT_SIZE);
  const p = ptr(buf);
  const ok = sdl.SDL_PollEvent(p);
  if (!ok) return null;
  return parseEvent(buf);
}

export function wait(): ParsedEvent | null {
  const buf = new ArrayBuffer(T.SDL_EVENT_SIZE);
  const p = ptr(buf);
  const ok = sdl.SDL_WaitEvent(p);
  if (!ok) return null;
  return parseEvent(buf);
}

export function parse(buf: ArrayBuffer) {
  return parseEvent(buf);
}

export default { poll, wait, parse };
