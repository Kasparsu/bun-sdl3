import fs from 'fs';
import path from 'path';

const headersDir = path.resolve(__dirname, '..', 'vendor', 'SDL3', 'install', 'include', 'SDL3');
const srcFile = path.resolve(__dirname, '..', 'src', 'index.ts');

function readHeaders(dir: string) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.h'));
  const fnames = new Set<string>();
  const protoRegex = /extern\s+SDL_DECLSPEC[\s\S]*?SDLCALL\s+([A-Za-z0-9_]+)\s*\(/g;
  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    let m: RegExpExecArray | null;
    while ((m = protoRegex.exec(content)) !== null) {
      if (m[1]) fnames.add(m[1]);
    }
  }
  return fnames;
}

function readSrcFunctions(file: string) {
  const content = fs.readFileSync(file, 'utf8');
  const fnames = new Set<string>();
  const regex = /\b(SDL_[A-Za-z0-9_]+)\b/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(content)) !== null) {
    if (m[1]) fnames.add(m[1]);
  }
  return fnames;
}

function diffSets(a: Set<string>, b: Set<string>) {
  const onlyA: string[] = [];
  const onlyB: string[] = [];
  for (const x of a) if (!b.has(x)) onlyA.push(x);
  for (const x of b) if (!a.has(x)) onlyB.push(x);
  onlyA.sort();
  onlyB.sort();
  return { onlyInA: onlyA, onlyInB: onlyB };
}

try {
  if (!fs.existsSync(headersDir)) throw new Error(`Headers dir not found: ${headersDir}`);
  console.log('Reading SDL headers from', headersDir);
  const headerFns = readHeaders(headersDir);
  console.log('Found header functions:', headerFns.size);

  console.log('Reading', srcFile);
  const srcFns = readSrcFunctions(srcFile);
  console.log('Found FFI symbols in src:', srcFns.size);

  const { onlyInA, onlyInB } = diffSets(headerFns, srcFns);

  console.log('Functions present in SDL headers but NOT in src/index.ts:', onlyInA.length);
  if (onlyInA.length) console.log(onlyInA.join('\n'));
  console.log('\nFunctions present in src/index.ts but NOT found in SDL headers:', onlyInB.length);
  if (onlyInB.length) console.log(onlyInB.join('\n'));

  // write a JSON report
  const report = {
    headersCount: headerFns.size,
    srcCount: srcFns.size,
    missingInSrc: onlyInA,
    extraInSrc: onlyInB,
  };
  fs.writeFileSync(path.resolve(__dirname, 'ffi-compare-report.json'), JSON.stringify(report, null, 2));
  console.log('\nWrote report to script/ffi-compare-report.json');
} catch (e) {
  console.error('Error:', (e as any)?.message ?? String(e));
  process.exit(1);
}
