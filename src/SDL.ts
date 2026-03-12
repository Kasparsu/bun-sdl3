// Lightweight TypeScript wrapper around selected pure SDL functions
import sdl from "./index";
import { ptr } from "bun:ffi";
import type { Pointer, CString } from "bun:ffi";
import * as Window from "./SDL/window";
import * as Display from "./SDL/display";
import * as Input from "./SDL/input";
import * as Renderer from "./SDL/renderer";
import * as Events from "./SDL/events";
import * as Clipboard from "./SDL/clipboard";
import * as Errors from "./SDL/errors";
import * as T from "./types";
export class SDL {
  static init(flags: number): boolean {
    return Boolean(sdl.SDL_Init(flags));
  }

  static quit(): void {
    sdl.SDL_Quit();
  }

  // Attached namespaces (modules) for convenience
  static Window = Window;
  static Display = Display;
  static Input = Input;
  static Renderer = Renderer;
  static Events = Events;
  static Clipboard = Clipboard;
  static Errors = Errors;

  /**
   * SDL Init flags mapped without the `SDL_INIT_` prefix.
   *
   * Use `SDL.INIT.<NAME>` for autocompletion, e.g. `SDL.INIT.VIDEO`.
   */
  static INIT = {
    VIDEO: T.SDL_INIT_VIDEO,
    AUDIO: T.SDL_INIT_AUDIO,
    JOYSTICK: T.SDL_INIT_JOYSTICK,
    HAPTIC: T.SDL_INIT_HAPTIC,
    GAMEPAD: T.SDL_INIT_GAMEPAD,
    EVENTS: T.SDL_INIT_EVENTS,
    SENSOR: T.SDL_INIT_SENSOR,
    CAMERA: T.SDL_INIT_CAMERA,
  } as const;

  // core helpers remain on SDL

  // Misc
  static delay(ms: number): void {
    sdl.SDL_Delay(ms);
  }
}

export default SDL;