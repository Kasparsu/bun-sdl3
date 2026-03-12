import {
  SDL_EVENT_SIZE,
  SDL_EVENT_KEY_DOWN,
  SDL_EVENT_KEY_UP,
  SDL_EVENT_MOUSE_MOTION,
  SDL_EVENT_MOUSE_BUTTON_DOWN,
  SDL_EVENT_MOUSE_BUTTON_UP,
  SDL_EVENT_MOUSE_WHEEL,
  SDL_EVENT_JOYSTICK_AXIS_MOTION,
  SDL_EVENT_JOYSTICK_HAT_MOTION,
  SDL_EVENT_JOYSTICK_BUTTON_DOWN,
  SDL_EVENT_JOYSTICK_BUTTON_UP,
  SDL_EVENT_GAMEPAD_AXIS_MOTION,
  SDL_EVENT_GAMEPAD_BUTTON_DOWN,
  SDL_EVENT_GAMEPAD_BUTTON_UP,
  SDL_JOY_EVENT_WHICH,
  SDL_JOY_AXIS_EVENT_AXIS,
  SDL_JOY_AXIS_EVENT_VALUE,
  SDL_JOY_BUTTON_EVENT_BUTTON,
  SDL_JOY_BUTTON_EVENT_DOWN,
  SDL_JOY_HAT_EVENT_HAT,
  SDL_JOY_HAT_EVENT_VALUE,
  SDL_KEYBOARD_EVENT_SCANCODE,
  SDL_KEYBOARD_EVENT_KEY,
  SDL_KEYBOARD_EVENT_MOD,
  SDL_KEYBOARD_EVENT_DOWN,
  SDL_KEYBOARD_EVENT_REPEAT,
  SDL_MOUSE_MOTION_X,
  SDL_MOUSE_MOTION_Y,
  SDL_MOUSE_MOTION_XREL,
  SDL_MOUSE_MOTION_YREL,
  SDL_MOUSE_MOTION_STATE,
  SDL_MOUSE_BUTTON_BUTTON,
  SDL_MOUSE_BUTTON_DOWN,
  SDL_MOUSE_BUTTON_CLICKS,
  SDL_MOUSE_BUTTON_X,
  SDL_MOUSE_BUTTON_Y,
  SDL_MOUSE_WHEEL_X,
  SDL_MOUSE_WHEEL_Y,
  SDL_MOUSE_WHEEL_DIR,
} from "./types";

// Typed event payloads
export interface BaseEvent {
  type: number;
  timestamp?: number;
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

// Parse an SDL_Event stored in an ArrayBuffer (SDL uses little-endian on x86-64)
export function parseEvent(buf: ArrayBuffer): ParsedEvent {
  const dv = new DataView(buf);
  const type = dv.getUint32(0, true);

  switch (type) {
    case SDL_EVENT_KEY_DOWN:
    case SDL_EVENT_KEY_UP: {
      const scancode = dv.getUint32(SDL_KEYBOARD_EVENT_SCANCODE, true);
      const key = dv.getUint32(SDL_KEYBOARD_EVENT_KEY, true);
      const mod = dv.getUint32(SDL_KEYBOARD_EVENT_MOD, true);
      const down = !!dv.getUint8(SDL_KEYBOARD_EVENT_DOWN);
      const repeat = !!dv.getUint8(SDL_KEYBOARD_EVENT_REPEAT);
      return { type, scancode, key, mod, down, repeat } as KeyboardEvent;
    }
    case SDL_EVENT_MOUSE_MOTION: {
      const state = dv.getUint32(SDL_MOUSE_MOTION_STATE, true);
      const x = dv.getInt32(SDL_MOUSE_MOTION_X, true);
      const y = dv.getInt32(SDL_MOUSE_MOTION_Y, true);
      const xrel = dv.getInt32(SDL_MOUSE_MOTION_XREL, true);
      const yrel = dv.getInt32(SDL_MOUSE_MOTION_YREL, true);
      return { type, state, x, y, xrel, yrel } as MouseMotionEvent;
    }
    case SDL_EVENT_MOUSE_BUTTON_DOWN:
    case SDL_EVENT_MOUSE_BUTTON_UP: {
      const button = dv.getUint8(SDL_MOUSE_BUTTON_BUTTON);
      const down = !!dv.getUint8(SDL_MOUSE_BUTTON_DOWN);
      const clicks = dv.getUint8(SDL_MOUSE_BUTTON_CLICKS);
      const x = dv.getInt32(SDL_MOUSE_BUTTON_X, true);
      const y = dv.getInt32(SDL_MOUSE_BUTTON_Y, true);
      return { type, button, down, clicks, x, y } as MouseButtonEvent;
    }
    case SDL_EVENT_MOUSE_WHEEL: {
      const x = dv.getInt32(SDL_MOUSE_WHEEL_X, true);
      const y = dv.getInt32(SDL_MOUSE_WHEEL_Y, true);
      const direction = dv.getInt32(SDL_MOUSE_WHEEL_DIR, true);
      return { type, x, y, direction } as MouseWheelEvent;
    }
    case SDL_EVENT_JOYSTICK_AXIS_MOTION:
    case SDL_EVENT_GAMEPAD_AXIS_MOTION: {
      const which = dv.getUint32(SDL_JOY_EVENT_WHICH, true);
      const axis = dv.getUint8(SDL_JOY_AXIS_EVENT_AXIS);
      const value = dv.getInt16(SDL_JOY_AXIS_EVENT_VALUE, true);
      return { type, which, axis, value } as JoyAxisEvent;
    }
    case SDL_EVENT_JOYSTICK_BUTTON_DOWN:
    case SDL_EVENT_JOYSTICK_BUTTON_UP:
    case SDL_EVENT_GAMEPAD_BUTTON_DOWN:
    case SDL_EVENT_GAMEPAD_BUTTON_UP: {
      const which = dv.getUint32(SDL_JOY_EVENT_WHICH, true);
      const button = dv.getUint8(SDL_JOY_BUTTON_EVENT_BUTTON);
      const down = !!dv.getUint8(SDL_JOY_BUTTON_EVENT_DOWN);
      return { type, which, button, down } as JoyButtonEvent;
    }
    case SDL_EVENT_JOYSTICK_HAT_MOTION: {
      const which = dv.getUint32(SDL_JOY_EVENT_WHICH, true);
      const hat = dv.getUint8(SDL_JOY_HAT_EVENT_HAT);
      const value = dv.getUint8(SDL_JOY_HAT_EVENT_VALUE);
      return { type, which, hat, value } as JoyHatEvent;
    }
    default:
      return { type } as BaseEvent;
  }
}

export default { parseEvent };
