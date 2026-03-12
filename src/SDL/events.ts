import sdl from "../index";
import { ptr } from "bun:ffi";

import { SDL_EVENT_SIZE } from "../types";
import { parseEvent } from "../events";


export function poll(): ReturnType<typeof parseEvent> | null {
  const buf = new ArrayBuffer(SDL_EVENT_SIZE);
  const p = ptr(buf);
  const ok = sdl.SDL_PollEvent(p);
  if (!ok) return null;
  return parseEvent(buf);
}

export function wait(): ReturnType<typeof parseEvent> | null {
  const buf = new ArrayBuffer(SDL_EVENT_SIZE);
  const p = ptr(buf);
  const ok = sdl.SDL_WaitEvent(p);
  if (!ok) return null;
  return parseEvent(buf);
}

export function parse(buf: ArrayBuffer) {
  return parseEvent(buf);
}

export default { poll, wait, parse };
