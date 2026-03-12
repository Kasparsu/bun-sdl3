import sdl from "../index";

export function get(): string {
  return sdl.SDL_GetError() as unknown as string;
}

export default { get };
