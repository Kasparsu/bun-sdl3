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

export function createWithProperties(window: SDLWindow, namePtr: Pointer | null, propsPtr: Pointer | null) {
  return sdl.SDL_CreateRendererWithProperties(window as any, (namePtr ?? null) as any, (propsPtr ?? null) as any) as Pointer as any;
}

export function createSoftware(surface: Pointer) {
  return sdl.SDL_CreateSoftwareRenderer(surface as any) as Pointer as any;
}

export function createTextureWithProperties(renderer: any, format: number, access: number, w: number, h: number, propsPtr: Pointer | null) {
  return sdl.SDL_CreateTextureWithProperties(renderer as any, format, access, w, h, (propsPtr ?? null) as any) as Pointer as any;
}

export function createWindowAndRenderer(w: number, h: number, flags: number | bigint) {
  // returns { status, windowPtr, rendererPtr }
  const winBuf = new ArrayBuffer(8);
  const renBuf = new ArrayBuffer(8);
  const winPtr = ptr(winBuf);
  const renPtr = ptr(renBuf);
  const status = sdl.SDL_CreateWindowAndRenderer(w, h, flags as any, winPtr, renPtr) as number;
  const win = new DataView(winBuf).getBigUint64(0, true);
  const ren = new DataView(renBuf).getBigUint64(0, true);
  return { status, window: win as unknown as Pointer, renderer: ren as unknown as Pointer };
}

export function flush(renderer: any): boolean {
  return Boolean(sdl.SDL_FlushRenderer(renderer as any));
}

export function gdkResume(renderer: any): boolean {
  return Boolean(sdl.SDL_GDKResumeRenderer(renderer as any));
}

export function gdkSuspend(renderer: any): boolean {
  return Boolean(sdl.SDL_GDKSuspendRenderer(renderer as any));
}

export function getNumRenderDrivers(): number {
  return sdl.SDL_GetNumRenderDrivers() as number;
}

export function getRenderDriver(index: number): string {
  return sdl.SDL_GetRenderDriver(index) as unknown as string;
}

export function getRendererForWindow(window: SDLWindow) {
  return sdl.SDL_GetRenderer(window as any) as Pointer as any;
}

export function getRendererFromTexture(texture: Pointer) {
  return sdl.SDL_GetRendererFromTexture(texture as any) as Pointer as any;
}

export function getRenderWindow(renderer: any) {
  return sdl.SDL_GetRenderWindow(renderer as any) as Pointer as any;
}

export function getRenderViewport(renderer: any): { x: number; y: number; w: number; h: number } | null {
  const buf = new ArrayBuffer(16);
  const ptrBuf = ptr(buf);
  const ok = Boolean(sdl.SDL_GetRenderViewport(renderer as any, ptrBuf));
  if (!ok) return null;
  const dv = new DataView(buf);
  return { x: dv.getInt32(0, true), y: dv.getInt32(4, true), w: dv.getInt32(8, true), h: dv.getInt32(12, true) };
}

export function getRenderSafeArea(renderer: any): { x: number; y: number; w: number; h: number } | null {
  const buf = new ArrayBuffer(16);
  const ptrBuf = ptr(buf);
  const ok = Boolean(sdl.SDL_GetRenderSafeArea(renderer as any, ptrBuf));
  if (!ok) return null;
  const dv = new DataView(buf);
  return { x: dv.getInt32(0, true), y: dv.getInt32(4, true), w: dv.getInt32(8, true), h: dv.getInt32(12, true) };
}

export function getRenderOutputSize(renderer: any): { w: number; h: number } | null {
  const buf = new ArrayBuffer(8);
  const p0 = ptr(new Uint8Array(buf, 0));
  const p1 = ptr(new Uint8Array(buf, 4));
  const ok = Boolean(sdl.SDL_GetRenderOutputSize(renderer as any, p0, p1));
  if (!ok) return null;
  const dv = new DataView(buf);
  return { w: dv.getInt32(0, true), h: dv.getInt32(4, true) };
}

export function getRenderScale(renderer: any): { x: number; y: number } | null {
  const buf = new ArrayBuffer(8);
  const ptrBuf = ptr(buf);
  const ok = Boolean(sdl.SDL_GetRenderScale(renderer as any, ptrBuf));
  if (!ok) return null;
  const dv = new DataView(buf);
  return { x: dv.getFloat32(0, true), y: dv.getFloat32(4, true) };
}

export function getRenderMetalCommandEncoder(renderer: any) {
  return sdl.SDL_GetRenderMetalCommandEncoder(renderer as any) as Pointer as any;
}

export function getRenderMetalLayer(renderer: any) {
  return sdl.SDL_GetRenderMetalLayer(renderer as any) as Pointer as any;
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

export function renderDebugText(renderer: any, x: number, y: number, text: string): boolean {
  return Boolean((sdl as any).SDL_RenderDebugText(renderer as any, x, y, Buffer.from(text + "\0")));
}

export function renderReadPixels(renderer: any, rectPtr: Pointer | null) {
  const surf = sdl.SDL_RenderReadPixels(renderer as any, (rectPtr ?? null) as any);
  if (!surf) return null;
  return surf as Pointer as any;
}

export function addVulkanRenderSemaphores(renderer: any, waitSemaphoresPtr: Pointer, signalSemaphoresPtr: Pointer): boolean {
  return Boolean(sdl.SDL_AddVulkanRenderSemaphores(renderer as any, waitSemaphoresPtr as any, signalSemaphoresPtr as any));
}

export function getDefaultTextureScaleMode(): number {
  return sdl.SDL_GetDefaultTextureScaleMode() as number;
}

export function getRenderColorScale(renderer: any): { r: number; g: number; b: number; a: number } | null {
  const buf = new ArrayBuffer(16);
  const p0 = ptr(new Uint8Array(buf, 0));
  const p1 = ptr(new Uint8Array(buf, 4));
  const p2 = ptr(new Uint8Array(buf, 8));
  const p3 = ptr(new Uint8Array(buf, 12));
  const ok = Boolean(sdl.SDL_GetRenderColorScale(renderer as any, p0, p1, p2, p3));
  if (!ok) return null;
  const dv = new DataView(buf);
  return { r: dv.getFloat32(0, true), g: dv.getFloat32(4, true), b: dv.getFloat32(8, true), a: dv.getFloat32(12, true) };
}

export function getRenderDrawColorFloat(renderer: any): { r: number; g: number; b: number; a: number } | null {
  const buf = new ArrayBuffer(16);
  const p0 = ptr(new Uint8Array(buf, 0));
  const p1 = ptr(new Uint8Array(buf, 4));
  const p2 = ptr(new Uint8Array(buf, 8));
  const p3 = ptr(new Uint8Array(buf, 12));
  const ok = Boolean(sdl.SDL_GetRenderDrawColorFloat(renderer as any, p0, p1, p2, p3));
  if (!ok) return null;
  const dv = new DataView(buf);
  return { r: dv.getFloat32(0, true), g: dv.getFloat32(4, true), b: dv.getFloat32(8, true), a: dv.getFloat32(12, true) };
}

export function getRendererProperties(renderer: any) {
  return sdl.SDL_GetRendererProperties(renderer as any) as Pointer as any;
}

export function renderCoordinatesToWindow(renderer: any, x: number, y: number) {
  const buf = new ArrayBuffer(8);
  const p = ptr(buf);
  const ok = Boolean(sdl.SDL_RenderCoordinatesToWindow(renderer as any, x, y, p, p));
  if (!ok) return null;
  const dv = new DataView(buf);
  return { window_x: dv.getFloat32(0, true), window_y: dv.getFloat32(4, true) };
}

// Texture getters
export function getTextureAlphaMod(texture: Pointer): number | null {
  const buf = new ArrayBuffer(4);
  const p = ptr(buf);
  const ok = Boolean(sdl.SDL_GetTextureAlphaMod(texture as any, p));
  if (!ok) return null;
  return new DataView(buf).getUint8(0);
}

export function getTextureAlphaModFloat(texture: Pointer): number | null {
  const buf = new ArrayBuffer(4);
  const p = ptr(buf);
  const ok = Boolean(sdl.SDL_GetTextureAlphaModFloat(texture as any, p));
  if (!ok) return null;
  return new DataView(buf).getFloat32(0, true);
}

export function getTextureBlendMode(texture: Pointer): number | null {
  const buf = new ArrayBuffer(4);
  const p = ptr(buf);
  const ok = Boolean(sdl.SDL_GetTextureBlendMode(texture as any, p));
  if (!ok) return null;
  return new DataView(buf).getUint32(0, true);
}

export function getTextureColorMod(texture: Pointer): { r: number; g: number; b: number } | null {
  const buf = new ArrayBuffer(3);
  const p = ptr(buf);
  const ok = Boolean(sdl.SDL_GetTextureColorMod(texture as any, p, p, p));
  if (!ok) return null;
  const dv = new DataView(buf);
  return { r: dv.getUint8(0), g: dv.getUint8(1), b: dv.getUint8(2) };
}

export function getTextureColorModFloat(texture: Pointer): { r: number; g: number; b: number } | null {
  const buf = new ArrayBuffer(12);
  const p = ptr(buf);
  const ok = Boolean(sdl.SDL_GetTextureColorModFloat(texture as any, p, p, p));
  if (!ok) return null;
  const dv = new DataView(buf);
  return { r: dv.getFloat32(0, true), g: dv.getFloat32(4, true), b: dv.getFloat32(8, true) };
}

export function getTexturePalette(texture: Pointer) {
  return sdl.SDL_GetTexturePalette(texture as any) as Pointer as any;
}

export function getTextureProperties(texture: Pointer) {
  return sdl.SDL_GetTextureProperties(texture as any) as Pointer as any;
}

export function getTextureScaleMode(texture: Pointer): number {
  return sdl.SDL_GetTextureScaleMode(texture as any) as number;
}

export function lockTexture(texture: Pointer, rectPtr: Pointer | null) {
  const pixelsBuf = new ArrayBuffer(8);
  const pitchBuf = new ArrayBuffer(4);
  const pixelsPtr = ptr(pixelsBuf);
  const pitchPtr = ptr(pitchBuf);
  const ok = Boolean(sdl.SDL_LockTexture(texture as any, (rectPtr ?? null) as any, pixelsPtr, pitchPtr));
  if (!ok) return null;
  const dv = new DataView(pitchBuf);
  return { pixels: new DataView(pixelsBuf).getBigUint64(0, true) as unknown as Pointer, pitch: dv.getInt32(0, true) };
}

export function lockTextureToSurface(texture: Pointer) {
  return sdl.SDL_LockTextureToSurface(texture as any) as Pointer as any;
}

export function renderFillRects(renderer: any, rectsPtr: Pointer, count: number): boolean {
  return Boolean(sdl.SDL_RenderFillRects(renderer as any, rectsPtr, count));
}

export function renderPoints(renderer: any, pointsPtr: Pointer, count: number): boolean {
  return Boolean(sdl.SDL_RenderPoints(renderer as any, pointsPtr, count));
}

export function renderRects(renderer: any, rectsPtr: Pointer, count: number): boolean {
  return Boolean(sdl.SDL_RenderRects(renderer as any, rectsPtr, count));
}

export function renderGeometryRaw(renderer: any, tex: any, vertsPtr: Pointer, numVerts: number, verticesStride: number, indicesPtr: Pointer, numIndices: number, indexType: number): boolean {
  return Boolean(sdl.SDL_RenderGeometryRaw(renderer as any, tex as any, vertsPtr, verticesStride, indicesPtr, numIndices, indexType));
}

export function renderTexture9Grid(renderer: any, texture: any, srcPtr: Pointer, dstPtr: Pointer, gridPtr: Pointer): boolean {
  return Boolean(sdl.SDL_RenderTexture9Grid(renderer as any, texture as any, srcPtr, dstPtr, gridPtr));
}

export function renderTexture9GridTiled(renderer: any, texture: any, srcPtr: Pointer, dstPtr: Pointer, gridPtr: Pointer): boolean {
  return Boolean(sdl.SDL_RenderTexture9GridTiled(renderer as any, texture as any, srcPtr, dstPtr, gridPtr));
}

export function renderTextureAffine(renderer: any, texture: any, srcPtr: Pointer, dstPtr: Pointer, matrix: number): boolean {
  return Boolean(sdl.SDL_RenderTextureAffine(renderer as any, texture as any, srcPtr, dstPtr, matrix));
}

export function renderTextureTiled(renderer: any, texture: any, srcPtr: Pointer, dstPtr: Pointer, tx: number, ty: number): boolean {
  return Boolean(sdl.SDL_RenderTextureTiled(renderer as any, texture as any, srcPtr, dstPtr, tx, ty));
}

export function renderViewportSet(renderer: any, rectPtr: Pointer): boolean {
  return Boolean(sdl.SDL_RenderViewportSet(renderer as any, rectPtr));
}

export function setDefaultTextureScaleMode(mode: number): boolean {
  return Boolean(sdl.SDL_SetDefaultTextureScaleMode(mode));
}

export function setRenderColorScale(renderer: any, r: number, g: number, b: number, a: number): boolean {
  return Boolean(sdl.SDL_SetRenderColorScale(renderer as any, r, g, b, a));
}

export function setRenderDrawColorFloat(renderer: any, r: number, g: number, b: number, a: number): boolean {
  return Boolean(sdl.SDL_SetRenderDrawColorFloat(renderer as any, r, g, b, a));
}

export function setRenderScale(renderer: any, x: number, y: number): boolean {
  return Boolean(sdl.SDL_SetRenderScale(renderer as any, x, y));
}

export function setTextureAlphaMod(texture: Pointer, alpha: number): boolean {
  return Boolean(sdl.SDL_SetTextureAlphaMod(texture as any, alpha));
}

export function setTextureColorMod(texture: Pointer, r: number, g: number, b: number): boolean {
  return Boolean(sdl.SDL_SetTextureColorMod(texture as any, r, g, b));
}

export function setTexturePalette(texture: Pointer, palettePtr: Pointer): boolean {
  return Boolean(sdl.SDL_SetTexturePalette(texture as any, palettePtr as any));
}

export function unlockTexture(texture: Pointer): boolean {
  return Boolean(sdl.SDL_UnlockTexture(texture as any));
}

export function updateNVTexture(texture: Pointer, rectPtr: Pointer, pixelsPtr: Pointer, pitch: number): boolean {
  return Boolean(sdl.SDL_UpdateNVTexture(texture as any, rectPtr as any, pixelsPtr as any, pitch));
}

export function updateYUVTexture(texture: Pointer, rectPtr: Pointer, yPlane: Pointer, yPitch: number, uPlane: Pointer, uPitch: number, vPlane: Pointer, vPitch: number): boolean {
  return Boolean(sdl.SDL_UpdateYUVTexture(texture as any, rectPtr as any, yPlane as any, yPitch, uPlane as any, uPitch, vPlane as any, vPitch));
}
