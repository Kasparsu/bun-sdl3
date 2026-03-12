// MIT License — see LICENSE

import { suffix } from "bun:ffi";
import { existsSync, realpathSync } from "node:fs";
import { join, dirname } from "path";

const ROOT = join(import.meta.dir, "..");

// In compiled binaries, import.meta.dir is /$bunfs/root/ (virtual FS).
// Prefer the module's directory (import.meta.dir) when available — only use
// the executable's real path when running from Bun's virtual FS so we can
// locate bundled libs next to the executable. This avoids picking the
// consumer's process path when this package is imported.
const EXE_DIR = (() => {
  const isBunVirtual = typeof import.meta.dir === "string" && import.meta.dir.startsWith("/$bunfs/root/");
  if (isBunVirtual && typeof process !== "undefined" && process.execPath) {
    return dirname(realpathSync(process.execPath));
  }
  return import.meta.dir;
})();

export function libPath(vendorSubdir: string, libName: string): string {
  const ext = `.${suffix}`; // ".so" on linux, ".dll" on windows, ".dylib" on mac
  const prefix = ext === ".dll" ? "" : "lib";
  const fileName = `${prefix}${libName}${ext}`;

  // Compiled exe layout: lib/ next to executable
  const exePath = join(EXE_DIR, "lib", fileName);
  if (existsSync(exePath)) return exePath;

  // Release layout: flat lib/ directory
  const releasePath = join(ROOT, "lib", fileName);
  if (existsSync(releasePath)) return releasePath;

  // Dev layout: vendor/<subdir>/install/lib/
  return join(ROOT, "vendor", vendorSubdir, "install", "lib", fileName);
}
