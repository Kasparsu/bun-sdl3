import sdl from "../../index";

export function count(): number {
  return sdl.SDL_NumJoysticks();
}

export function open(index: number) {
  return sdl.SDL_OpenGamepad(index) as any;
}

export function close(gamepad: any): void {
  sdl.SDL_CloseGamepad(gamepad as any);
}
