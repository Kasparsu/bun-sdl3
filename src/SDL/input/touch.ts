import sdl from "../../index";

export function count(): number {
  return sdl.SDL_GetNumTouchDevices();
}

export function get(index: number) {
  return sdl.SDL_GetTouchDevice(index) as any;
}
