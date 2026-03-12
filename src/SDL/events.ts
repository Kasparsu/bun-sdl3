import sdl from "../index";
import { ptr } from "bun:ffi";
import { SDL_EVENT_SIZE } from "../types";
import { parseEvent } from "../events";

export function poll(): { handled: boolean; buffer: ArrayBuffer } {
  const buf = new ArrayBuffer(SDL_EVENT_SIZE);
  const p = ptr(buf);
  const ok = sdl.SDL_PollEvent(p);
  return { handled: Boolean(ok), buffer: buf };
}

export function wait(): { handled: boolean; buffer: ArrayBuffer } {
  const buf = new ArrayBuffer(SDL_EVENT_SIZE);
  const p = ptr(buf);
  const ok = sdl.SDL_WaitEvent(p);
  return { handled: Boolean(ok), buffer: buf };
}

export function parse(buf: ArrayBuffer) {
  return parseEvent(buf);
}

export default { poll, wait, parse };
