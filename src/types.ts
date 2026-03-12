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

