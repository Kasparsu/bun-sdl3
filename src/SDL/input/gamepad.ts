import sdl from "../../index";
import * as T from "../../types";

export function count(): number {
  return sdl.SDL_NumJoysticks();
}

export function open(index: number) {
  return sdl.SDL_OpenGamepad(index) as any;
}

export function close(gamepad: any): void {
  sdl.SDL_CloseGamepad(gamepad as any);
}

export const GAMEPAD_AXIS = T.SDLGamepadAxis;
// Provide explicit mapping for editor autocomplete
export const GAMEPAD_BUTTON = {
  SOUTH: T.SDL_GAMEPAD_BUTTON_SOUTH,
  EAST: T.SDL_GAMEPAD_BUTTON_EAST,
  WEST: T.SDL_GAMEPAD_BUTTON_WEST,
  NORTH: T.SDL_GAMEPAD_BUTTON_NORTH,
  BACK: T.SDL_GAMEPAD_BUTTON_BACK,
  GUIDE: T.SDL_GAMEPAD_BUTTON_GUIDE,
  START: T.SDL_GAMEPAD_BUTTON_START,
  LEFT_STICK: T.SDL_GAMEPAD_BUTTON_LEFT_STICK,
  RIGHT_STICK: T.SDL_GAMEPAD_BUTTON_RIGHT_STICK,
  LEFT_SHOULDER: T.SDL_GAMEPAD_BUTTON_LEFT_SHOULDER,
  RIGHT_SHOULDER: T.SDL_GAMEPAD_BUTTON_RIGHT_SHOULDER,
  DPAD_UP: T.SDL_GAMEPAD_BUTTON_DPAD_UP,
  DPAD_DOWN: T.SDL_GAMEPAD_BUTTON_DPAD_DOWN,
  DPAD_LEFT: T.SDL_GAMEPAD_BUTTON_DPAD_LEFT,
  DPAD_RIGHT: T.SDL_GAMEPAD_BUTTON_DPAD_RIGHT,
} as const;
