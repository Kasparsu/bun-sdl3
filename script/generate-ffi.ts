import fs from 'fs';
import path from 'path';

const headersDir = path.resolve(__dirname, '..', 'vendor', 'SDL3', 'install', 'include', 'SDL3');
const reportPath = path.resolve(__dirname, 'ffi-compare-report.json');
const srcFile = path.resolve(__dirname, '..', 'src', 'index.ts');

const typeMap = [
  ['const char *', 'cstring'],
  ['char const *', 'cstring'],
  ['char *', 'cstring'],
  ['const char*', 'cstring'],
  ['char const*', 'cstring'],
  ['char*', 'cstring'],
  ['void', 'void'],
  ['bool', 'bool'],
  ['float', 'f32'],
  ['double', 'f64'],
  ['Uint8', 'u8'],
  ['Uint16', 'u16'],
  ['Uint32', 'u32'],
  ['Uint64', 'u64'],
  ['Sint8', 'i8'],
  ['Sint16', 'i16'],
  ['Sint32', 'i32'],
  ['Sint64', 'i64'],
  ['int', 'i32'],
  ['unsigned int', 'u32'],
  ['size_t', 'u64'],
  ['ssize_t', 'i64'],
  ['long', 'i32'],
  ['unsigned long', 'u32'],
];

function mapType(t: string) {
  t = t.trim();
  // pointer types
  if (t.endsWith('*')) return 'pointer';
  for (const [k, v] of typeMap) {
    if (t === k) return v;
  }
  // fallback: pointer if contains whitespace and not a known type
  if (t.includes('*')) return 'pointer';
  return 'pointer';
}

function findPrototype(name: string) {
  const files = fs.readdirSync(headersDir).filter(f => f.endsWith('.h'));
  const protoRe = new RegExp('extern\\s+SDL_DECLSPEC\\s+([\\s\\S]*?)\\s+SDLCALL\\s+' + name + '\\s*\\(([^;]*)\\);', 'g');
  for (const f of files) {
    const content = fs.readFileSync(path.join(headersDir, f), 'utf8');
    let m: RegExpExecArray | null;
    while ((m = protoRe.exec(content)) !== null) {
      if (!m[1] || !m[2]) continue;
      const retType = m[1].trim().replace(/\s+/g, ' ');
      const argsText = m[2].trim();
      return { retType, argsText };
    }
  }
  return null;
}

function parseArgs(argsText: string) {
  if (!argsText || argsText === 'void') return [];
  // split by commas not in parentheses
  const parts = [];
  let depth = 0;
  let cur = '';
  for (let i=0;i<argsText.length;i++){
    const ch = argsText[i];
    if (ch==='(') depth++;
    if (ch===')') depth--;
    if (ch===',' && depth===0) { parts.push(cur.trim()); cur=''; } else cur+=ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts.map(p => {
    // strip parameter name
    // e.g., 'const SDL_Rect *rect' -> 'const SDL_Rect *'
    const tokens = p.split(/\s+/);
    if (tokens.length<=1) return p;
    // remove last token if it looks like a name (no '*' and not 'const')
    let last = tokens[tokens.length-1] ?? '';
    if (!last.includes('*') && !last.includes(')') && !/\*/.test(last) && !/\*/.test(tokens.join(' ')) ) {
      tokens.pop();
    }
    return tokens.join(' ');
  });
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const missing = report.missingInSrc;

let block = '\n  // --- Auto-generated missing SDL functions ---\n';
for (const name of missing) {
  const proto = findPrototype(name);
  if (!proto) continue;
  const args = parseArgs(proto.argsText);
  const ffiArgs = args.map(a => 'FFIType.' + mapType(a)).join(', ');
  const ret = mapType(proto.retType);
  block += `  ${name}: { args: [${ffiArgs}], returns: FFIType.${ret} },\n`;
}

fs.writeFileSync(path.resolve(__dirname, 'generated-ffi-block.txt'), block);
console.log('Wrote script/generated-ffi-block.txt');
