export * as Keyboard from "./keyboard";
export * as Mouse from "./mouse";
export * as Gamepad from "./gamepad";
export * as Touch from "./touch";
import * as T from "../../types";

function pick(prefix: string) {
	const out: Record<string, any> = {};
	for (const k in T) {
		if (k.startsWith(prefix)) {
			out[k.slice(prefix.length)] = (T as any)[k];
		}
	}
	return out;
}

export const KEYMOD = pick("SDL_KMOD_");
export const BUTTON = pick("SDL_BUTTON_");
export const KEYCODE = pick("SDLK_");
export const SCANCODE = T.SDLScancode;
export const GAMEPAD_BUTTON = pick("SDL_GAMEPAD_BUTTON_");
export const GAMEPAD_AXIS = T.SDLGamepadAxis;
