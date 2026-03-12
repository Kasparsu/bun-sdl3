import sdl from "../../index";
import { pick } from "../pick";
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

export const GAMEPAD_BUTTON = pick("SDL_GAMEPAD_BUTTON_");
export const GAMEPAD_AXIS = T.SDLGamepadAxis;
