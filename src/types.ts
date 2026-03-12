// MIT License — see LICENSE

// SDL3 TypeScript type definitions
import type { Pointer } from "bun:ffi";

/** Opaque pointer to an SDL_Window */
export type SDLWindow = Pointer;

/** Opaque pointer to an SDL_Surface */
export type SDLSurface = Pointer;

// SDL_Surface struct offsets (64-bit Linux x86-64, from SDL_surface.h)
// flags(u32,0) format(u32,4) w(i32,8) h(i32,12) pitch(i32,16) [4-byte pad] pixels(ptr,24)
export const SDL_SURFACE_OFFSET_W = 8;
export const SDL_SURFACE_OFFSET_H = 12;
export const SDL_SURFACE_OFFSET_PITCH = 16;
export const SDL_SURFACE_OFFSET_PIXELS = 24;
export const SDL_SURFACE_OFFSET_FORMAT = 4;

/** SDL_InitFlags (Uint32) */
export const SDL_INIT_AUDIO = 0x00000010;
export const SDL_INIT_VIDEO = 0x00000020;
export const SDL_INIT_JOYSTICK = 0x00000200;
export const SDL_INIT_HAPTIC = 0x00001000;
export const SDL_INIT_GAMEPAD = 0x00002000;
export const SDL_INIT_EVENTS = 0x00004000;
export const SDL_INIT_SENSOR = 0x00008000;
export const SDL_INIT_CAMERA = 0x00010000;

/** SDL_WindowFlags (Uint64) — using bigint for 64-bit flags */
export const SDL_WINDOW_FULLSCREEN = 0x0000000000000001n;
export const SDL_WINDOW_OPENGL = 0x0000000000000002n;
export const SDL_WINDOW_HIDDEN = 0x0000000000000008n;
export const SDL_WINDOW_BORDERLESS = 0x0000000000000010n;
export const SDL_WINDOW_RESIZABLE = 0x0000000000000020n;
export const SDL_WINDOW_MINIMIZED = 0x0000000000000040n;
export const SDL_WINDOW_MAXIMIZED = 0x0000000000000080n;
export const SDL_WINDOW_HIGH_PIXEL_DENSITY = 0x0000000000002000n;
export const SDL_WINDOW_ALWAYS_ON_TOP = 0x0000000000010000n;
export const SDL_WINDOW_INPUT_FOCUS = 0x0000000000000200n;
export const SDL_WINDOW_MOUSE_FOCUS = 0x0000000000000400n;
export const SDL_WINDOW_VULKAN = 0x0000000010000000n;

/** SDL_FlashOperation constants */
export const SDL_FLASH_CANCEL = 0;
export const SDL_FLASH_BRIEFLY = 1;
export const SDL_FLASH_UNTIL_FOCUSED = 2;

/** SDL_MessageBoxFlags constants */
export const SDL_MESSAGEBOX_ERROR = 0x10;
export const SDL_MESSAGEBOX_WARNING = 0x20;
export const SDL_MESSAGEBOX_INFORMATION = 0x40;

/** SDL_WINDOWPOS_CENTERED */
export const SDL_WINDOWPOS_CENTERED = 0x2fff0000;

/** SDL3 Event type constants */
export const SDL_EVENT_QUIT = 0x100;
export const SDL_EVENT_WINDOW_SHOWN = 0x202;
export const SDL_EVENT_WINDOW_HIDDEN = 0x203;
export const SDL_EVENT_WINDOW_EXPOSED = 0x204;
export const SDL_EVENT_WINDOW_MOVED = 0x205;
export const SDL_EVENT_WINDOW_RESIZED = 0x206;
export const SDL_EVENT_WINDOW_PIXEL_SIZE_CHANGED = 0x207;
export const SDL_EVENT_WINDOW_MINIMIZED = 0x209;
export const SDL_EVENT_WINDOW_MAXIMIZED = 0x20a;
export const SDL_EVENT_WINDOW_RESTORED = 0x20b;
export const SDL_EVENT_WINDOW_FOCUS_GAINED = 0x20e;
export const SDL_EVENT_WINDOW_FOCUS_LOST = 0x20f;
export const SDL_EVENT_WINDOW_CLOSE_REQUESTED = 0x210;

/** Keyboard event constants */
export const SDL_EVENT_KEY_DOWN = 0x300;
export const SDL_EVENT_KEY_UP = 0x301;
export const SDL_EVENT_TEXT_EDITING = 0x302;
export const SDL_EVENT_TEXT_INPUT = 0x303;

/** Mouse event constants */
export const SDL_EVENT_MOUSE_MOTION = 0x400;
export const SDL_EVENT_MOUSE_BUTTON_DOWN = 0x401;
export const SDL_EVENT_MOUSE_BUTTON_UP = 0x402;
export const SDL_EVENT_MOUSE_WHEEL = 0x403;

/** Size of SDL_Event union in bytes */
export const SDL_EVENT_SIZE = 128;

/** SDL_KeyboardEvent struct offsets (x86-64) */
export const SDL_KEYBOARD_EVENT_SCANCODE = 24;
export const SDL_KEYBOARD_EVENT_KEY = 28;
export const SDL_KEYBOARD_EVENT_MOD = 32;
export const SDL_KEYBOARD_EVENT_DOWN = 36;
export const SDL_KEYBOARD_EVENT_REPEAT = 37;

/** SDL_MouseMotionEvent struct offsets */
export const SDL_MOUSE_MOTION_STATE = 24;
export const SDL_MOUSE_MOTION_X = 28;
export const SDL_MOUSE_MOTION_Y = 32;
export const SDL_MOUSE_MOTION_XREL = 36;
export const SDL_MOUSE_MOTION_YREL = 40;

/** SDL_MouseButtonEvent struct offsets */
export const SDL_MOUSE_BUTTON_BUTTON = 24;
export const SDL_MOUSE_BUTTON_DOWN = 25;
export const SDL_MOUSE_BUTTON_CLICKS = 26;
export const SDL_MOUSE_BUTTON_X = 28;
export const SDL_MOUSE_BUTTON_Y = 32;

/** SDL_MouseWheelEvent struct offsets */
export const SDL_MOUSE_WHEEL_X = 24;
export const SDL_MOUSE_WHEEL_Y = 28;
export const SDL_MOUSE_WHEEL_DIR = 32;

/** SDL_BlendMode constants */
export const SDL_BLENDMODE_NONE = 0x00000000;
export const SDL_BLENDMODE_BLEND = 0x00000001;
export const SDL_BLENDMODE_BLEND_PREMULTIPLIED = 0x00000010;
export const SDL_BLENDMODE_ADD = 0x00000002;
export const SDL_BLENDMODE_MOD = 0x00000004;
export const SDL_BLENDMODE_MUL = 0x00000008;

/** SDL_BlendFactor constants (for SDL_ComposeCustomBlendMode) */
export const SDL_BLENDFACTOR_ZERO = 0x1;
export const SDL_BLENDFACTOR_ONE = 0x2;
export const SDL_BLENDFACTOR_SRC_COLOR = 0x3;
export const SDL_BLENDFACTOR_ONE_MINUS_SRC_COLOR = 0x4;
export const SDL_BLENDFACTOR_SRC_ALPHA = 0x5;
export const SDL_BLENDFACTOR_ONE_MINUS_SRC_ALPHA = 0x6;
export const SDL_BLENDFACTOR_DST_COLOR = 0x7;
export const SDL_BLENDFACTOR_ONE_MINUS_DST_COLOR = 0x8;
export const SDL_BLENDFACTOR_DST_ALPHA = 0x9;
export const SDL_BLENDFACTOR_ONE_MINUS_DST_ALPHA = 0xA;

/** SDL_BlendOperation constants */
export const SDL_BLENDOPERATION_ADD = 0x1;

/** SDL_FlipMode constants */
export const SDL_FLIP_NONE = 0;
export const SDL_FLIP_HORIZONTAL = 1;
export const SDL_FLIP_VERTICAL = 2;

/** SDL_TextureAccess constants */
export const SDL_TEXTUREACCESS_STATIC = 0;
export const SDL_TEXTUREACCESS_STREAMING = 1;
export const SDL_TEXTUREACCESS_TARGET = 2;

/** SDL_ScaleMode constants */
export const SDL_SCALEMODE_NEAREST = 0;
export const SDL_SCALEMODE_LINEAR = 1;

/** SDL_TextureAddressMode constants */
export const SDL_TEXTURE_ADDRESS_AUTO = 0;
export const SDL_TEXTURE_ADDRESS_CLAMP = 1;
export const SDL_TEXTURE_ADDRESS_WRAP = 2;

/** SDL_RendererLogicalPresentation constants */
export const SDL_LOGICAL_PRESENTATION_DISABLED = 0;
export const SDL_LOGICAL_PRESENTATION_STRETCH = 1;
export const SDL_LOGICAL_PRESENTATION_LETTERBOX = 2;
export const SDL_LOGICAL_PRESENTATION_OVERSCAN = 3;
export const SDL_LOGICAL_PRESENTATION_INTEGER_SCALE = 4;

/** SDL_PixelFormat constants (values from SDL3 SDL_pixels.h) */
export const SDL_PIXELFORMAT_ARGB8888 = 0x16362004;
export const SDL_PIXELFORMAT_RGBA8888 = 0x16462004;
export const SDL_PIXELFORMAT_ABGR8888 = 0x16762004;
export const SDL_PIXELFORMAT_BGRA8888 = 0x16862004;

/** SDL_TextInputEvent offsets (x86-64) — text pointer at offset 24 */
export const SDL_TEXT_INPUT_TEXT = 24;

/** SDL_TextEditingEvent offsets (x86-64) */
export const SDL_TEXT_EDITING_TEXT = 24;
export const SDL_TEXT_EDITING_START = 32;
export const SDL_TEXT_EDITING_LENGTH = 36;

/** SDL_DropEvent offsets (x86-64) */
export const SDL_EVENT_DROP_FILE = 0x1000;
export const SDL_EVENT_DROP_TEXT = 0x1001;
export const SDL_EVENT_DROP_BEGIN = 0x1002;
export const SDL_EVENT_DROP_COMPLETE = 0x1003;
export const SDL_DROP_EVENT_SOURCE = 32;
export const SDL_DROP_EVENT_DATA = 40;

/** SDL audio constants */
export const SDL_AUDIO_DEVICE_DEFAULT_PLAYBACK = 0xFFFFFFFF;
export const SDL_AUDIO_U8 = 0x0008;
export const SDL_AUDIO_S16 = 0x8010;
export const SDL_AUDIO_F32 = 0x8120;

/** SDL_PowerState constants */
export const SDL_POWERSTATE_ERROR = -1;
export const SDL_POWERSTATE_UNKNOWN = 0;
export const SDL_POWERSTATE_ON_BATTERY = 1;
export const SDL_POWERSTATE_NO_BATTERY = 2;
export const SDL_POWERSTATE_CHARGING = 3;
export const SDL_POWERSTATE_CHARGED = 4;

/** VSync constants */
export const SDL_RENDERER_VSYNC_DISABLED = 0;
export const SDL_RENDERER_VSYNC_ADAPTIVE = -1;

/** Opaque pointer to an SDL_Renderer */
export type SDLRenderer = Pointer;

/** Opaque pointer to an SDL_Texture */
export type SDLTexture = Pointer;

/** love2d cursor type names */
export type CursorType =
  | "arrow" | "ibeam" | "wait" | "crosshair" | "waitarrow"
  | "sizenwse" | "sizenesw" | "sizewe" | "sizens" | "sizeall"
  | "no" | "hand";

/** Map from love2d cursor name → SDL_SystemCursor enum value */
export const CURSOR_TYPE_TO_SDL: Record<CursorType, number> = {
  arrow: 0,       // SDL_SYSTEM_CURSOR_DEFAULT
  ibeam: 1,       // SDL_SYSTEM_CURSOR_TEXT
  wait: 2,        // SDL_SYSTEM_CURSOR_WAIT
  crosshair: 3,   // SDL_SYSTEM_CURSOR_CROSSHAIR
  waitarrow: 4,   // SDL_SYSTEM_CURSOR_PROGRESS
  sizenwse: 5,    // SDL_SYSTEM_CURSOR_NWSE_RESIZE
  sizenesw: 6,    // SDL_SYSTEM_CURSOR_NESW_RESIZE
  sizewe: 7,      // SDL_SYSTEM_CURSOR_EW_RESIZE
  sizens: 8,      // SDL_SYSTEM_CURSOR_NS_RESIZE
  sizeall: 9,     // SDL_SYSTEM_CURSOR_MOVE
  no: 10,         // SDL_SYSTEM_CURSOR_NOT_ALLOWED
  hand: 11,       // SDL_SYSTEM_CURSOR_POINTER
};

// --- GPU Shader structs and constants ---

// SDL_GPUShaderCreateInfo struct offsets (64-bit Linux, 56 bytes total)
export const GPU_SHADER_CREATE_INFO_SIZE = 56;
export const GPU_SHADER_OFFSET_CODE_SIZE = 0;      // size_t (8)
export const GPU_SHADER_OFFSET_CODE = 8;            // pointer (8)
export const GPU_SHADER_OFFSET_ENTRYPOINT = 16;     // pointer (8)
export const GPU_SHADER_OFFSET_FORMAT = 24;         // u32 (4)
export const GPU_SHADER_OFFSET_STAGE = 28;          // u32 (4)
export const GPU_SHADER_OFFSET_NUM_SAMPLERS = 32;   // u32 (4)
export const GPU_SHADER_OFFSET_NUM_STORAGE_TEX = 36;// u32 (4)
export const GPU_SHADER_OFFSET_NUM_STORAGE_BUF = 40;// u32 (4)
export const GPU_SHADER_OFFSET_NUM_UNIFORM_BUF = 44;// u32 (4)
export const GPU_SHADER_OFFSET_PROPS = 48;          // u32 (4)
// 4 bytes padding to reach 56

// SDL_GPURenderStateCreateInfo struct offsets (64-bit Linux, 64 bytes total)
export const GPU_RENDER_STATE_CREATE_INFO_SIZE = 64;
export const GPU_RENDER_STATE_OFFSET_SHADER = 0;            // pointer (8) — fragment shader
export const GPU_RENDER_STATE_OFFSET_NUM_SAMPLERS = 8;      // i32 (4)
// 4 bytes padding
export const GPU_RENDER_STATE_OFFSET_SAMPLER_BINDINGS = 16; // pointer (8)
export const GPU_RENDER_STATE_OFFSET_NUM_STORAGE_TEX = 24;  // i32 (4)
// 4 bytes padding
export const GPU_RENDER_STATE_OFFSET_STORAGE_TEX = 32;      // pointer (8)
export const GPU_RENDER_STATE_OFFSET_NUM_STORAGE_BUF = 40;  // i32 (4)
// 4 bytes padding
export const GPU_RENDER_STATE_OFFSET_STORAGE_BUF = 48;      // pointer (8)
export const GPU_RENDER_STATE_OFFSET_PROPS = 56;            // u32 (4)
// 4 bytes padding to reach 64

// GPU shader format bitmask values
export const SDL_GPU_SHADERFORMAT_INVALID = 0;
export const SDL_GPU_SHADERFORMAT_PRIVATE = 1 << 0;
export const SDL_GPU_SHADERFORMAT_SPIRV = 1 << 1;   // 2
export const SDL_GPU_SHADERFORMAT_DXBC = 1 << 2;
export const SDL_GPU_SHADERFORMAT_DXIL = 1 << 3;
export const SDL_GPU_SHADERFORMAT_MSL = 1 << 4;
export const SDL_GPU_SHADERFORMAT_METALLIB = 1 << 5;

// GPU shader stage
export const SDL_GPU_SHADERSTAGE_VERTEX = 0;
export const SDL_GPU_SHADERSTAGE_FRAGMENT = 1;

// --- Joystick/Gamepad event types ---

export const SDL_EVENT_JOYSTICK_AXIS_MOTION = 0x600;
export const SDL_EVENT_JOYSTICK_HAT_MOTION = 0x602;
export const SDL_EVENT_JOYSTICK_BUTTON_DOWN = 0x603;
export const SDL_EVENT_JOYSTICK_BUTTON_UP = 0x604;
export const SDL_EVENT_JOYSTICK_ADDED = 0x605;
export const SDL_EVENT_JOYSTICK_REMOVED = 0x606;

export const SDL_EVENT_GAMEPAD_AXIS_MOTION = 0x650;
export const SDL_EVENT_GAMEPAD_BUTTON_DOWN = 0x651;
export const SDL_EVENT_GAMEPAD_BUTTON_UP = 0x652;

// Joystick/Gamepad event struct offsets (common header: type@0, reserved@4, timestamp@8, which@16)
export const SDL_JOY_EVENT_WHICH = 16;
export const SDL_JOY_AXIS_EVENT_AXIS = 20;
export const SDL_JOY_AXIS_EVENT_VALUE = 24;
export const SDL_JOY_BUTTON_EVENT_BUTTON = 20;
export const SDL_JOY_BUTTON_EVENT_DOWN = 21;
export const SDL_JOY_HAT_EVENT_HAT = 20;
export const SDL_JOY_HAT_EVENT_VALUE = 21;

// SDL_GamepadButton enum values
export const SDL_GAMEPAD_BUTTON_SOUTH = 0;
export const SDL_GAMEPAD_BUTTON_EAST = 1;
export const SDL_GAMEPAD_BUTTON_WEST = 2;
export const SDL_GAMEPAD_BUTTON_NORTH = 3;
export const SDL_GAMEPAD_BUTTON_BACK = 4;
export const SDL_GAMEPAD_BUTTON_GUIDE = 5;
export const SDL_GAMEPAD_BUTTON_START = 6;
export const SDL_GAMEPAD_BUTTON_LEFT_STICK = 7;
export const SDL_GAMEPAD_BUTTON_RIGHT_STICK = 8;
export const SDL_GAMEPAD_BUTTON_LEFT_SHOULDER = 9;
export const SDL_GAMEPAD_BUTTON_RIGHT_SHOULDER = 10;
export const SDL_GAMEPAD_BUTTON_DPAD_UP = 11;
export const SDL_GAMEPAD_BUTTON_DPAD_DOWN = 12;
export const SDL_GAMEPAD_BUTTON_DPAD_LEFT = 13;
export const SDL_GAMEPAD_BUTTON_DPAD_RIGHT = 14;

// SDL_GamepadAxis enum values
export const SDL_GAMEPAD_AXIS_LEFTX = 0;
export const SDL_GAMEPAD_AXIS_LEFTY = 1;
export const SDL_GAMEPAD_AXIS_RIGHTX = 2;
export const SDL_GAMEPAD_AXIS_RIGHTY = 3;
export const SDL_GAMEPAD_AXIS_LEFT_TRIGGER = 4;
export const SDL_GAMEPAD_AXIS_RIGHT_TRIGGER = 5;

// SDL hat values
export const SDL_HAT_CENTERED = 0x00;
export const SDL_HAT_UP = 0x01;
export const SDL_HAT_RIGHT = 0x02;
export const SDL_HAT_DOWN = 0x04;
export const SDL_HAT_LEFT = 0x08;

/** Map SDL hat value → love2d direction string */
export const HAT_DIRECTION_NAMES: Record<number, string> = {
  0x00: "c",   // centered
  0x01: "u",   // up
  0x02: "r",   // right
  0x04: "d",   // down
  0x08: "l",   // left
  0x03: "ru",  // right-up
  0x06: "rd",  // right-down
  0x09: "lu",  // left-up
  0x0c: "ld",  // left-down
};

/** Map SDL gamepad button enum → love2d button name */
export const GAMEPAD_BUTTON_NAMES: Record<number, string> = {
  0: "a", 1: "b", 2: "x", 3: "y",
  4: "back", 5: "guide", 6: "start",
  7: "leftstick", 8: "rightstick",
  9: "leftshoulder", 10: "rightshoulder",
  11: "dpup", 12: "dpdown", 13: "dpleft", 14: "dpright",
};

/** Map love2d button name → SDL gamepad button enum */
export const GAMEPAD_BUTTON_FROM_NAME: Record<string, number> = {
  a: 0, b: 1, x: 2, y: 3,
  back: 4, guide: 5, start: 6,
  leftstick: 7, rightstick: 8,
  leftshoulder: 9, rightshoulder: 10,
  dpup: 11, dpdown: 12, dpleft: 13, dpright: 14,
};

/** Map SDL gamepad axis enum → love2d axis name */
export const GAMEPAD_AXIS_NAMES: Record<number, string> = {
  0: "leftx", 1: "lefty", 2: "rightx", 3: "righty",
  4: "triggerleft", 5: "triggerright",
};

/** Map love2d axis name → SDL gamepad axis enum */
export const GAMEPAD_AXIS_FROM_NAME: Record<string, number> = {
  leftx: 0, lefty: 1, rightx: 2, righty: 3,
  triggerleft: 4, triggerright: 5,
};

/**
 * SDL scancode → love2d-style key name mapping.
 * Based on SDL_Scancode enum values.
 */
export const SCANCODE_NAMES: Record<number, string> = {
  4: "a", 5: "b", 6: "c", 7: "d", 8: "e", 9: "f", 10: "g", 11: "h",
  12: "i", 13: "j", 14: "k", 15: "l", 16: "m", 17: "n", 18: "o", 19: "p",
  20: "q", 21: "r", 22: "s", 23: "t", 24: "u", 25: "v", 26: "w", 27: "x",
  28: "y", 29: "z",
  30: "1", 31: "2", 32: "3", 33: "4", 34: "5", 35: "6", 36: "7", 37: "8",
  38: "9", 39: "0",
  40: "return", 41: "escape", 42: "backspace", 43: "tab", 44: "space",
  45: "-", 46: "=", 47: "[", 48: "]", 49: "\\",
  51: ";", 52: "'", 53: "`", 54: ",", 55: ".", 56: "/",
  57: "capslock",
  58: "f1", 59: "f2", 60: "f3", 61: "f4", 62: "f5", 63: "f6",
  64: "f7", 65: "f8", 66: "f9", 67: "f10", 68: "f11", 69: "f12",
  70: "printscreen", 71: "scrolllock", 72: "pause",
  73: "insert", 74: "home", 75: "pageup",
  76: "delete", 77: "end", 78: "pagedown",
  79: "right", 80: "left", 81: "down", 82: "up",
  83: "numlock",
  84: "kp/", 85: "kp*", 86: "kp-", 87: "kp+", 88: "kpenter",
  89: "kp1", 90: "kp2", 91: "kp3", 92: "kp4", 93: "kp5",
  94: "kp6", 95: "kp7", 96: "kp8", 97: "kp9", 98: "kp0",
  99: "kp.",
  224: "lctrl", 225: "lshift", 226: "lalt", 227: "lgui",
  228: "rctrl", 229: "rshift", 230: "ralt", 231: "rgui",
};
