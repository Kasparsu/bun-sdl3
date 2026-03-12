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

// --- Keycodes and modifiers (partial, from SDL_keycode.h) ---
/** SDL_Keymod masks (Uint16) */
export const SDL_KMOD_NONE = 0x0000;
export const SDL_KMOD_LSHIFT = 0x0001;
export const SDL_KMOD_RSHIFT = 0x0002;
export const SDL_KMOD_LEVEL5 = 0x0004;
export const SDL_KMOD_LCTRL = 0x0040;
export const SDL_KMOD_RCTRL = 0x0080;
export const SDL_KMOD_LALT = 0x0100;
export const SDL_KMOD_RALT = 0x0200;
export const SDL_KMOD_LGUI = 0x0400;
export const SDL_KMOD_RGUI = 0x0800;
export const SDL_KMOD_NUM = 0x1000;
export const SDL_KMOD_CAPS = 0x2000;
export const SDL_KMOD_MODE = 0x4000;
export const SDL_KMOD_SCROLL = 0x8000;
export const SDL_KMOD_CTRL = SDL_KMOD_LCTRL | SDL_KMOD_RCTRL;
export const SDL_KMOD_SHIFT = SDL_KMOD_LSHIFT | SDL_KMOD_RSHIFT;
export const SDL_KMOD_ALT = SDL_KMOD_LALT | SDL_KMOD_RALT;
export const SDL_KMOD_GUI = SDL_KMOD_LGUI | SDL_KMOD_RGUI;

/** Mouse button constants */
export const SDL_BUTTON_LEFT = 1;
export const SDL_BUTTON_MIDDLE = 2;
export const SDL_BUTTON_RIGHT = 3;
export const SDL_BUTTON_X1 = 4;
export const SDL_BUTTON_X2 = 5;
export const SDL_BUTTON_MASK = (x: number) => (1 << (x - 1));
export const SDL_BUTTON_LMASK = SDL_BUTTON_MASK(SDL_BUTTON_LEFT);
export const SDL_BUTTON_MMASK = SDL_BUTTON_MASK(SDL_BUTTON_MIDDLE);
export const SDL_BUTTON_RMASK = SDL_BUTTON_MASK(SDL_BUTTON_RIGHT);
export const SDL_BUTTON_X1MASK = SDL_BUTTON_MASK(SDL_BUTTON_X1);
export const SDL_BUTTON_X2MASK = SDL_BUTTON_MASK(SDL_BUTTON_X2);

// --- Representative SDL_Keycode values (common keys) ---
export const SDLK_UNKNOWN = 0x00000000;
export const SDLK_RETURN = 0x0000000d;
export const SDLK_ESCAPE = 0x0000001b;
export const SDLK_BACKSPACE = 0x00000008;
export const SDLK_TAB = 0x00000009;
export const SDLK_SPACE = 0x00000020;
export const SDLK_EXCLAIM = 0x00000021;
export const SDLK_QUOTE = 0x00000027;
export const SDLK_COMMA = 0x0000002c;
export const SDLK_MINUS = 0x0000002d;
export const SDLK_PERIOD = 0x0000002e;
export const SDLK_SLASH = 0x0000002f;
export const SDLK_0 = 0x00000030;
export const SDLK_1 = 0x00000031;
export const SDLK_2 = 0x00000032;
export const SDLK_3 = 0x00000033;
export const SDLK_4 = 0x00000034;
export const SDLK_5 = 0x00000035;
export const SDLK_6 = 0x00000036;
export const SDLK_7 = 0x00000037;
export const SDLK_8 = 0x00000038;
export const SDLK_9 = 0x00000039;
export const SDLK_A = 0x00000061;
export const SDLK_B = 0x00000062;
export const SDLK_C = 0x00000063;
export const SDLK_D = 0x00000064;
export const SDLK_E = 0x00000065;
export const SDLK_F = 0x00000066;
export const SDLK_G = 0x00000067;
export const SDLK_H = 0x00000068;
export const SDLK_I = 0x00000069;
export const SDLK_J = 0x0000006a;
export const SDLK_K = 0x0000006b;
export const SDLK_L = 0x0000006c;
export const SDLK_M = 0x0000006d;
export const SDLK_N = 0x0000006e;
export const SDLK_O = 0x0000006f;
export const SDLK_P = 0x00000070;
export const SDLK_Q = 0x00000071;
export const SDLK_R = 0x00000072;
export const SDLK_S = 0x00000073;
export const SDLK_T = 0x00000074;
export const SDLK_U = 0x00000075;
export const SDLK_V = 0x00000076;
export const SDLK_W = 0x00000077;
export const SDLK_X = 0x00000078;
export const SDLK_Y = 0x00000079;
export const SDLK_Z = 0x0000007a;
export const SDLK_F1 = 0x4000003a;
export const SDLK_F2 = 0x4000003b;
export const SDLK_F3 = 0x4000003c;
export const SDLK_F4 = 0x4000003d;
export const SDLK_F5 = 0x4000003e;
export const SDLK_F6 = 0x4000003f;
export const SDLK_F7 = 0x40000040;
export const SDLK_F8 = 0x40000041;
export const SDLK_F9 = 0x40000042;
export const SDLK_F10 = 0x40000043;
export const SDLK_F11 = 0x40000044;
export const SDLK_F12 = 0x40000045;
export const SDLK_PRINTSCREEN = 0x40000046;
export const SDLK_SCROLLLOCK = 0x40000047;
export const SDLK_PAUSE = 0x40000048;
export const SDLK_INSERT = 0x40000049;
export const SDLK_HOME = 0x4000004a;
export const SDLK_PAGEUP = 0x4000004b;
export const SDLK_END = 0x4000004d;
export const SDLK_PAGEDOWN = 0x4000004e;
export const SDLK_RIGHT = 0x4000004f;
export const SDLK_LEFT = 0x40000050;
export const SDLK_DOWN = 0x40000051;
export const SDLK_UP = 0x40000052;


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

/**
 * SDL system cursor enum (values from SDL_SystemCursor)
 */
export enum SDLSystemCursor {
	DEFAULT = 0,
	TEXT = 1,
	WAIT = 2,
	CROSSHAIR = 3,
	PROGRESS = 4,
	NWSE_RESIZE = 5,
	NESW_RESIZE = 6,
	EW_RESIZE = 7,
	NS_RESIZE = 8,
	MOVE = 9,
	NOT_ALLOWED = 10,
	POINTER = 11,
}

/** SDL hat enum values */
export enum SDLHat {
	CENTERED = 0x00,
	UP = 0x01,
	RIGHT = 0x02,
	DOWN = 0x04,
	LEFT = 0x08,
}

/** SDL gamepad button enum */
export enum SDLGamepadButton {
	SOUTH = 0,
	EAST = 1,
	WEST = 2,
	NORTH = 3,
	BACK = 4,
	GUIDE = 5,
	START = 6,
	LEFT_STICK = 7,
	RIGHT_STICK = 8,
	LEFT_SHOULDER = 9,
	RIGHT_SHOULDER = 10,
	DPAD_UP = 11,
	DPAD_DOWN = 12,
	DPAD_LEFT = 13,
	DPAD_RIGHT = 14,
}

/** SDL gamepad axis enum */
export enum SDLGamepadAxis {
	LEFTX = 0,
	LEFTY = 1,
	RIGHTX = 2,
	RIGHTY = 3,
	LEFT_TRIGGER = 4,
	RIGHT_TRIGGER = 5,
}

/** Partial set of SDL scancodes used in mappings (values from SDL_Scancode)
 * These cover the scancodes previously exposed by the removed mapping.
 */
export enum SDLScancode {
	A = 4,
	B = 5,
	C = 6,
	D = 7,
	E = 8,
	F = 9,
	G = 10,
	H = 11,
	I = 12,
	J = 13,
	K = 14,
	L = 15,
	M = 16,
	N = 17,
	O = 18,
	P = 19,
	Q = 20,
	R = 21,
	S = 22,
	T = 23,
	U = 24,
	V = 25,
	W = 26,
	X = 27,
	Y = 28,
	Z = 29,

	Num1 = 30,
	Num2 = 31,
	Num3 = 32,
	Num4 = 33,
	Num5 = 34,
	Num6 = 35,
	Num7 = 36,
	Num8 = 37,
	Num9 = 38,
	Num0 = 39,

	RETURN = 40,
	ESCAPE = 41,
	BACKSPACE = 42,
	TAB = 43,
	SPACE = 44,

	MINUS = 45,
	EQUALS = 46,
	LEFTBRACKET = 47,
	RIGHTBRACKET = 48,
	BACKSLASH = 49,
	NONUSHASH = 50,
	SEMICOLON = 51,
	APOSTROPHE = 52,
	GRAVE = 53,
	COMMA = 54,
	PERIOD = 55,
	SLASH = 56,

	CAPSLOCK = 57,

	F1 = 58,
	F2 = 59,
	F3 = 60,
	F4 = 61,
	F5 = 62,
	F6 = 63,
	F7 = 64,
	F8 = 65,
	F9 = 66,
	F10 = 67,
	F11 = 68,
	F12 = 69,

	PRINTSCREEN = 70,
	SCROLLLOCK = 71,
	PAUSE = 72,
	INSERT = 73,
	HOME = 74,
	PAGEUP = 75,
	DELETE = 76,
	END = 77,
	PAGEDOWN = 78,

	RIGHT = 79,
	LEFT = 80,
	DOWN = 81,
	UP = 82,

	NUMLOCK = 83,
	KP_DIVIDE = 84,
	KP_MULTIPLY = 85,
	KP_MINUS = 86,
	KP_PLUS = 87,
	KP_ENTER = 88,
	KP_1 = 89,
	KP_2 = 90,
	KP_3 = 91,
	KP_4 = 92,
	KP_5 = 93,
	KP_6 = 94,
	KP_7 = 95,
	KP_8 = 96,
	KP_9 = 97,
	KP_0 = 98,
	KP_PERIOD = 99,

	NONUSBACKSLASH = 100,
	APPLICATION = 101,
	POWER = 102,
	KP_EQUALS = 103,
	F13 = 104,
	F14 = 105,
	F15 = 106,
	F16 = 107,
	F17 = 108,
	F18 = 109,
	F19 = 110,
	F20 = 111,
	F21 = 112,
	F22 = 113,
	F23 = 114,
	F24 = 115,
	EXECUTE = 116,
	HELP = 117,
	MENU = 118,
	SELECT = 119,
	STOP = 120,
	AGAIN = 121,
	UNDO = 122,
	CUT = 123,
	COPY = 124,
	PASTE = 125,
	FIND = 126,
	MUTE = 127,
	VOLUMEUP = 128,
	VOLUMEDOWN = 129,
	KP_COMMA = 133,
	KP_EQUALSAS400 = 134,

	INTERNATIONAL1 = 135,
	INTERNATIONAL2 = 136,
	INTERNATIONAL3 = 137,
	INTERNATIONAL4 = 138,
	INTERNATIONAL5 = 139,
	INTERNATIONAL6 = 140,
	INTERNATIONAL7 = 141,
	INTERNATIONAL8 = 142,
	INTERNATIONAL9 = 143,
	LANG1 = 144,
	LANG2 = 145,
	LANG3 = 146,
	LANG4 = 147,
	LANG5 = 148,
	LANG6 = 149,
	LANG7 = 150,
	LANG8 = 151,
	LANG9 = 152,

	ALTERASE = 153,
	SYSREQ = 154,
	CANCEL = 155,
	CLEAR = 156,
	PRIOR = 157,
	RETURN2 = 158,
	SEPARATOR = 159,
	OUT = 160,
	OPER = 161,
	CLEARAGAIN = 162,
	CRSEL = 163,
	EXSEL = 164,

	KP_00 = 176,
	KP_000 = 177,
	THOUSANDSSEPARATOR = 178,
	DECIMALSEPARATOR = 179,
	CURRENCYUNIT = 180,
	CURRENCYSUBUNIT = 181,
	KP_LEFTPAREN = 182,
	KP_RIGHTPAREN = 183,
	KP_LEFTBRACE = 184,
	KP_RIGHTBRACE = 185,
	KP_TAB = 186,
	KP_BACKSPACE = 187,
	KP_A = 188,
	KP_B = 189,
	KP_C = 190,
	KP_D = 191,
	KP_E = 192,
	KP_F = 193,
	KP_XOR = 194,
	KP_POWER = 195,
	KP_PERCENT = 196,
	KP_LESS = 197,
	KP_GREATER = 198,
	KP_AMPERSAND = 199,
	KP_DBLAMPERSAND = 200,
	KP_VERTICALBAR = 201,
	KP_DBLVERTICALBAR = 202,
	KP_COLON = 203,
	KP_HASH = 204,
	KP_SPACE = 205,
	KP_AT = 206,
	KP_EXCLAM = 207,
	KP_MEMSTORE = 208,
	KP_MEMRECALL = 209,
	KP_MEMCLEAR = 210,
	KP_MEMADD = 211,
	KP_MEMSUBTRACT = 212,
	KP_MEMMULTIPLY = 213,
	KP_MEMDIVIDE = 214,
	KP_PLUSMINUS = 215,
	KP_CLEAR = 216,
	KP_CLEARENTRY = 217,
	KP_BINARY = 218,
	KP_OCTAL = 219,
	KP_DECIMAL = 220,
	KP_HEXADECIMAL = 221,

	LCTRL = 224,
	LSHIFT = 225,
	LALT = 226,
	LGUI = 227,
	RCTRL = 228,
	RSHIFT = 229,
	RALT = 230,
	RGUI = 231,

	MODE = 257,

	SLEEP = 258,
	WAKE = 259,

	CHANNEL_INCREMENT = 260,
	CHANNEL_DECREMENT = 261,

	MEDIA_PLAY = 262,
	MEDIA_PAUSE = 263,
	MEDIA_RECORD = 264,
	MEDIA_FAST_FORWARD = 265,
	MEDIA_REWIND = 266,
	MEDIA_NEXT_TRACK = 267,
	MEDIA_PREVIOUS_TRACK = 268,
	MEDIA_STOP = 269,
	MEDIA_EJECT = 270,
	MEDIA_PLAY_PAUSE = 271,
	MEDIA_SELECT = 272,

	AC_NEW = 273,
	AC_OPEN = 274,
	AC_CLOSE = 275,
	AC_EXIT = 276,
	AC_SAVE = 277,
	AC_PRINT = 278,
	AC_PROPERTIES = 279,

	AC_SEARCH = 280,
	AC_HOME = 281,
	AC_BACK = 282,
	AC_FORWARD = 283,
	AC_STOP = 284,
	AC_REFRESH = 285,
	AC_BOOKMARKS = 286,

	SOFTLEFT = 287,
	SOFTRIGHT = 288,
	CALL = 289,
	ENDCALL = 290,

	RESERVED = 400,
	COUNT = 512,

}


