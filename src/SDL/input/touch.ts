import sdl from "../../index";

export function numTouchDevices(): number {
  return sdl.SDL_GetNumTouchDevices();
}

export function getTouchDevice(index: number) {
  return sdl.SDL_GetTouchDevice(index) as any;
}
