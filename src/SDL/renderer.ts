import sdl from "../index";
import { ptr } from "bun:ffi";
import type { Pointer, CString } from "bun:ffi";
import type { SDLWindow } from "../types";
import * as T from "../types";

export const BLENDMODE = {
  NONE: T.SDL_BLENDMODE_NONE,
  BLEND: T.SDL_BLENDMODE_BLEND,
  BLEND_PREMULTIPLIED: T.SDL_BLENDMODE_BLEND_PREMULTIPLIED,
  ADD: T.SDL_BLENDMODE_ADD,
  MOD: T.SDL_BLENDMODE_MOD,
  MUL: T.SDL_BLENDMODE_MUL,
} as const;

export const PIXELFORMAT = {
  ARGB8888: T.SDL_PIXELFORMAT_ARGB8888,
  RGBA8888: T.SDL_PIXELFORMAT_RGBA8888,
  ABGR8888: T.SDL_PIXELFORMAT_ABGR8888,
  BGRA8888: T.SDL_PIXELFORMAT_BGRA8888,
} as const;

export const GPU_SHADERFORMAT = {
  INVALID: T.SDL_GPU_SHADERFORMAT_INVALID,
  PRIVATE: T.SDL_GPU_SHADERFORMAT_PRIVATE,
  SPIRV: T.SDL_GPU_SHADERFORMAT_SPIRV,
  DXBC: T.SDL_GPU_SHADERFORMAT_DXBC,
  DXIL: T.SDL_GPU_SHADERFORMAT_DXIL,
  MSL: T.SDL_GPU_SHADERFORMAT_MSL,
  METALLIB: T.SDL_GPU_SHADERFORMAT_METALLIB,
} as const;

export const RENDERER_PRESENTATION = {
  DISABLED: T.SDL_LOGICAL_PRESENTATION_DISABLED,
  STRETCH: T.SDL_LOGICAL_PRESENTATION_STRETCH,
  LETTERBOX: T.SDL_LOGICAL_PRESENTATION_LETTERBOX,
  OVERSCAN: T.SDL_LOGICAL_PRESENTATION_OVERSCAN,
  INTEGER_SCALE: T.SDL_LOGICAL_PRESENTATION_INTEGER_SCALE,
} as const;

export function getSurface(window: SDLWindow) {
  return sdl.SDL_GetWindowSurface(window as any) as Pointer as any;
}

export function updateSurface(window: SDLWindow): boolean {
  return Boolean(sdl.SDL_UpdateWindowSurface(window as any));
}

export function savePNG(surface: any, file: string): boolean {
  return Boolean(sdl.SDL_SavePNG(surface as any, Buffer.from(file + "\0") as unknown as CString));
}

export function saveBMP(surface: any, file: string): boolean {
  return Boolean(sdl.SDL_SaveBMP(surface as any, Buffer.from(file + "\0") as unknown as CString));
}

export function destroySurface(surface: any): void {
  sdl.SDL_DestroySurface(surface as any);
}

export function create(window: SDLWindow, namePtr?: Pointer) {
  return sdl.SDL_CreateRenderer(window as any, (namePtr ?? null) as any) as Pointer as any;
}

export function destroy(renderer: any): void {
  sdl.SDL_DestroyRenderer(renderer as any);
}

export function setDrawColor(renderer: any, r: number, g: number, b: number, a: number): boolean {
  return Boolean(sdl.SDL_SetRenderDrawColor(renderer as any, r, g, b, a));
}

export function clear(renderer: any): boolean {
  return Boolean(sdl.SDL_RenderClear(renderer as any));
}

export function present(renderer: any): boolean {
  return Boolean(sdl.SDL_RenderPresent(renderer as any));
}
