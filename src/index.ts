// MIT License — see LICENSE

// SDL3 FFI bindings via bun:ffi

import { dlopen, FFIType, ptr, toArrayBuffer } from "bun:ffi";
import type { CString, Pointer } from "bun:ffi";
import { libPath } from "./lib-path";

type SDLAPI = {
  // basic lifecycle
  SDL_Init(flags: number): boolean;
  SDL_Quit(): void;
  SDL_GetVersion(): number;
  SDL_GetError(): CString;

  // window
  SDL_CreateWindow(title: CString, w: number, h: number, flags: number | bigint): Pointer;
  SDL_DestroyWindow(window: Pointer): void;
  SDL_SetWindowTitle(window: Pointer, title: CString): boolean;
  SDL_GetWindowTitle(window: Pointer): CString;
  SDL_SetWindowSize(window: Pointer, w: number, h: number): boolean;
  SDL_GetWindowSize(window: Pointer, wPtr: Pointer, hPtr: Pointer): boolean;
  SDL_SetWindowPosition(window: Pointer, x: number, y: number): boolean;
  SDL_GetWindowPosition(window: Pointer, xPtr: Pointer, yPtr: Pointer): boolean;
  SDL_SetWindowFullscreen(window: Pointer, fullscreen: boolean): boolean;
  SDL_GetWindowFlags(window: Pointer): number;
  SDL_ShowWindow(window: Pointer): boolean;
  SDL_HideWindow(window: Pointer): boolean;
  SDL_MaximizeWindow(window: Pointer): boolean;
  SDL_MinimizeWindow(window: Pointer): boolean;
  SDL_RestoreWindow(window: Pointer): boolean;
  SDL_SetWindowMinimumSize(window: Pointer, min_w: number, min_h: number): boolean;
  SDL_GetWindowMinimumSize(window: Pointer, wPtr: Pointer, hPtr: Pointer): boolean;
  SDL_GetWindowDisplayScale(window: Pointer): number;
  SDL_GetDisplays(countPtr: Pointer): Pointer;
  SDL_GetPrimaryDisplay(): number;
  SDL_GetDisplayBounds(displayID: number, rectPtr: Pointer): boolean;
  SDL_GetDisplayName(displayID: number): CString;
  SDL_GetFullscreenDisplayModes(displayID: number, countPtr: Pointer): Pointer;
  SDL_GetDisplayContentScale(displayID: number): number;
  SDL_GetWindowPixelDensity(window: Pointer): number;
  SDL_SetWindowIcon(window: Pointer, icon: Pointer): boolean;
  SDL_FlashWindow(window: Pointer, operation: number): boolean;
  SDL_ShowSimpleMessageBox(flags: number, title: CString, message: CString, window: Pointer): boolean;
  SDL_CreatePopupWindow(parent: Pointer, offset_x: number, offset_y: number, w: number, h: number, flags: number | bigint): Pointer;
  SDL_CreateWindowWithProperties(props: Pointer): Pointer;
  SDL_DestroyWindowSurface(window: Pointer): void;
  // events
  SDL_PollEvent(eventPtr: Pointer): boolean;
  SDL_WaitEvent(eventPtr: Pointer): boolean;

  // surface
  SDL_GetWindowSurface(window: Pointer): Pointer;
  SDL_UpdateWindowSurface(window: Pointer): boolean;
  SDL_SavePNG(surface: Pointer, file: CString): boolean;
  SDL_SaveBMP(surface: Pointer, file: CString): boolean;
  SDL_DuplicateSurface(surface: Pointer): Pointer;
  SDL_DestroySurface(surface: Pointer): void;
  SDL_LockSurface(surface: Pointer): boolean;
  SDL_UnlockSurface(surface: Pointer): void;

  // renderer / textures
  SDL_EGL_GetCurrentConfig(): Pointer;
  SDL_EGL_GetCurrentDisplay(): Pointer;
  SDL_EGL_GetProcAddress(name: CString): Pointer;
  SDL_EGL_GetWindowSurface(window: Pointer): Pointer;
  SDL_EGL_SetAttributeCallbacks(callbacks: Pointer): void;
  SDL_GetClosestFullscreenDisplayMode(displayID: number, modePtr: Pointer): Pointer;
  SDL_GetCurrentDisplayMode(displayID: number, modePtr: Pointer): Pointer;
  SDL_GetCurrentDisplayOrientation(displayID: number): number;
  SDL_GetCurrentVideoDriver(): CString;
  SDL_GetDesktopDisplayMode(displayID: number, modePtr: Pointer): Pointer;
  SDL_GetDisplayForPoint(x: number, y: number): number;
  SDL_GetDisplayForRect(rectPtr: Pointer): number;
  SDL_GetDisplayForWindow(window: Pointer): number;
    SDL_RaiseWindow(window: Pointer): boolean;
  SDL_GetDisplayProperties(displayID: number): Pointer;
  SDL_GetDisplayUsableBounds(displayID: number, rectPtr: Pointer): boolean;
  SDL_GetGrabbedWindow(): Pointer;
  SDL_GetNaturalDisplayOrientation(displayID: number): number;
  SDL_GetNumVideoDrivers(): number;
  SDL_GetSystemTheme(): number;
  SDL_GetVideoDriver(index: number): CString;
  SDL_GetWindowAspectRatio(window: Pointer, wPtr: Pointer, hPtr: Pointer): boolean;
  SDL_GetWindowBordersSize(window: Pointer, top: Pointer, left: Pointer, bottom: Pointer, right: Pointer): boolean;
  SDL_GetWindowFromID(id: number): Pointer;
  SDL_GetWindowFullscreenMode(window: Pointer): number;
  SDL_GetWindowICCProfile(window: Pointer): Pointer;
  SDL_GetWindowID(window: Pointer): number;
  SDL_GetWindowKeyboardGrab(window: Pointer): boolean;
  SDL_GetWindowMaximumSize(window: Pointer, wPtr: Pointer, hPtr: Pointer): boolean;
  SDL_GetWindowMouseRect(window: Pointer, rectPtr: Pointer): boolean;
  SDL_GetWindowOpacity(window: Pointer): number;
  SDL_GetWindowParent(window: Pointer): Pointer;
  SDL_GetWindowPixelFormat(window: Pointer): number;
  SDL_GetWindowProgressState(window: Pointer): number;
  SDL_GetWindowProgressValue(window: Pointer, currentPtr: Pointer, totalPtr: Pointer): boolean;
  SDL_GetWindowProperties(window: Pointer): Pointer;
  SDL_GetWindows(countPtr: Pointer): Pointer;
  SDL_GetWindowSafeArea(window: Pointer, rectPtr: Pointer): boolean;
  SDL_GetWindowSizeInPixels(window: Pointer, wPtr: Pointer, hPtr: Pointer): boolean;
  SDL_GetWindowSurfaceVSync(window: Pointer): boolean;
  SDL_GL_CreateContext(window: Pointer): Pointer;
  SDL_GL_DestroyContext(ctx: Pointer): void;
  SDL_GL_ExtensionSupported(name: CString): boolean;
  SDL_GL_GetAttribute(attr: number, valuePtr: Pointer): boolean;
  SDL_GL_GetCurrentContext(): Pointer;
  SDL_GL_GetCurrentWindow(): Pointer;
  SDL_GL_GetProcAddress(name: CString): Pointer;
  SDL_GL_GetSwapInterval(): number;
  SDL_GL_LoadLibrary(path: CString): boolean;
  SDL_GL_MakeCurrent(window: Pointer, ctx: Pointer): boolean;
  SDL_GL_ResetAttributes(): void;
  SDL_GL_SetAttribute(attr: number, value: number): boolean;
  SDL_GL_SetSwapInterval(interval: number): boolean;
  SDL_GL_SwapWindow(window: Pointer): void;
  SDL_GL_UnloadLibrary(): void;
  SDL_SetWindowAlwaysOnTop(window: Pointer, onTop: boolean): boolean;
  SDL_SetWindowAspectRatio(window: Pointer, wPtr: Pointer, hPtr: Pointer): boolean;
  SDL_SetWindowBordered(window: Pointer, bordered: boolean): boolean;
  SDL_SetWindowFillDocument(window: Pointer, fill: boolean): boolean;
  SDL_SetWindowFocusable(window: Pointer, focusable: boolean): boolean;
  SDL_SetWindowFullscreenMode(window: Pointer, mode: number): boolean;
  SDL_SetWindowHitTest(window: Pointer, callbackPtr: Pointer): boolean;
  SDL_SetWindowKeyboardGrab(window: Pointer, grabbed: boolean): boolean;
  SDL_SetWindowMaximumSize(window: Pointer, max_w: number, max_h: number): boolean;
  SDL_SetWindowMinimumSize(window: Pointer, min_w: number, min_h: number): boolean;
  SDL_SetWindowModal(window: Pointer, modal: boolean): boolean;
  SDL_SetWindowMouseGrab(window: Pointer, grabbed: boolean): boolean;
  SDL_SetWindowMouseRect(window: Pointer, rectPtr: Pointer): boolean;
  SDL_SetWindowOpacity(window: Pointer, opacity: number): boolean;
  SDL_SetWindowParent(window: Pointer, parent: Pointer): boolean;
  SDL_SetWindowPosition(window: Pointer, x: number, y: number): boolean;
  SDL_SetWindowProgressState(window: Pointer, state: number): boolean;
  SDL_SetWindowProgressValue(window: Pointer, current: number, total: number): boolean;
  SDL_SetWindowResizable(window: Pointer, resizable: boolean): boolean;
  SDL_SetWindowShape(window: Pointer, shapePtr: Pointer): boolean;
  SDL_SetWindowSize(window: Pointer, w: number, h: number): boolean;
  SDL_SetWindowSurfaceVSync(window: Pointer, vsync: boolean): boolean;
  SDL_ShowWindowSystemMenu(window: Pointer, x: number, y: number): boolean;
  SDL_SyncWindow(window: Pointer): boolean;
  SDL_UpdateWindowSurfaceRects(window: Pointer, rectsPtr: Pointer, count: number): boolean;
  SDL_WindowHasSurface(window: Pointer): boolean;
  SDL_CreateRenderer(window: Pointer, name: Pointer): Pointer;
  SDL_DestroyRenderer(renderer: Pointer): void;
  SDL_SetRenderDrawColor(renderer: Pointer, r: number, g: number, b: number, a: number): boolean;
  SDL_GetRenderDrawColor(renderer: Pointer, rPtr: Pointer, gPtr: Pointer, bPtr: Pointer, aPtr: Pointer): boolean;
  SDL_RenderClear(renderer: Pointer): boolean;
  SDL_RenderPresent(renderer: Pointer): boolean;
  SDL_RenderPoint(renderer: Pointer, x: number, y: number): boolean;
  SDL_RenderLine(renderer: Pointer, x1: number, y1: number, x2: number, y2: number): boolean;
  SDL_RenderLines(renderer: Pointer, pointsPtr: Pointer, count: number): boolean;
  SDL_RenderRect(renderer: Pointer, rectPtr: Pointer): boolean;
  SDL_RenderFillRect(renderer: Pointer, rectPtr: Pointer): boolean;
  SDL_RenderGeometry(renderer: Pointer, texture: Pointer, verticesPtr: Pointer, num_vertices: number, indicesPtr: Pointer, num_indices: number): boolean;
  SDL_SetRenderDrawBlendMode(renderer: Pointer, blendMode: number): boolean;
  SDL_RenderDebugText(renderer: Pointer, x: number, y: number, str: CString): boolean;
  SDL_RenderReadPixels(renderer: Pointer, rectPtr: Pointer): Pointer;
  SDL_CreateRendererWithProperties(window: Pointer, name: Pointer, propsPtr: Pointer): Pointer;
  SDL_CreateSoftwareRenderer(surface: Pointer): Pointer;
  SDL_CreateTextureWithProperties(renderer: Pointer, format: number, access: number, w: number, h: number, propsPtr: Pointer): Pointer;
  SDL_CreateWindowAndRenderer(w: number, h: number, flags: number | bigint, windowPtr: Pointer, rendererPtr: Pointer): number;
  SDL_FlushRenderer(renderer: Pointer): boolean;
  SDL_GDKResumeRenderer(renderer: Pointer): boolean;
  SDL_GDKSuspendRenderer(renderer: Pointer): boolean;
  SDL_GetNumRenderDrivers(): number;
  SDL_GetRenderDriver(index: number): CString;
  SDL_GetRenderer(window: Pointer): Pointer;
  SDL_GetRendererFromTexture(texture: Pointer): Pointer;
  SDL_GetRenderWindow(renderer: Pointer): Pointer;
  SDL_GetRenderViewport(renderer: Pointer, rectPtr: Pointer): boolean;
  SDL_GetRenderSafeArea(renderer: Pointer, rectPtr: Pointer): boolean;
  SDL_GetRenderScale(renderer: Pointer, scalePtr: Pointer): boolean;
  SDL_GetRenderMetalCommandEncoder(renderer: Pointer): Pointer;
  SDL_GetRenderMetalLayer(renderer: Pointer): Pointer;

  // keyboard
  SDL_GetKeyboardState(numKeysPtr: Pointer): Pointer;
  SDL_GetKeyName(key: number): CString;
  SDL_GetKeyFromScancode(scancode: number, modstate: number, key_event: boolean): number;

  // mouse
  SDL_GetMouseState(xPtr: Pointer, yPtr: Pointer): number;
  SDL_WarpMouseInWindow(window: Pointer, x: number, y: number): void;
  SDL_ShowCursor(): boolean;
  SDL_HideCursor(): boolean;
  SDL_CursorVisible(): boolean;
  SDL_SetWindowMouseGrab(window: Pointer, grabbed: boolean): boolean;
  SDL_GetWindowMouseGrab(window: Pointer): boolean;
  SDL_SetWindowRelativeMouseMode(window: Pointer, enabled: boolean): boolean;
  SDL_GetWindowRelativeMouseMode(window: Pointer): boolean;

  // cursors
  SDL_CreateSystemCursor(id: number): Pointer;
  SDL_CreateColorCursor(surface: Pointer, hot_x: number, hot_y: number): Pointer;
  SDL_SetCursor(cursor: Pointer): boolean;
  SDL_GetCursor(): Pointer;
  SDL_DestroyCursor(cursor: Pointer): void;
  SDL_CreateSurfaceFrom(width: number, height: number, format: number, pixels: Pointer, pitch: number): Pointer;

  // textures
  SDL_CreateTextureFromSurface(renderer: Pointer, surface: Pointer): Pointer;
  SDL_DestroyTexture(texture: Pointer): void;
  SDL_RenderTexture(renderer: Pointer, texture: Pointer, srcrect: Pointer, dstrect: Pointer): boolean;
  SDL_RenderTextureRotated(renderer: Pointer, texture: Pointer, srcrect: Pointer, dstrect: Pointer, angle: number, centerPtr: Pointer, flip: number): boolean;
  SDL_GetTextureSize(texture: Pointer, wPtr: Pointer, hPtr: Pointer): boolean;
  SDL_GetTextureAlphaMod(texture: Pointer, alphaPtr: Pointer): boolean;
  SDL_GetTextureAlphaModFloat(texture: Pointer, alphaPtr: Pointer): boolean;
  SDL_GetTextureBlendMode(texture: Pointer, blendModePtr: Pointer): boolean;
  SDL_GetTextureColorMod(texture: Pointer, rPtr: Pointer, gPtr: Pointer, bPtr: Pointer): boolean;
  SDL_GetTextureColorModFloat(texture: Pointer, rPtr: Pointer, gPtr: Pointer, bPtr: Pointer): boolean;
  SDL_GetTexturePalette(texture: Pointer): Pointer;
  SDL_GetTextureProperties(texture: Pointer): Pointer;
  SDL_GetTextureScaleMode(texture: Pointer): number;
  SDL_LockTexture(texture: Pointer, rectPtr: Pointer, pixelsPtr: Pointer, pitchPtr: Pointer): boolean;
  SDL_LockTextureToSurface(texture: Pointer): Pointer;
  SDL_SetTextureBlendMode(texture: Pointer, blendMode: number): boolean;
  SDL_SetTextureAlphaModFloat(texture: Pointer, alpha: number): boolean;
  SDL_SetTextureColorModFloat(texture: Pointer, r: number, g: number, b: number): boolean;
  SDL_SetTextureScaleMode(texture: Pointer, scaleMode: number): boolean;
  SDL_SetRenderTextureAddressMode(renderer: Pointer, u: number, v: number): boolean;
  SDL_UpdateTexture(texture: Pointer, rectPtr: Pointer, pixelsPtr: Pointer, pitch: number): boolean;
  SDL_CreateTexture(renderer: Pointer, format: number, access: number, w: number, h: number): Pointer;
  SDL_SetRenderTarget(renderer: Pointer, texture: Pointer): boolean;
  SDL_GetRenderTarget(renderer: Pointer): Pointer;

  // surface loading
  SDL_LoadBMP(file: CString): Pointer;
  SDL_LoadSurface(file: CString): Pointer;
  SDL_ConvertSurface(surface: Pointer, format: number): Pointer;
  SDL_CreateSurface(width: number, height: number, format: number): Pointer;
  SDL_SetSurfaceColorKey(surface: Pointer, enabled: boolean, key: number): boolean;

  // clipping
  SDL_SetRenderClipRect(renderer: Pointer, rectPtr: Pointer): boolean;
  SDL_GetRenderClipRect(renderer: Pointer, rectPtr: Pointer): boolean;
  SDL_RenderClipEnabled(renderer: Pointer): boolean;

  // blend, vsync, coords
  SDL_GetRenderDrawBlendMode(renderer: Pointer, blendModePtr: Pointer): boolean;
  SDL_SetRenderVSync(renderer: Pointer, vsync: number): boolean;
  SDL_GetRenderVSync(renderer: Pointer, vsyncPtr: Pointer): boolean;
  SDL_GetRenderOutputSize(renderer: Pointer, wPtr: Pointer, hPtr: Pointer): boolean;
  SDL_SetRenderLogicalPresentation(renderer: Pointer, w: number, h: number, mode: number): boolean;
  SDL_GetRenderLogicalPresentation(renderer: Pointer, wPtr: Pointer, hPtr: Pointer, modePtr: Pointer): boolean;
  SDL_ConvertEventToRenderCoordinates(renderer: Pointer, eventPtr: Pointer): boolean;
  SDL_RenderCoordinatesFromWindow(renderer: Pointer, window_x: number, window_y: number, xPtr: Pointer, yPtr: Pointer): boolean;
  SDL_GetRendererName(renderer: Pointer): CString;
  SDL_AddVulkanRenderSemaphores(renderer: Pointer, wait_semaphores: Pointer, signal_semaphores: Pointer): boolean;
  SDL_GetDefaultTextureScaleMode(): number;
  SDL_GetRenderColorScale(renderer: Pointer, rPtr: Pointer, gPtr: Pointer, bPtr: Pointer, aPtr: Pointer): boolean;
  SDL_GetRenderDrawColorFloat(renderer: Pointer, rPtr: Pointer, gPtr: Pointer, bPtr: Pointer, aPtr: Pointer): boolean;
  SDL_GetRenderDriver(index: number): CString;
  SDL_GetRendererProperties(renderer: Pointer): Pointer;
  SDL_RenderCoordinatesToWindow(renderer: Pointer, x: number, y: number, window_xPtr: Pointer, window_yPtr: Pointer): boolean;

  // clipboard
  SDL_SetClipboardText(text: CString): boolean;
  SDL_GetClipboardText(): CString;
  SDL_HasClipboardText(): boolean;

  // text input
  SDL_StartTextInput(window: Pointer): boolean;
  SDL_StopTextInput(window: Pointer): boolean;
  SDL_TextInputActive(window: Pointer): boolean;

  // audio
  SDL_OpenAudioDevice(devid: number, specPtr: Pointer): number;
  SDL_CloseAudioDevice(devid: number): void;
  SDL_GetAudioDeviceFormat(devid: number, specPtr: Pointer, sampleFramesPtr: Pointer): boolean;
  SDL_LoadWAV(path: CString, specPtr: Pointer, audioBufPtr: Pointer, audioLenPtr: Pointer): boolean;
  SDL_CreateAudioStream(srcPtr: Pointer, dstPtr: Pointer): Pointer;
  SDL_DestroyAudioStream(streamPtr: Pointer): void;
  SDL_PutAudioStreamData(streamPtr: Pointer, bufPtr: Pointer, len: number): boolean;
  SDL_FlushAudioStream(streamPtr: Pointer): boolean;
  SDL_ClearAudioStream(streamPtr: Pointer): boolean;
  SDL_BindAudioStream(devid: number, streamPtr: Pointer): boolean;
  SDL_UnbindAudioStream(streamPtr: Pointer): void;
  SDL_PauseAudioStreamDevice(streamPtr: Pointer): boolean;
  SDL_ResumeAudioStreamDevice(streamPtr: Pointer): boolean;
  SDL_SetAudioStreamGain(streamPtr: Pointer, gain: number): boolean;
  SDL_GetAudioStreamGain(streamPtr: Pointer): number;
  SDL_SetAudioStreamFrequencyRatio(streamPtr: Pointer, ratio: number): boolean;
  SDL_GetAudioStreamFrequencyRatio(streamPtr: Pointer): number;
  SDL_GetAudioStreamAvailable(streamPtr: Pointer): number;

  // memory / system
  SDL_free(ptr: Pointer): void;
  SDL_GetPlatform(): CString;
  SDL_GetNumLogicalCPUCores(): number;
  SDL_OpenURL(url: CString): boolean;
  SDL_GetPowerInfo(secondsPtr: Pointer, percentPtr: Pointer): number;

  // GPU / shader helpers
  SDL_CreateGPUDevice(format_flags: number, debug_mode: boolean, name: CString): Pointer;
  SDL_ClaimWindowForGPUDevice(devicePtr: Pointer, window: Pointer): boolean;
  SDL_DestroyGPUDevice(devicePtr: Pointer): void;
  SDL_CreateGPURenderer(devicePtr: Pointer, window: Pointer): Pointer;
  SDL_GetGPURendererDevice(rendererPtr: Pointer): Pointer;
  SDL_GetGPUShaderFormats(devicePtr: Pointer): number;
  SDL_GetGPUDeviceDriver(devicePtr: Pointer): CString;
  SDL_CreateGPUShader(devicePtr: Pointer, createInfoPtr: Pointer): Pointer;
  SDL_ReleaseGPUShader(devicePtr: Pointer, shaderPtr: Pointer): void;
  SDL_CreateGPURenderState(rendererPtr: Pointer, createInfoPtr: Pointer): Pointer;
  SDL_SetGPURenderState(rendererPtr: Pointer, statePtr: Pointer): boolean;
  SDL_SetGPURenderStateFragmentUniforms(statePtr: Pointer, slot_index: number, dataPtr: Pointer, length: number): boolean;
  SDL_DestroyGPURenderState(statePtr: Pointer): void;
  SDL_ComposeCustomBlendMode(a: number, b: number, c: number, d: number, e: number, f: number): number;
  SDL_Delay(ms: number): void;

  // joystick / gamepad
  SDL_GetJoysticks(countPtr: Pointer): Pointer;
  SDL_OpenJoystick(instance_id: number): Pointer;
  SDL_CloseJoystick(joystickPtr: Pointer): void;
  SDL_GetJoystickName(joystickPtr: Pointer): CString;
  SDL_GetJoystickNameForID(instance_id: number): CString;
  SDL_GetJoystickID(joystickPtr: Pointer): number;
  SDL_GetNumJoystickAxes(joystickPtr: Pointer): number;
  SDL_GetNumJoystickButtons(joystickPtr: Pointer): number;
  SDL_GetNumJoystickHats(joystickPtr: Pointer): number;
  SDL_GetJoystickAxis(joystickPtr: Pointer, axis: number): number;
  SDL_GetJoystickButton(joystickPtr: Pointer, button: number): boolean;
  SDL_GetJoystickHat(joystickPtr: Pointer, hat: number): number;
  SDL_JoystickConnected(joystickPtr: Pointer): boolean;
  SDL_RumbleJoystick(joystickPtr: Pointer, low_freq: number, high_freq: number, duration_ms: number): boolean;
  SDL_GetJoystickVendor(joystickPtr: Pointer): number;
  SDL_GetJoystickProduct(joystickPtr: Pointer): number;
  SDL_GetJoystickProductVersion(joystickPtr: Pointer): number;

  SDL_IsGamepad(instance_id: number): boolean;
  SDL_OpenGamepad(instance_id: number): Pointer;
  SDL_CloseGamepad(gamepadPtr: Pointer): void;
  SDL_GetGamepadName(gamepadPtr: Pointer): CString;
  SDL_GetGamepadAxis(gamepadPtr: Pointer, axis: number): number;
  SDL_GetGamepadButton(gamepadPtr: Pointer, button: number): boolean;
  SDL_RumbleGamepad(gamepadPtr: Pointer, low_freq: number, high_freq: number, duration_ms: number): boolean;
  SDL_GetGamepadJoystick(gamepadPtr: Pointer): Pointer;

  [key: string]: any;
};

const _dl = dlopen(libPath("SDL3", "SDL3"), {
  // bool SDL_Init(SDL_InitFlags flags)
  SDL_Init: {
    args: [FFIType.u32],
    returns: FFIType.bool,
  },
  // void SDL_Quit(void)
  SDL_Quit: {
    args: [],
    returns: FFIType.void,
  },
  // int SDL_GetVersion(void)
  SDL_GetVersion: {
    args: [],
    returns: FFIType.i32,
  },
  // const char* SDL_GetError(void)
  SDL_GetError: {
    args: [],
    returns: FFIType.cstring,
  },
  // SDL_Window* SDL_CreateWindow(const char* title, int w, int h, SDL_WindowFlags flags)
  SDL_CreateWindow: {
    args: [FFIType.cstring, FFIType.i32, FFIType.i32, FFIType.u64],
    returns: FFIType.pointer,
  },
  // void SDL_DestroyWindow(SDL_Window* window)
  SDL_DestroyWindow: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },

  // --- Window properties ---

  // bool SDL_SetWindowTitle(SDL_Window* window, const char* title)
  SDL_SetWindowTitle: {
    args: [FFIType.pointer, FFIType.cstring],
    returns: FFIType.bool,
  },
  // const char* SDL_GetWindowTitle(SDL_Window* window)
  SDL_GetWindowTitle: {
    args: [FFIType.pointer],
    returns: FFIType.cstring,
  },
  // bool SDL_SetWindowSize(SDL_Window* window, int w, int h)
  SDL_SetWindowSize: {
    args: [FFIType.pointer, FFIType.i32, FFIType.i32],
    returns: FFIType.bool,
  },
  // bool SDL_GetWindowSize(SDL_Window* window, int* w, int* h)
  SDL_GetWindowSize: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_SetWindowPosition(SDL_Window* window, int x, int y)
  SDL_SetWindowPosition: {
    args: [FFIType.pointer, FFIType.i32, FFIType.i32],
    returns: FFIType.bool,
  },
  // bool SDL_GetWindowPosition(SDL_Window* window, int* x, int* y)
  SDL_GetWindowPosition: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },

  // --- Window state ---

  // bool SDL_SetWindowFullscreen(SDL_Window* window, bool fullscreen)
  SDL_SetWindowFullscreen: {
    args: [FFIType.pointer, FFIType.bool],
    returns: FFIType.bool,
  },
  // SDL_WindowFlags SDL_GetWindowFlags(SDL_Window* window)
  SDL_GetWindowFlags: {
    args: [FFIType.pointer],
    returns: FFIType.u64,
  },
  // bool SDL_ShowWindow(SDL_Window* window)
  SDL_ShowWindow: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_HideWindow(SDL_Window* window)
  SDL_HideWindow: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_MaximizeWindow(SDL_Window* window)
  SDL_MaximizeWindow: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_MinimizeWindow(SDL_Window* window)
  SDL_MinimizeWindow: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_RestoreWindow(SDL_Window* window)
  SDL_RestoreWindow: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_RaiseWindow(SDL_Window* window)
  SDL_RaiseWindow: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },

  // --- Window limits ---

  // bool SDL_SetWindowMinimumSize(SDL_Window* window, int min_w, int min_h)
  SDL_SetWindowMinimumSize: {
    args: [FFIType.pointer, FFIType.i32, FFIType.i32],
    returns: FFIType.bool,
  },
  // bool SDL_GetWindowMinimumSize(SDL_Window* window, int* w, int* h)
  SDL_GetWindowMinimumSize: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },

  // --- Display ---

  // float SDL_GetWindowDisplayScale(SDL_Window* window)
  SDL_GetWindowDisplayScale: {
    args: [FFIType.pointer],
    returns: FFIType.f32,
  },
  // SDL_DisplayID* SDL_GetDisplays(int* count)
  SDL_GetDisplays: {
    args: [FFIType.pointer],
    returns: FFIType.pointer,
  },
  // SDL_DisplayID SDL_GetPrimaryDisplay(void)
  SDL_GetPrimaryDisplay: {
    args: [],
    returns: FFIType.u32,
  },
  // bool SDL_GetDisplayBounds(SDL_DisplayID displayID, SDL_Rect* rect)
  SDL_GetDisplayBounds: {
    args: [FFIType.u32, FFIType.pointer],
    returns: FFIType.bool,
  },
  // const char* SDL_GetDisplayName(SDL_DisplayID displayID)
  SDL_GetDisplayName: {
    args: [FFIType.u32],
    returns: FFIType.cstring,
  },
  // const SDL_DisplayMode* const* SDL_GetFullscreenDisplayModes(SDL_DisplayID displayID, int* count)
  SDL_GetFullscreenDisplayModes: {
    args: [FFIType.u32, FFIType.pointer],
    returns: FFIType.pointer,
  },
  // float SDL_GetDisplayContentScale(SDL_DisplayID displayID)
  SDL_GetDisplayContentScale: {
    args: [FFIType.u32],
    returns: FFIType.f32,
  },
  // SDL_DisplayID SDL_GetDisplayForWindow(SDL_Window* window)
  SDL_GetDisplayForWindow: {
    args: [FFIType.pointer],
    returns: FFIType.u32,
  },
  // float SDL_GetWindowPixelDensity(SDL_Window* window)
  SDL_GetWindowPixelDensity: {
    args: [FFIType.pointer],
    returns: FFIType.f32,
  },
  // bool SDL_SetWindowIcon(SDL_Window* window, SDL_Surface* icon)
  SDL_SetWindowIcon: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_FlashWindow(SDL_Window* window, SDL_FlashOperation operation)
  SDL_FlashWindow: {
    args: [FFIType.pointer, FFIType.u32],
    returns: FFIType.bool,
  },
  // bool SDL_ShowSimpleMessageBox(SDL_MessageBoxFlags flags, const char* title, const char* message, SDL_Window* window)
  SDL_ShowSimpleMessageBox: {
    args: [FFIType.u32, FFIType.cstring, FFIType.cstring, FFIType.pointer],
    returns: FFIType.bool,
  },
  // SDL_Window* SDL_CreatePopupWindow(SDL_Window* parent, int offset_x, int offset_y, int w, int h, SDL_WindowFlags flags)
  SDL_CreatePopupWindow: {
    args: [FFIType.pointer, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.u64],
    returns: FFIType.pointer,
  },
  // SDL_Window* SDL_CreateWindowWithProperties(SDL_PropertiesID props)
  SDL_CreateWindowWithProperties: {
    args: [FFIType.pointer],
    returns: FFIType.pointer,
  },
  // void SDL_DestroyWindowSurface(SDL_Window* window)
  SDL_DestroyWindowSurface: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  // bool SDL_ScreenSaverEnabled(void)
  SDL_ScreenSaverEnabled: {
    args: [],
    returns: FFIType.bool,
  },
  // bool SDL_EnableScreenSaver(void)
  SDL_EnableScreenSaver: {
    args: [],
    returns: FFIType.bool,
  },
  // bool SDL_DisableScreenSaver(void)
  SDL_DisableScreenSaver: {
    args: [],
    returns: FFIType.bool,
  },

  // --- Events ---

  // bool SDL_PollEvent(SDL_Event* event)
  SDL_PollEvent: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_WaitEvent(SDL_Event* event)
  SDL_WaitEvent: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },

  // --- Surface / Screenshot ---

  // SDL_Surface* SDL_GetWindowSurface(SDL_Window* window)
  SDL_GetWindowSurface: {
    args: [FFIType.pointer],
    returns: FFIType.pointer,
  },
  // bool SDL_UpdateWindowSurface(SDL_Window* window)
  SDL_UpdateWindowSurface: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_SavePNG(SDL_Surface* surface, const char* file)
  SDL_SavePNG: {
    args: [FFIType.pointer, FFIType.cstring],
    returns: FFIType.bool,
  },
  // bool SDL_SaveBMP(SDL_Surface* surface, const char* file)
  SDL_SaveBMP: {
    args: [FFIType.pointer, FFIType.cstring],
    returns: FFIType.bool,
  },
  // SDL_Surface* SDL_DuplicateSurface(SDL_Surface* surface)
  SDL_DuplicateSurface: {
    args: [FFIType.pointer],
    returns: FFIType.pointer,
  },
  // void SDL_DestroySurface(SDL_Surface* surface)
  SDL_DestroySurface: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  // bool SDL_LockSurface(SDL_Surface* surface)
  SDL_LockSurface: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // void SDL_UnlockSurface(SDL_Surface* surface)
  SDL_UnlockSurface: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },

  // --- Renderer ---

  // SDL_Renderer* SDL_CreateRenderer(SDL_Window* window, const char* name)
  SDL_CreateRenderer: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.pointer,
  },
  // void SDL_DestroyRenderer(SDL_Renderer* renderer)
  SDL_DestroyRenderer: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  // bool SDL_SetRenderDrawColor(SDL_Renderer* renderer, u8 r, u8 g, u8 b, u8 a)
  SDL_SetRenderDrawColor: {
    args: [FFIType.pointer, FFIType.u8, FFIType.u8, FFIType.u8, FFIType.u8],
    returns: FFIType.bool,
  },
  // bool SDL_GetRenderDrawColor(SDL_Renderer* renderer, u8* r, u8* g, u8* b, u8* a)
  SDL_GetRenderDrawColor: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_RenderClear(SDL_Renderer* renderer)
  SDL_RenderClear: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_RenderPresent(SDL_Renderer* renderer)
  SDL_RenderPresent: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_RenderPoint(SDL_Renderer* renderer, float x, float y)
  SDL_RenderPoint: {
    args: [FFIType.pointer, FFIType.f32, FFIType.f32],
    returns: FFIType.bool,
  },
  // bool SDL_RenderLine(SDL_Renderer* renderer, float x1, float y1, float x2, float y2)
  SDL_RenderLine: {
    args: [FFIType.pointer, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.bool,
  },
  // bool SDL_RenderLines(SDL_Renderer* renderer, const SDL_FPoint* points, int count)
  SDL_RenderLines: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.i32],
    returns: FFIType.bool,
  },
  // bool SDL_RenderRect(SDL_Renderer* renderer, const SDL_FRect* rect)
  SDL_RenderRect: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_RenderFillRect(SDL_Renderer* renderer, const SDL_FRect* rect)
  SDL_RenderFillRect: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_RenderGeometry(SDL_Renderer* renderer, SDL_Texture* texture, const SDL_Vertex* vertices, int num_vertices, const int* indices, int num_indices)
  SDL_RenderGeometry: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.i32, FFIType.pointer, FFIType.i32],
    returns: FFIType.bool,
  },
  // bool SDL_SetRenderDrawBlendMode(SDL_Renderer* renderer, SDL_BlendMode blendMode)
  SDL_SetRenderDrawBlendMode: {
    args: [FFIType.pointer, FFIType.u32],
    returns: FFIType.bool,
  },
  // bool SDL_RenderDebugText(SDL_Renderer* renderer, float x, float y, const char* str)
  SDL_RenderDebugText: {
    args: [FFIType.pointer, FFIType.f32, FFIType.f32, FFIType.cstring],
    returns: FFIType.bool,
  },
  // SDL_Surface* SDL_RenderReadPixels(SDL_Renderer* renderer, const SDL_Rect* rect)
  SDL_RenderReadPixels: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.pointer,
  },
  SDL_CreateRendererWithProperties: { args: [FFIType.pointer, FFIType.pointer, FFIType.pointer], returns: FFIType.pointer },
  SDL_CreateSoftwareRenderer: { args: [FFIType.pointer], returns: FFIType.pointer },
  SDL_CreateTextureWithProperties: { args: [FFIType.pointer, FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.pointer], returns: FFIType.pointer },
  SDL_CreateWindowAndRenderer: { args: [FFIType.i32, FFIType.i32, FFIType.u64, FFIType.pointer, FFIType.pointer], returns: FFIType.i32 },
  SDL_FlushRenderer: { args: [FFIType.pointer], returns: FFIType.bool },
  SDL_GDKResumeRenderer: { args: [FFIType.pointer], returns: FFIType.bool },
  SDL_GDKSuspendRenderer: { args: [FFIType.pointer], returns: FFIType.bool },
  SDL_GetNumRenderDrivers: { args: [], returns: FFIType.i32 },
  SDL_GetRenderDriver: { args: [FFIType.i32], returns: FFIType.cstring },
  SDL_GetRenderer: { args: [FFIType.pointer], returns: FFIType.pointer },
  SDL_GetRendererFromTexture: { args: [FFIType.pointer], returns: FFIType.pointer },
  SDL_GetRenderWindow: { args: [FFIType.pointer], returns: FFIType.pointer },
  SDL_GetRenderViewport: { args: [FFIType.pointer, FFIType.pointer], returns: FFIType.bool },
  SDL_GetRenderSafeArea: { args: [FFIType.pointer, FFIType.pointer], returns: FFIType.bool },
  SDL_GetRenderScale: { args: [FFIType.pointer, FFIType.pointer], returns: FFIType.bool },
  SDL_GetRenderMetalCommandEncoder: { args: [FFIType.pointer], returns: FFIType.pointer },
  SDL_GetRenderMetalLayer: { args: [FFIType.pointer], returns: FFIType.pointer },

  // --- Keyboard ---

  // const bool* SDL_GetKeyboardState(int* numkeys)
  SDL_GetKeyboardState: {
    args: [FFIType.pointer],
    returns: FFIType.pointer,
  },
  // const char* SDL_GetKeyName(SDL_Keycode key)
  SDL_GetKeyName: {
    args: [FFIType.u32],
    returns: FFIType.cstring,
  },
  // SDL_Keycode SDL_GetKeyFromScancode(SDL_Scancode scancode, SDL_Keymod modstate, bool key_event)
  SDL_GetKeyFromScancode: {
    args: [FFIType.i32, FFIType.u16, FFIType.bool],
    returns: FFIType.u32,
  },

  // --- Mouse ---

  // SDL_MouseButtonFlags SDL_GetMouseState(float* x, float* y)
  SDL_GetMouseState: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.u32,
  },
  // void SDL_WarpMouseInWindow(SDL_Window* window, float x, float y)
  SDL_WarpMouseInWindow: {
    args: [FFIType.pointer, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // bool SDL_ShowCursor(void)
  SDL_ShowCursor: {
    args: [],
    returns: FFIType.bool,
  },
  // bool SDL_HideCursor(void)
  SDL_HideCursor: {
    args: [],
    returns: FFIType.bool,
  },
  // bool SDL_CursorVisible(void)
  SDL_CursorVisible: {
    args: [],
    returns: FFIType.bool,
  },
  // bool SDL_SetWindowMouseGrab(SDL_Window* window, bool grabbed)
  SDL_SetWindowMouseGrab: {
    args: [FFIType.pointer, FFIType.bool],
    returns: FFIType.bool,
  },
  // bool SDL_GetWindowMouseGrab(SDL_Window* window)
  SDL_GetWindowMouseGrab: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_SetWindowRelativeMouseMode(SDL_Window* window, bool enabled)
  SDL_SetWindowRelativeMouseMode: {
    args: [FFIType.pointer, FFIType.bool],
    returns: FFIType.bool,
  },
  // bool SDL_GetWindowRelativeMouseMode(SDL_Window* window)
  SDL_GetWindowRelativeMouseMode: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },

  // --- Cursors ---

  // SDL_Cursor* SDL_CreateSystemCursor(SDL_SystemCursor id)
  SDL_CreateSystemCursor: {
    args: [FFIType.i32],
    returns: FFIType.pointer,
  },
  // SDL_Cursor* SDL_CreateColorCursor(SDL_Surface* surface, int hot_x, int hot_y)
  SDL_CreateColorCursor: {
    args: [FFIType.pointer, FFIType.i32, FFIType.i32],
    returns: FFIType.pointer,
  },
  // bool SDL_SetCursor(SDL_Cursor* cursor)
  SDL_SetCursor: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // SDL_Cursor* SDL_GetCursor(void)
  SDL_GetCursor: {
    args: [],
    returns: FFIType.pointer,
  },
  // void SDL_DestroyCursor(SDL_Cursor* cursor)
  SDL_DestroyCursor: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  // SDL_Surface* SDL_CreateSurfaceFrom(int width, int height, SDL_PixelFormat format, void* pixels, int pitch)
  SDL_CreateSurfaceFrom: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.pointer, FFIType.i32],
    returns: FFIType.pointer,
  },

  // --- Textures ---

  // SDL_Texture* SDL_CreateTextureFromSurface(SDL_Renderer* renderer, SDL_Surface* surface)
  SDL_CreateTextureFromSurface: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.pointer,
  },
  // void SDL_DestroyTexture(SDL_Texture* texture)
  SDL_DestroyTexture: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  // bool SDL_RenderTexture(SDL_Renderer* renderer, SDL_Texture* texture, const SDL_FRect* srcrect, const SDL_FRect* dstrect)
  SDL_RenderTexture: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_RenderTextureRotated(SDL_Renderer* renderer, SDL_Texture* texture, const SDL_FRect* srcrect, const SDL_FRect* dstrect, double angle, const SDL_FPoint* center, SDL_FlipMode flip)
  SDL_RenderTextureRotated: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.f64, FFIType.pointer, FFIType.i32],
    returns: FFIType.bool,
  },
  // bool SDL_GetTextureSize(SDL_Texture* texture, float* w, float* h)
  SDL_GetTextureSize: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  SDL_GetTextureAlphaMod: { args: [FFIType.pointer, FFIType.pointer], returns: FFIType.bool },
  SDL_GetTextureAlphaModFloat: { args: [FFIType.pointer, FFIType.pointer], returns: FFIType.bool },
  SDL_GetTextureBlendMode: { args: [FFIType.pointer, FFIType.pointer], returns: FFIType.bool },
  SDL_GetTextureColorMod: { args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.pointer], returns: FFIType.bool },
  SDL_GetTextureColorModFloat: { args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.pointer], returns: FFIType.bool },
  SDL_GetTexturePalette: { args: [FFIType.pointer], returns: FFIType.pointer },
  SDL_GetTextureProperties: { args: [FFIType.pointer], returns: FFIType.pointer },
  SDL_GetTextureScaleMode: { args: [FFIType.pointer], returns: FFIType.i32 },
  SDL_LockTexture: { args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.pointer], returns: FFIType.bool },
  SDL_LockTextureToSurface: { args: [FFIType.pointer], returns: FFIType.pointer },
  SDL_RenderFillRects: { args: [FFIType.pointer, FFIType.pointer, FFIType.i32], returns: FFIType.bool },
  SDL_RenderPoints: { args: [FFIType.pointer, FFIType.pointer, FFIType.i32], returns: FFIType.bool },
  SDL_RenderRects: { args: [FFIType.pointer, FFIType.pointer, FFIType.i32], returns: FFIType.bool },
  SDL_RenderGeometryRaw: { args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.i32, FFIType.pointer, FFIType.i32, FFIType.i32], returns: FFIType.bool },
  SDL_RenderTexture9Grid: { args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.pointer], returns: FFIType.bool },
  SDL_RenderTexture9GridTiled: { args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.pointer], returns: FFIType.bool },
  SDL_RenderTextureAffine: { args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.f64], returns: FFIType.bool },
  SDL_RenderTextureTiled: { args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.i32, FFIType.i32], returns: FFIType.bool },
  SDL_RenderViewportSet: { args: [FFIType.pointer, FFIType.pointer], returns: FFIType.bool },
  SDL_SetDefaultTextureScaleMode: { args: [FFIType.i32], returns: FFIType.bool },
  SDL_SetRenderColorScale: { args: [FFIType.pointer, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.bool },
  SDL_SetRenderDrawColorFloat: { args: [FFIType.pointer, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.bool },
  SDL_SetRenderScale: { args: [FFIType.pointer, FFIType.f32, FFIType.f32], returns: FFIType.bool },
  SDL_SetTextureAlphaMod: { args: [FFIType.pointer, FFIType.u8], returns: FFIType.bool },
  SDL_SetTextureColorMod: { args: [FFIType.pointer, FFIType.u8, FFIType.u8, FFIType.u8], returns: FFIType.bool },
  SDL_SetTexturePalette: { args: [FFIType.pointer, FFIType.pointer], returns: FFIType.bool },
  SDL_UnlockTexture: { args: [FFIType.pointer], returns: FFIType.bool },
  SDL_UpdateNVTexture: { args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.i32], returns: FFIType.bool },
  SDL_UpdateYUVTexture: { args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.i32, FFIType.pointer, FFIType.pointer], returns: FFIType.bool },
  // bool SDL_SetTextureBlendMode(SDL_Texture* texture, SDL_BlendMode blendMode)
  SDL_SetTextureBlendMode: {
    args: [FFIType.pointer, FFIType.u32],
    returns: FFIType.bool,
  },
  // bool SDL_SetTextureAlphaModFloat(SDL_Texture* texture, float alpha)
  SDL_SetTextureAlphaModFloat: {
    args: [FFIType.pointer, FFIType.f32],
    returns: FFIType.bool,
  },
  // bool SDL_SetTextureColorModFloat(SDL_Texture* texture, float r, float g, float b)
  SDL_SetTextureColorModFloat: {
    args: [FFIType.pointer, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.bool,
  },
  // bool SDL_SetTextureScaleMode(SDL_Texture* texture, SDL_ScaleMode scaleMode)
  SDL_SetTextureScaleMode: {
    args: [FFIType.pointer, FFIType.i32],
    returns: FFIType.bool,
  },
  // bool SDL_SetRenderTextureAddressMode(SDL_Renderer* renderer, SDL_TextureAddressMode u, SDL_TextureAddressMode v)
  SDL_SetRenderTextureAddressMode: {
    args: [FFIType.pointer, FFIType.i32, FFIType.i32],
    returns: FFIType.bool,
  },

  // bool SDL_UpdateTexture(SDL_Texture* texture, const SDL_Rect* rect, const void* pixels, int pitch)
  SDL_UpdateTexture: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.i32],
    returns: FFIType.bool,
  },

  // --- Render targets ---

  // SDL_Texture* SDL_CreateTexture(SDL_Renderer* renderer, SDL_PixelFormat format, SDL_TextureAccess access, int w, int h)
  SDL_CreateTexture: {
    args: [FFIType.pointer, FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.pointer,
  },
  // bool SDL_SetRenderTarget(SDL_Renderer* renderer, SDL_Texture* texture)
  SDL_SetRenderTarget: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // SDL_Texture* SDL_GetRenderTarget(SDL_Renderer* renderer)
  SDL_GetRenderTarget: {
    args: [FFIType.pointer],
    returns: FFIType.pointer,
  },

  // --- Surface loading ---

  // SDL_Surface* SDL_LoadBMP(const char* file)
  SDL_LoadBMP: {
    args: [FFIType.cstring],
    returns: FFIType.pointer,
  },
  // SDL_Surface* SDL_LoadSurface(const char* file)
  SDL_LoadSurface: {
    args: [FFIType.cstring],
    returns: FFIType.pointer,
  },
  // SDL_Surface* SDL_ConvertSurface(SDL_Surface* surface, SDL_PixelFormat format)
  SDL_ConvertSurface: {
    args: [FFIType.pointer, FFIType.u32],
    returns: FFIType.pointer,
  },
  // SDL_Surface* SDL_CreateSurface(int width, int height, SDL_PixelFormat format)
  SDL_CreateSurface: {
    args: [FFIType.i32, FFIType.i32, FFIType.u32],
    returns: FFIType.pointer,
  },
  // bool SDL_SetSurfaceColorKey(SDL_Surface* surface, bool enabled, Uint32 key)
  SDL_SetSurfaceColorKey: {
    args: [FFIType.pointer, FFIType.bool, FFIType.u32],
    returns: FFIType.bool,
  },

  // --- Scissor / Clipping ---

  // bool SDL_SetRenderClipRect(SDL_Renderer* renderer, const SDL_Rect* rect)
  SDL_SetRenderClipRect: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_GetRenderClipRect(SDL_Renderer* renderer, SDL_Rect* rect)
  SDL_GetRenderClipRect: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_RenderClipEnabled(SDL_Renderer* renderer)
  SDL_RenderClipEnabled: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },

  // --- Blend mode ---

  // bool SDL_GetRenderDrawBlendMode(SDL_Renderer* renderer, SDL_BlendMode* blendMode)
  SDL_GetRenderDrawBlendMode: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },

  // --- VSync ---

  // bool SDL_SetRenderVSync(SDL_Renderer* renderer, int vsync)
  SDL_SetRenderVSync: {
    args: [FFIType.pointer, FFIType.i32],
    returns: FFIType.bool,
  },
  // bool SDL_GetRenderVSync(SDL_Renderer* renderer, int* vsync)
  SDL_GetRenderVSync: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },

  // bool SDL_GetRenderOutputSize(SDL_Renderer* renderer, int* w, int* h)
  SDL_GetRenderOutputSize: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_SetRenderLogicalPresentation(SDL_Renderer* renderer, int w, int h, SDL_RendererLogicalPresentation mode)
  SDL_SetRenderLogicalPresentation: {
    args: [FFIType.pointer, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.bool,
  },
  // bool SDL_GetRenderLogicalPresentation(SDL_Renderer* renderer, int* w, int* h, SDL_RendererLogicalPresentation* mode)
  SDL_GetRenderLogicalPresentation: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_ConvertEventToRenderCoordinates(SDL_Renderer* renderer, SDL_Event* event)
  SDL_ConvertEventToRenderCoordinates: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_RenderCoordinatesFromWindow(SDL_Renderer* renderer, float window_x, float window_y, float* x, float* y)
  SDL_RenderCoordinatesFromWindow: {
    args: [FFIType.pointer, FFIType.f32, FFIType.f32, FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // const char* SDL_GetRendererName(SDL_Renderer* renderer)
  SDL_GetRendererName: {
    args: [FFIType.pointer],
    returns: FFIType.cstring,
  },

  // --- Clipboard ---

  // bool SDL_SetClipboardText(const char* text)
  SDL_SetClipboardText: {
    args: [FFIType.cstring],
    returns: FFIType.bool,
  },
  // const char* SDL_GetClipboardText(void)
  SDL_GetClipboardText: {
    args: [],
    returns: FFIType.cstring,
  },
  // bool SDL_HasClipboardText(void)
  SDL_HasClipboardText: {
    args: [],
    returns: FFIType.bool,
  },

  // --- Text input ---

  // bool SDL_StartTextInput(SDL_Window* window)
  SDL_StartTextInput: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_StopTextInput(SDL_Window* window)
  SDL_StopTextInput: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_TextInputActive(SDL_Window* window)
  SDL_TextInputActive: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },

  // --- Audio ---

  // SDL_AudioDeviceID SDL_OpenAudioDevice(SDL_AudioDeviceID devid, const SDL_AudioSpec* spec)
  SDL_OpenAudioDevice: {
    args: [FFIType.u32, FFIType.pointer],
    returns: FFIType.u32,
  },
  // void SDL_CloseAudioDevice(SDL_AudioDeviceID devid)
  SDL_CloseAudioDevice: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // bool SDL_GetAudioDeviceFormat(SDL_AudioDeviceID devid, SDL_AudioSpec* spec, int* sample_frames)
  SDL_GetAudioDeviceFormat: {
    args: [FFIType.u32, FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_LoadWAV(const char* path, SDL_AudioSpec* spec, Uint8** audio_buf, Uint32* audio_len)
  SDL_LoadWAV: {
    args: [FFIType.cstring, FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // SDL_AudioStream* SDL_CreateAudioStream(const SDL_AudioSpec* src_spec, const SDL_AudioSpec* dst_spec)
  SDL_CreateAudioStream: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.pointer,
  },
  // void SDL_DestroyAudioStream(SDL_AudioStream* stream)
  SDL_DestroyAudioStream: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  // bool SDL_PutAudioStreamData(SDL_AudioStream* stream, const void* buf, int len)
  SDL_PutAudioStreamData: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.i32],
    returns: FFIType.bool,
  },
  // bool SDL_FlushAudioStream(SDL_AudioStream* stream)
  SDL_FlushAudioStream: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_ClearAudioStream(SDL_AudioStream* stream)
  SDL_ClearAudioStream: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_BindAudioStream(SDL_AudioDeviceID devid, SDL_AudioStream* stream)
  SDL_BindAudioStream: {
    args: [FFIType.u32, FFIType.pointer],
    returns: FFIType.bool,
  },
  // void SDL_UnbindAudioStream(SDL_AudioStream* stream)
  SDL_UnbindAudioStream: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  // bool SDL_PauseAudioStreamDevice(SDL_AudioStream* stream)
  SDL_PauseAudioStreamDevice: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_ResumeAudioStreamDevice(SDL_AudioStream* stream)
  SDL_ResumeAudioStreamDevice: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_SetAudioStreamGain(SDL_AudioStream* stream, float gain)
  SDL_SetAudioStreamGain: {
    args: [FFIType.pointer, FFIType.f32],
    returns: FFIType.bool,
  },
  // float SDL_GetAudioStreamGain(SDL_AudioStream* stream)
  SDL_GetAudioStreamGain: {
    args: [FFIType.pointer],
    returns: FFIType.f32,
  },
  // bool SDL_SetAudioStreamFrequencyRatio(SDL_AudioStream* stream, float ratio)
  SDL_SetAudioStreamFrequencyRatio: {
    args: [FFIType.pointer, FFIType.f32],
    returns: FFIType.bool,
  },
  // float SDL_GetAudioStreamFrequencyRatio(SDL_AudioStream* stream)
  SDL_GetAudioStreamFrequencyRatio: {
    args: [FFIType.pointer],
    returns: FFIType.f32,
  },
  // int SDL_GetAudioStreamAvailable(SDL_AudioStream* stream)
  SDL_GetAudioStreamAvailable: {
    args: [FFIType.pointer],
    returns: FFIType.i32,
  },

  // --- Memory ---

  // void SDL_free(void* mem)
  SDL_free: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },

  // --- System info ---

  // const char* SDL_GetPlatform(void)
  SDL_GetPlatform: {
    args: [],
    returns: FFIType.cstring,
  },
  // int SDL_GetNumLogicalCPUCores(void)
  SDL_GetNumLogicalCPUCores: {
    args: [],
    returns: FFIType.i32,
  },
  // bool SDL_OpenURL(const char* url)
  SDL_OpenURL: {
    args: [FFIType.cstring],
    returns: FFIType.bool,
  },
  // SDL_PowerState SDL_GetPowerInfo(int* seconds, int* percent)
  SDL_GetPowerInfo: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.i32,
  },

  // --- GPU Renderer & Shaders ---

  // SDL_GPUDevice* SDL_CreateGPUDevice(SDL_GPUShaderFormat format_flags, bool debug_mode, const char* name)
  SDL_CreateGPUDevice: {
    args: [FFIType.u32, FFIType.bool, FFIType.pointer],
    returns: FFIType.pointer,
  },
  // bool SDL_ClaimWindowForGPUDevice(SDL_GPUDevice* device, SDL_Window* window)
  SDL_ClaimWindowForGPUDevice: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // void SDL_DestroyGPUDevice(SDL_GPUDevice* device)
  SDL_DestroyGPUDevice: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  // SDL_Renderer* SDL_CreateGPURenderer(SDL_GPUDevice* device, SDL_Window* window)
  SDL_CreateGPURenderer: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.pointer,
  },
  // SDL_GPUDevice* SDL_GetGPURendererDevice(SDL_Renderer* renderer)
  SDL_GetGPURendererDevice: {
    args: [FFIType.pointer],
    returns: FFIType.pointer,
  },
  // SDL_GPUShaderFormat SDL_GetGPUShaderFormats(SDL_GPUDevice* device)
  SDL_GetGPUShaderFormats: {
    args: [FFIType.pointer],
    returns: FFIType.u32,
  },
  // const char* SDL_GetGPUDeviceDriver(SDL_GPUDevice* device)
  SDL_GetGPUDeviceDriver: {
    args: [FFIType.pointer],
    returns: FFIType.cstring,
  },
  // SDL_GPUShader* SDL_CreateGPUShader(SDL_GPUDevice* device, const SDL_GPUShaderCreateInfo* createinfo)
  SDL_CreateGPUShader: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.pointer,
  },
  // void SDL_ReleaseGPUShader(SDL_GPUDevice* device, SDL_GPUShader* shader)
  SDL_ReleaseGPUShader: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.void,
  },
  // SDL_GPURenderState* SDL_CreateGPURenderState(SDL_Renderer* renderer, const SDL_GPURenderStateCreateInfo* createinfo)
  SDL_CreateGPURenderState: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.pointer,
  },
  // bool SDL_SetGPURenderState(SDL_Renderer* renderer, SDL_GPURenderState* state)
  SDL_SetGPURenderState: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_SetGPURenderStateFragmentUniforms(SDL_GPURenderState* state, Uint32 slot_index, const void* data, Uint32 length)
  SDL_SetGPURenderStateFragmentUniforms: {
    args: [FFIType.pointer, FFIType.u32, FFIType.pointer, FFIType.u32],
    returns: FFIType.bool,
  },
  // void SDL_DestroyGPURenderState(SDL_GPURenderState* state)
  SDL_DestroyGPURenderState: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  // SDL_BlendMode SDL_ComposeCustomBlendMode(SDL_BlendFactor srcColorFactor, SDL_BlendFactor dstColorFactor, SDL_BlendOperation colorOperation, SDL_BlendFactor srcAlphaFactor, SDL_BlendFactor dstAlphaFactor, SDL_BlendOperation alphaOperation)
  SDL_ComposeCustomBlendMode: {
    args: [FFIType.u32, FFIType.u32, FFIType.u32, FFIType.u32, FFIType.u32, FFIType.u32],
    returns: FFIType.u32,
  },
  // void SDL_Delay(Uint32 ms)
  SDL_Delay: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },

  // --- Joystick ---

  // SDL_JoystickID* SDL_GetJoysticks(int* count)
  SDL_GetJoysticks: {
    args: [FFIType.pointer],
    returns: FFIType.pointer,
  },
  // SDL_Joystick* SDL_OpenJoystick(SDL_JoystickID instance_id)
  SDL_OpenJoystick: {
    args: [FFIType.u32],
    returns: FFIType.pointer,
  },
  // void SDL_CloseJoystick(SDL_Joystick* joystick)
  SDL_CloseJoystick: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  // const char* SDL_GetJoystickName(SDL_Joystick* joystick)
  SDL_GetJoystickName: {
    args: [FFIType.pointer],
    returns: FFIType.cstring,
  },
  // const char* SDL_GetJoystickNameForID(SDL_JoystickID instance_id)
  SDL_GetJoystickNameForID: {
    args: [FFIType.u32],
    returns: FFIType.cstring,
  },
  // SDL_JoystickID SDL_GetJoystickID(SDL_Joystick* joystick)
  SDL_GetJoystickID: {
    args: [FFIType.pointer],
    returns: FFIType.u32,
  },
  // int SDL_GetNumJoystickAxes(SDL_Joystick* joystick)
  SDL_GetNumJoystickAxes: {
    args: [FFIType.pointer],
    returns: FFIType.i32,
  },
  // int SDL_GetNumJoystickButtons(SDL_Joystick* joystick)
  SDL_GetNumJoystickButtons: {
    args: [FFIType.pointer],
    returns: FFIType.i32,
  },
  // int SDL_GetNumJoystickHats(SDL_Joystick* joystick)
  SDL_GetNumJoystickHats: {
    args: [FFIType.pointer],
    returns: FFIType.i32,
  },
  // Sint16 SDL_GetJoystickAxis(SDL_Joystick* joystick, int axis)
  SDL_GetJoystickAxis: {
    args: [FFIType.pointer, FFIType.i32],
    returns: FFIType.i16,
  },
  // bool SDL_GetJoystickButton(SDL_Joystick* joystick, int button)
  SDL_GetJoystickButton: {
    args: [FFIType.pointer, FFIType.i32],
    returns: FFIType.bool,
  },
  // Uint8 SDL_GetJoystickHat(SDL_Joystick* joystick, int hat)
  SDL_GetJoystickHat: {
    args: [FFIType.pointer, FFIType.i32],
    returns: FFIType.u8,
  },
  // bool SDL_JoystickConnected(SDL_Joystick* joystick)
  SDL_JoystickConnected: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  // bool SDL_RumbleJoystick(SDL_Joystick* joystick, Uint16 low_freq, Uint16 high_freq, Uint32 duration_ms)
  SDL_RumbleJoystick: {
    args: [FFIType.pointer, FFIType.u16, FFIType.u16, FFIType.u32],
    returns: FFIType.bool,
  },
  // Uint16 SDL_GetJoystickVendor(SDL_Joystick* joystick)
  SDL_GetJoystickVendor: {
    args: [FFIType.pointer],
    returns: FFIType.u16,
  },
  // Uint16 SDL_GetJoystickProduct(SDL_Joystick* joystick)
  SDL_GetJoystickProduct: {
    args: [FFIType.pointer],
    returns: FFIType.u16,
  },
  // Uint16 SDL_GetJoystickProductVersion(SDL_Joystick* joystick)
  SDL_GetJoystickProductVersion: {
    args: [FFIType.pointer],
    returns: FFIType.u16,
  },

  // --- Gamepad ---

  // bool SDL_IsGamepad(SDL_JoystickID instance_id)
  SDL_IsGamepad: {
    args: [FFIType.u32],
    returns: FFIType.bool,
  },
  // SDL_Gamepad* SDL_OpenGamepad(SDL_JoystickID instance_id)
  SDL_OpenGamepad: {
    args: [FFIType.u32],
    returns: FFIType.pointer,
  },
  // void SDL_CloseGamepad(SDL_Gamepad* gamepad)
  SDL_CloseGamepad: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  // const char* SDL_GetGamepadName(SDL_Gamepad* gamepad)
  SDL_GetGamepadName: {
    args: [FFIType.pointer],
    returns: FFIType.cstring,
  },
  // Sint16 SDL_GetGamepadAxis(SDL_Gamepad* gamepad, SDL_GamepadAxis axis)
  SDL_GetGamepadAxis: {
    args: [FFIType.pointer, FFIType.i32],
    returns: FFIType.i16,
  },
  // bool SDL_GetGamepadButton(SDL_Gamepad* gamepad, SDL_GamepadButton button)
  SDL_GetGamepadButton: {
    args: [FFIType.pointer, FFIType.i32],
    returns: FFIType.bool,
  },
  // bool SDL_RumbleGamepad(SDL_Gamepad* gamepad, Uint16 low_freq, Uint16 high_freq, Uint32 duration_ms)
  SDL_RumbleGamepad: {
    args: [FFIType.pointer, FFIType.u16, FFIType.u16, FFIType.u32],
    returns: FFIType.bool,
  },
  // SDL_Joystick* SDL_GetGamepadJoystick(SDL_Gamepad* gamepad)
  SDL_GetGamepadJoystick: {
    args: [FFIType.pointer],
    returns: FFIType.pointer,
  },
  // (Additional bindings may be added here if needed)
  // (Additional bindings may be added here if needed)

  // (Additional bindings may be added here if needed)
});

const sdl = _dl.symbols as unknown as SDLAPI;

export default sdl;
