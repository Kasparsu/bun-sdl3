import sdl from "../../index";

export function getMouseState(): { x: number; y: number; buttons: number } {
  const px = new Int32Array(1);
  const py = new Int32Array(1);
  const buttons = sdl.SDL_GetMouseState(px.buffer as any, py.buffer as any) as number;
  return { x: px[0] as number, y: py[0] as number, buttons };
}

export function warpMouseInWindow(window: any, x: number, y: number): void {
  sdl.SDL_WarpMouseInWindow(window as any, x, y);
}

export function showCursor(show: boolean): void {
  if (show) sdl.SDL_ShowCursor();
  else sdl.SDL_HideCursor();
}

export function setRelativeMouseMode(enabled: boolean): void {
  sdl.SDL_SetWindowRelativeMouseMode((null as any), enabled);
}
