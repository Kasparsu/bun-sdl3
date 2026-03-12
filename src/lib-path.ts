// MIT License — see LICENSE

import { suffix } from "bun:ffi";
import { existsSync, realpathSync } from "node:fs";
import { join, dirname } from "path";

const ROOT = join(import.meta.dir, "..", "..");

// In compiled binaries, import.meta.dir is /$bunfs/root/ (virtual FS).
// Use process.execPath (always the real exe path) for EXE_DIR.
const EXE_DIR = typeof Bun !== "undefined" && process.execPath
  ? dirname(realpathSync(process.execPath))
  : import.meta.dir;

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
