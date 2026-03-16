import sdl from "../src/index";

try {
  const platform = sdl.SDL_GetPlatform();
  console.log("SDL platform:", platform ?? "<null>");
  const hasVersion = typeof sdl.SDL_GetVersion === "function";
  console.log("SDL_GetVersion exists:", hasVersion);
} catch (e) {
  console.error("Runtime error loading SDL:", e);
  process.exit(1);
}
