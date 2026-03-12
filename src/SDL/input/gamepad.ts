import sdl from "../../index";

export function numJoysticks(): number {
  return sdl.SDL_NumJoysticks();
}

export function openGamepad(index: number) {
  return sdl.SDL_OpenGamepad(index) as any;
}

export function closeGamepad(gamepad: any): void {
  sdl.SDL_CloseGamepad(gamepad as any);
}
