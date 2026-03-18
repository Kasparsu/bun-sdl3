// TypeScript conversions/stubs of SDL test APIs (partial, runtime-friendly for Bun)

// Simple test assert tracking
// Mirror C counters
let _assertsPassed = 0;
let _assertsFailed = 0;

// color placeholders (C uses ANSI colors in tests; keep empty here)
const COLOR_GREEN = '';
const COLOR_RED = '';
const COLOR_END = '';

export function SDLTest_Assert(assertCondition: number | boolean, assertDescription?: string, ...args: any[]): void {
  // Build message like C's SDL_vsnprintf
  const logMessage = formatString(assertDescription, args);
  const res = SDLTest_AssertCheck(assertCondition ? 1 : 0, '%s', logMessage);
  if (!res) {
    // emulate SDL_assert behavior by throwing
    throw new Error(`Assertion failed: ${logMessage}`);
  }
}

export function SDLTest_AssertCheck(assertCondition: number | boolean, assertDescription?: string, ...args: any[]): number {
  const logMessage = formatString(assertDescription, args);
  if (assertCondition === 0 || assertCondition === false) {
    _assertsFailed++;
    SDLTest_LogAssertMessage(false, logMessage);
  } else {
    _assertsPassed++;
    SDLTest_LogAssertMessage(true, logMessage);
  }
  return assertCondition ? 1 : 0;
}

export function SDLTest_AssertPass(assertDescription?: string, ...args: any[]): void {
  const logMessage = formatString(assertDescription, args);
  _assertsPassed++;
  SDLTest_LogAssertMessage(true, logMessage);
}

export function SDLTest_ResetAssertSummary(): void {
  _assertsPassed = 0;
  _assertsFailed = 0;
}

export function SDLTest_LogAssertSummary(): void {
  const totalAsserts = _assertsPassed + _assertsFailed;
  const success = _assertsFailed === 0;
  SDLTest_LogMessage(success ? 0 : 2,
    "Assert Summary: Total=%d %s Passed=%d %s  %s Failed=%d %s",
    totalAsserts, COLOR_GREEN, _assertsPassed, COLOR_END, success ? COLOR_GREEN : COLOR_RED, _assertsFailed, COLOR_END);
}

export function SDLTest_AssertSummaryToTestResult(): number {
  if (_assertsFailed > 0) {
    return 1; // TEST_RESULT_FAILED
  } else {
    if (_assertsPassed > 0) {
      return 0; // TEST_RESULT_PASSED
    } else {
      return 2; // TEST_RESULT_NO_ASSERT
    }
  }
}

function SDLTest_LogAssertMessage(success: boolean, assertion: string) {
  const priority = success ? 0 : 2;
  const color = success ? COLOR_GREEN : COLOR_RED;
  const message = success ? 'Passed' : 'Failed';
  SDLTest_LogMessage(priority, `Assert '%s': %s%s%s`, assertion, color, message, COLOR_END);
}

// Logging helpers
function timestamp(): string {
  // Match C's SDLTest_TimestampToString("%x %X") using locale date and time
  const now = new Date();
  try {
    return now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
  } catch (_) {
    return now.toISOString();
  }
}

// Very small printf-style formatter used to emulate SDL_vsnprintf behaviour
function formatString(fmt: string | undefined, args: any[]): string {
  if (!fmt) return '';
  // handle simple %s, %d, %i, %u, %x, %X, %f
  let out = '';
  let argIndex = 0;
  for (let i = 0; i < fmt.length; i++) {
    const ch = fmt[i];
    if (ch === '%' && i + 1 < fmt.length) {
      const spec = fmt[++i];
      const val = args[argIndex++];
      switch (spec) {
        case 's': out += (val === undefined ? '(null)' : String(val)); break;
        case 'd':
        case 'i': out += Number(val) | 0; break;
        case 'u': out += Math.abs(Number(val)) >>> 0; break;
        case 'x': out += (Number(val) >>> 0).toString(16); break;
        case 'X': out += (Number(val) >>> 0).toString(16).toUpperCase(); break;
        case 'f': out += parseFloat(val).toString(); break;
        case '%': out += '%'; argIndex--; break;
        default:
          // unknown spec, just print it literally
          out += '%' + spec;
          break;
      }
    } else {
      out += ch;
    }
  }
  // append any remaining args separated by spaces (approx printf behavior when extra args present)
  while (argIndex < args.length) {
    out += ' ' + String(args[argIndex++]);
  }
  return out;
}

export function SDLTest_LogMessage(priority: number, fmt?: string, ...args: any[]): void {
  const msg = formatString(fmt, args);
  const ts = timestamp();
  // In C: messages with lower priority are slightly indented (a leading space)
  // Threshold is SDL_LOG_PRIORITY_INFO (numeric value 4). Priorities > INFO are higher severity.
  const out = (priority > 4) ? `${ts}: ${msg}` : ` ${ts}: ${msg}`;
  if (priority > 4) {
    console.error(out);
  } else {
    console.log(out);
  }
}

export function SDLTest_Log(fmt?: string, ...args: any[]): void {
  // SDL_LOG_PRIORITY_INFO == 4
  SDLTest_LogMessage(4, fmt, ...args);
}

export function SDLTest_LogError(fmt?: string, ...args: any[]): void {
  // SDL_LOG_PRIORITY_ERROR == 6
  SDLTest_LogMessage(6, fmt, ...args);
}

export function SDLTest_LogEscapedString(prefix: string, buffer: ArrayBuffer | Uint8Array | null, size?: number): void {
  const arr = buffer ? (buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer)) : null;
  const maxLen = 3584; // mimic SDLTEST_MAX_LOGMESSAGE_LENGTH-ish
  let logMessage = '"';
  if (arr) {
    const n = size ?? arr.length;
    const limit = Math.min(n, arr.length);
    for (let i = 0; i < limit; i++) {
      const c = arr[i] ?? 0;
      switch (c) {
        case 0: logMessage += '\\0'; break;
        case 0x22: logMessage += '\\"'; break; // '"'
        case 0x0a: logMessage += '\\n'; break;
        case 0x0d: logMessage += '\\r'; break;
        case 0x09: logMessage += '\\t'; break;
        case 0x0c: logMessage += '\\f'; break;
        case 0x08: logMessage += '\\b'; break;
        case 0x5c: logMessage += '\\\\'; break; // '\'
        default:
          if (c >= 0x20 && c <= 0x7e) {
            logMessage += String.fromCharCode(c);
          } else {
            const hi = ((c >> 4) & 0xF).toString(16);
            const lo = (c & 0xF).toString(16);
            logMessage += `\\x${hi}${lo}`;
          }
          break;
      }
      if (logMessage.length > maxLen - 10) { logMessage += '...'; break; }
    }
    if (!logMessage.endsWith('...')) logMessage += '"';
  } else {
    logMessage = '(nil)';
  }
  SDLTest_Log('%s%s', prefix, logMessage);
}

// Simple memory compare
export function SDLTest_CompareMemory(actual: Uint8Array | ArrayBuffer, size_actual: number, reference: Uint8Array | ArrayBuffer, size_reference: number): number {
  const a = actual instanceof Uint8Array ? actual : new Uint8Array(actual, 0, size_actual);
  const b = reference instanceof Uint8Array ? reference : new Uint8Array(reference, 0, size_reference);
  const WIDTH = 16;

  // Assert sizes equal (logs via SDLTest_AssertCheck)
  SDLTest_AssertCheck(size_actual === size_reference, `Sizes of memory blocks must be equal (actual=%d expected=%d)`, size_actual, size_reference);
  if (size_actual === size_reference) {
    const equals = (function () {
      if (size_actual !== size_reference) return false;
      for (let i = 0; i < size_actual; i++) if ((a[i] ?? 0) !== (b[i] ?? 0)) return false;
      return true;
    })();
    SDLTest_AssertCheck(equals, 'Memory blocks contain the same data');
    if (equals) return 0;
  }

  // Prepare header line with column names
  const size_max = Math.max(size_actual, size_reference);
  const columns: { header: string; data: Uint8Array; size: number }[] = [
    { header: 'actual', data: a, size: size_actual },
    { header: 'reference', data: b, size: size_reference },
  ];

  // Build header line similar to C implementation
  const headerParts: string[] = [];
  headerParts.push(' '.repeat(16));
  for (let i = 0; i < columns.length; i++) {
    headerParts.push(' ' + columns[i]!.header.padEnd(4 * WIDTH + 2, ' '));
  }
  SDLTest_LogError('%s', headerParts.join(''));

  for (let i = 0; i < size_max; i += WIDTH) {
    let parts: string[] = [];
    // address
    parts.push((i >>> 0).toString(16).padStart(16, '0'));

    for (let col = 0; col < columns.length; col++) {
      const colData = columns[col]!.data;
      // hex bytes
      let hexPart = '';
      for (let j = 0; j < WIDTH; j++) {
        if (i + j < columns[col]!.size) {
          hexPart += ' ' + ((colData[i + j] ?? 0).toString(16).padStart(2, '0'));
        } else {
          hexPart += '   ';
        }
      }
      parts.push(hexPart + ' ');

      // printable chars
      let charPart = '';
      for (let j = 0; j < WIDTH; j++) {
        if (i + j < columns[col]!.size) {
          const c = colData[i + j] ?? 0;
          const ch = (c >= 0x20 && c <= 0x7e) ? String.fromCharCode(c) : '.';
          charPart += ch;
        } else {
          charPart += ' ';
        }
      }
      parts.push(charPart);
      if (col < columns.length - 1) parts.push(' |');
    }

    SDLTest_LogError('%s', parts.join(''));
  }

  return 1;
}

// CRC32 implementation
export type SDLTest_Crc32Context = { table: Uint32Array | null };

export function SDLTest_Crc32Init(crcContext: SDLTest_Crc32Context): boolean {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c >>> 0;
  }
  crcContext.table = table;
  return true;
}

export function SDLTest_Crc32Calc(crcContext: SDLTest_Crc32Context, inBuf: Uint8Array, inLen: number, crc32Out: { value?: number }): boolean {
  if (!crcContext.table) return false;
  const table = crcContext.table! as Uint32Array;
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < inLen && i < inBuf.length; i++) {
    const v = inBuf[i] ?? 0;
    const idx = (crc ^ v) & 0xFF;
    const tv = table[idx] ?? 0;
    crc = (crc >>> 8) ^ tv;
  }
  crc = (crc ^ 0xFFFFFFFF) >>> 0;
  crc32Out.value = crc;
  return true;
}

export function SDLTest_Crc32CalcBuffer(crcContext: SDLTest_Crc32Context, inBuf: Uint8Array, inLen: number, crc32Out: { value?: number }): boolean {
  return SDLTest_Crc32Calc(crcContext, inBuf, inLen, crc32Out);
}

export function SDLTest_Crc32Done(crcContext: SDLTest_Crc32Context): boolean {
  crcContext.table = null;
  return true;
}

// Simple seeded PRNG for fuzzer (xorshift64*)
// Simple seeded PRNG for fuzzer using SDL's LCG (SDL_rand_bits_r)
let _fuzzer_state = BigInt(0);
let _fuzzer_invocations = 0;

export function SDLTest_FuzzerInit(execKey: number | bigint): void {
  _fuzzer_state = BigInt(execKey) || BigInt(Date.now());
  // No special zero handling in C init here; keep as-is
  _fuzzer_invocations = 0;
}

function SDL_rand_bits_r_state(): number {
  // state = state * 0xff1cd035 + 0x05; return top 32 bits
  const MUL = 0xff1cd035n;
  const ADD = 0x05n;
  _fuzzer_state = (_fuzzer_state * MUL + ADD) & ((1n << 64n) - 1n);
  const top32 = Number((_fuzzer_state >> 32n) & 0xFFFFFFFFn);
  return top32 >>> 0;
}

export function SDLTest_RandomUint32(): number {
  _fuzzer_invocations++;
  return SDL_rand_bits_r_state();
}

export function SDLTest_RandomUint8(): number { return SDLTest_RandomUint32() >>> 24; }
export function SDLTest_RandomUint16(): number { return SDLTest_RandomUint32() >>> 16; }
export function SDLTest_RandomSint32(): number { return SDLTest_RandomUint32() | 0; }
export function SDLTest_RandomUint64(): bigint {
  // Match C: increment once here, then call two RandomUint32 calls
  // RandomUint32 increments the invocation count itself, resulting in 3 total increments.
  _fuzzer_invocations++;
  const low = BigInt(SDLTest_RandomUint32());
  const high = BigInt(SDLTest_RandomUint32());
  return (high << 32n) | low;
}
export function SDLTest_RandomSint64(): bigint { return BigInt.asIntN(64, SDLTest_RandomUint64()); }
export function SDLTest_RandomUnitFloat(): number {
  // Match C's SDL_randf_r: use 24 bits from the top of SDL_rand_bits
  const top32 = SDL_rand_bits_r_state();
  return (top32 >>> 8) * (1 / 16777216);
}

export function SDLTest_RandomUnitDouble(): number {
  // Match C: take top 53 bits from a 64-bit random and scale by 2^-53
  const v64 = SDLTest_RandomUint64();
  const top53 = v64 >> 11n; // 64 - 53 = 11
  return Number(top53) * Math.pow(2, -53);
}

export function SDLTest_RandomAsciiString(): string | null { return SDLTest_RandomAsciiStringWithMaximumLength(255); }
export function SDLTest_RandomAsciiStringWithMaximumLength(maxLength: number): string | null {
  if (maxLength < 1) return null;
  // size is SDLTest_RandomUint32() % (maxLength + 1); if 0 -> 1
  const r = SDLTest_RandomUint32();
  let size = r % (maxLength + 1);
  if (size === 0) size = 1;
  return SDLTest_RandomAsciiStringOfSize(size);
}
export function SDLTest_RandomAsciiStringOfSize(size: number): string | null {
  if (size < 1) return null;
  const chars: string[] = [];
  for (let i = 0; i < size; i++) {
    const c = SDLTest_RandomIntegerInRange(32, 126);
    chars.push(String.fromCharCode(c));
  }
  // C increments fuzzerInvocationCounter once at the end of this function
  _fuzzer_invocations++;
  return chars.join('');
}

export function SDLTest_RandomIntegerInRange(min: number, max: number): number {
  _fuzzer_invocations++;
  if (min === max) return min;
  if (min > max) {
    const tmp = min; min = max; max = tmp;
  }
  const range = BigInt(max) - BigInt(min);
  // SDL uses SDL_MAX_SINT32 boundary; use 0x7fffffff
  if (range < 0x7fffffffn) {
    const n = range + 1n;
    const v = BigInt(SDL_rand_bits_r_state());
    const val = (v * n) >> 32n;
    return min + Number(val);
  } else {
    const low = BigInt(SDL_rand_bits_r_state());
    const high = BigInt(SDL_rand_bits_r_state());
    const add = (high << 32n) | low;
    return min + Number(add % (range + 1n));
  }
}
export function SDLTest_GetFuzzerInvocationCount(): number { return _fuzzer_invocations; }

// Minimal TextWindow implementation
export class SDLTest_TextWindow {
  rect = { x: 0, y: 0, w: 0, h: 0 };
  current = 0;
  numlines = 0;
  lines: string[] = [];
  constructor(x = 0, y = 0, w = 0, h = 0) { this.rect = { x, y, w, h }; this.lines = ['']; this.numlines = 1; }
}

export function SDLTest_TextWindowCreate(x: number, y: number, w: number, h: number): SDLTest_TextWindow { return new SDLTest_TextWindow(x, y, w, h); }
export function SDLTest_TextWindowDisplay(textwin: SDLTest_TextWindow, renderer?: any): void { /* renderer-specific; noop */ }

function _textwindow_push_char(textwin: SDLTest_TextWindow, ch: string) {
  if (ch === '\n') {
    textwin.lines.push('');
    textwin.current = textwin.lines.length - 1;
    textwin.numlines = textwin.lines.length;
    return;
  }
  if (ch === '\b') {
    const cur = textwin.current;
    const curLine = textwin.lines[cur] ?? '';
    if (curLine.length > 0) {
      textwin.lines[cur] = curLine.slice(0, -1);
    } else if (cur > 0) {
      // remove current empty line and move to previous line end
      textwin.lines.splice(cur, 1);
      textwin.current = cur - 1;
      textwin.numlines = textwin.lines.length;
    }
    return;
  }
  textwin.lines[textwin.current] = (textwin.lines[textwin.current] || '') + ch;
}

export function SDLTest_TextWindowAddText(textwin: SDLTest_TextWindow, fmt: string, ...args: any[]): void {
  const s = fmt ? formatString(fmt, args) : '';
  for (let i = 0; i < s.length; i++) {
    _textwindow_push_char(textwin, s.charAt(i));
  }
}

export function SDLTest_TextWindowAddTextWithLength(textwin: SDLTest_TextWindow, text: string, len: number): void {
  const s = text.substring(0, len);
  for (let i = 0; i < s.length; i++) _textwindow_push_char(textwin, s.charAt(i));
}
export function SDLTest_TextWindowClear(textwin: SDLTest_TextWindow): void { textwin.lines = ['']; textwin.current = 0; textwin.numlines = 1; }
export function SDLTest_TextWindowDestroy(textwin: SDLTest_TextWindow): void {
  // In C this frees the structure; emulate by clearing internal fields so
  // subsequent JS code doesn't hold onto large buffers and tests can verify
  // the destroyed state.
  textwin.lines = [];
  textwin.current = 0;
  textwin.numlines = 0;
  textwin.rect = { x: 0, y: 0, w: 0, h: 0 };
}
export function SDLTest_CleanupTextDrawing(): void { /* noop */ }

// Minimal harness runner stubs
export function SDLTest_GenerateRunSeed(buffer: string[] | null, length: number): string | null {
  if (!buffer) {
    // Mirror C: NULL buffer -> return NULL
    return null;
  }
  if (length <= 0) {
    // Mirror C's sanity checks
    return null;
  }
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let out = '';
  for (let i = 0; i < length; i++) {
    const ch = chars.charAt(Math.floor(Math.random() * chars.length));
    out += ch;
    // write into provided buffer array to emulate C char buffer
    buffer[i] = ch;
  }
  // emulate C null-terminator slot if available
  buffer[length] = '';
  return out;
}

export function SDLTest_CreateTestSuiteRunner(state: any, testSuites: any[]): any {
  if (!state) {
    SDLTest_LogError('SDL Test Suites require a common state');
    return null;
  }

  const runner: any = {
    user: {
      testSuites: testSuites || null,
      runSeed: null,
      execKey: 0n,
      filter: null,
      testIterations: 1,
      randomOrder: false,
    },
    argparser: { parse_arguments: null, usage: null, data: null, next: null },
    _ownerArgparser: null,
  };

  runner.argparser.parse_arguments = null;
  runner.argparser.usage = null;
  runner.argparser.data = runner;

  // Attach into state's argparser linked list if present
  if (state.argparser) {
    runner._ownerArgparser = state.argparser;
    let ap = state.argparser;
    while (ap.next) ap = ap.next;
    ap.next = runner.argparser;
  }

  return runner;
}

export function SDLTest_DestroyTestSuiteRunner(runner: any): void {
  if (!runner) return;
  try {
    // free user-owned strings
    runner.user.filter = null;
    runner.user.runSeed = null;

    // detach argparser from owner chain if we recorded it
    const owner = runner._ownerArgparser;
    if (owner) {
      let prev: any = null;
      let ap = owner;
      while (ap) {
        if (ap.next === runner.argparser) {
          ap.next = runner.argparser.next || null;
          break;
        }
        prev = ap;
        ap = ap.next;
      }
    }

    // clear fields
    runner.user.testSuites = null;
    runner.argparser = null;
    runner._ownerArgparser = null;
  } catch (_) {
    // noop
  }
}

export function SDLTest_ExecuteTestSuiteRunner(runner: any): number {
  if (!runner) {
    SDLTest_LogError('Runner must not be NULL.');
    return 2;
  }
  // Minimal stub: ensure iterations sane and return 0 (all passed)
  if (!runner.user) return 2;
  if (!runner.user.testIterations || runner.user.testIterations < 1) runner.user.testIterations = 1;
  return 0;
}

// MD5 implementation (ported from SDL C code) for GenerateExecKey
type SDLTest_Md5Context = {
  i0: number;
  i1: number;
  buf: number[]; // 4
  in: Uint8Array; // 64
  digest: Uint8Array; // 16
};

const MD5PADDING = new Uint8Array([0x80, ...new Array(63).fill(0)]);

function _u32(v: number) { return v >>> 0; }
function _rotate_left(x: number, n: number) { return _u32((x << n) | (x >>> (32 - n))); }

function SDLTest_Md5Init(ctx: SDLTest_Md5Context) {
  ctx.i0 = 0;
  ctx.i1 = 0;
  ctx.buf = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];
  ctx.in = new Uint8Array(64);
  ctx.digest = new Uint8Array(16);
}

function SDLTest_Md5Transform(buf: number[], inw: number[]) {
  // Defensive copies to satisfy strict TS and emulate C uint32 behavior.
  const buf0 = buf[0] ?? 0;
  const buf1 = buf[1] ?? 0;
  const buf2 = buf[2] ?? 0;
  const buf3 = buf[3] ?? 0;
  let a = buf0, b = buf1, c = buf2, d = buf3;

  const inwLocal: number[] = new Array(16).fill(0);
  for (let i = 0; i < 16; i++) inwLocal[i] = inw[i] ?? 0;
  const IW = (idx: number) => inwLocal[idx] ?? 0;

  const F = (x:number,y:number,z:number) => _u32((x & y) | (~x & z));
  const G = (x:number,y:number,z:number) => _u32((x & z) | (y & ~z));
  const H = (x:number,y:number,z:number) => _u32(x ^ y ^ z);
  const I = (x:number,y:number,z:number) => _u32(y ^ (x | ~z));

  const FF = (aV:number,bV:number,cV:number,dV:number,x:number,s:number,ac:number) => {
    aV = _u32(aV + F(bV,cV,dV) + x + ac);
    aV = _rotate_left(aV, s);
    aV = _u32(aV + bV);
    return aV;
  };
  const GG = (aV:number,bV:number,cV:number,dV:number,x:number,s:number,ac:number) => {
    aV = _u32(aV + G(bV,cV,dV) + x + ac);
    aV = _rotate_left(aV, s);
    aV = _u32(aV + bV);
    return aV;
  };
  const HH = (aV:number,bV:number,cV:number,dV:number,x:number,s:number,ac:number) => {
    aV = _u32(aV + H(bV,cV,dV) + x + ac);
    aV = _rotate_left(aV, s);
    aV = _u32(aV + bV);
    return aV;
  };
  const II = (aV:number,bV:number,cV:number,dV:number,x:number,s:number,ac:number) => {
    aV = _u32(aV + I(bV,cV,dV) + x + ac);
    aV = _rotate_left(aV, s);
    aV = _u32(aV + bV);
    return aV;
  };

  // Round 1
  a = FF(a,b,c,d,IW(0),7,3614090360);
  d = FF(d,a,b,c,IW(1),12,3905402710);
  c = FF(c,d,a,b,IW(2),17,606105819);
  b = FF(b,c,d,a,IW(3),22,3250441966);
  a = FF(a,b,c,d,IW(4),7,4118548399);
  d = FF(d,a,b,c,IW(5),12,1200080426);
  c = FF(c,d,a,b,IW(6),17,2821735955);
  b = FF(b,c,d,a,IW(7),22,4249261313);
  a = FF(a,b,c,d,IW(8),7,1770035416);
  d = FF(d,a,b,c,IW(9),12,2336552879);
  c = FF(c,d,a,b,IW(10),17,4294925233);
  b = FF(b,c,d,a,IW(11),22,2304563134);
  a = FF(a,b,c,d,IW(12),7,1804603682);
  d = FF(d,a,b,c,IW(13),12,4254626195);
  c = FF(c,d,a,b,IW(14),17,2792965006);
  b = FF(b,c,d,a,IW(15),22,1236535329);

  // Round 2
  a = GG(a,b,c,d,IW(1),5,4129170786);
  d = GG(d,a,b,c,IW(6),9,3225465664);
  c = GG(c,d,a,b,IW(11),14,643717713);
  b = GG(b,c,d,a,IW(0),20,3921069994);
  a = GG(a,b,c,d,IW(5),5,3593408605);
  d = GG(d,a,b,c,IW(10),9,38016083);
  c = GG(c,d,a,b,IW(15),14,3634488961);
  b = GG(b,c,d,a,IW(4),20,3889429448);
  a = GG(a,b,c,d,IW(9),5,568446438);
  d = GG(d,a,b,c,IW(14),9,3275163606);
  c = GG(c,d,a,b,IW(3),14,4107603335);
  b = GG(b,c,d,a,IW(8),20,1163531501);
  a = GG(a,b,c,d,IW(13),5,2850285829);
  d = GG(d,a,b,c,IW(2),9,4243563512);
  c = GG(c,d,a,b,IW(7),14,1735328473);
  b = GG(b,c,d,a,IW(12),20,2368359562);

  // Round 3
  a = HH(a,b,c,d,IW(5),4,4294588738);
  d = HH(d,a,b,c,IW(8),11,2272392833);
  c = HH(c,d,a,b,IW(11),16,1839030562);
  b = HH(b,c,d,a,IW(14),23,4259657740);
  a = HH(a,b,c,d,IW(1),4,2763975236);
  d = HH(d,a,b,c,IW(4),11,1272893353);
  c = HH(c,d,a,b,IW(7),16,4139469664);
  b = HH(b,c,d,a,IW(10),23,3200236656);
  a = HH(a,b,c,d,IW(13),4,681279174);
  d = HH(d,a,b,c,IW(0),11,3936430074);
  c = HH(c,d,a,b,IW(3),16,3572445317);
  b = HH(b,c,d,a,IW(6),23,76029189);
  a = HH(a,b,c,d,IW(9),4,3654602809);
  d = HH(d,a,b,c,IW(12),11,3873151461);
  c = HH(c,d,a,b,IW(15),16,530742520);
  b = HH(b,c,d,a,IW(2),23,3299628645);

  // Round 4
  a = II(a,b,c,d,IW(0),6,4096336452);
  d = II(d,a,b,c,IW(7),10,1126891415);
  c = II(c,d,a,b,IW(14),15,2878612391);
  b = II(b,c,d,a,IW(5),21,4237533241);
  a = II(a,b,c,d,IW(12),6,1700485571);
  d = II(d,a,b,c,IW(3),10,2399980690);
  c = II(c,d,a,b,IW(10),15,4293915773);
  b = II(b,c,d,a,IW(1),21,2240044497);
  a = II(a,b,c,d,IW(8),6,1873313359);
  d = II(d,a,b,c,IW(15),10,4264355552);
  c = II(c,d,a,b,IW(6),15,2734768916);
  b = II(b,c,d,a,IW(13),21,1309151649);
  a = II(a,b,c,d,IW(4),6,4149444226);
  d = II(d,a,b,c,IW(11),10,3174756917);
  c = II(c,d,a,b,IW(2),15,718787259);
  b = II(b,c,d,a,IW(9),21,3951481745);

  buf[0] = _u32((buf[0] ?? 0) + a);
  buf[1] = _u32((buf[1] ?? 0) + b);
  buf[2] = _u32((buf[2] ?? 0) + c);
  buf[3] = _u32((buf[3] ?? 0) + d);
}

function SDLTest_Md5Update(ctx: SDLTest_Md5Context, inBuf: Uint8Array) {
  if (!inBuf || inBuf.length < 1) return;
  let inLen = inBuf.length;
  let mdi = ((ctx.i0 >>> 3) & 0x3F) | 0;
  // update number of bits
  const addBits = (inLen << 3) >>> 0;
  if ((ctx.i0 + addBits) >>> 0 < ctx.i0) ctx.i1++;
  ctx.i0 = _u32(ctx.i0 + addBits);
  ctx.i1 = _u32(ctx.i1 + (inLen >>> 29));

  let i = 0;
  while (inLen--) {
    ctx.in[mdi++] = (inBuf[i++] ?? 0);
    if (mdi === 64) {
      const inw: number[] = new Array(16).fill(0);
      for (let j = 0, jj = 0; j < 16; j++, jj += 4) {
        const b0 = ctx.in[jj] ?? 0;
        const b1 = ctx.in[jj + 1] ?? 0;
        const b2 = ctx.in[jj + 2] ?? 0;
        const b3 = ctx.in[jj + 3] ?? 0;
        inw[j] = (b0) | (b1 << 8) | (b2 << 16) | (b3 << 24);
      }
      SDLTest_Md5Transform(ctx.buf, inw);
      mdi = 0;
    }
  }
}

function SDLTest_Md5Final(ctx: SDLTest_Md5Context) {
  const inw: number[] = new Array(16).fill(0);
  inw[14] = ctx.i0;
  inw[15] = ctx.i1;
  let mdi = ((ctx.i0 >>> 3) & 0x3F) | 0;
  const padLen = mdi < 56 ? (56 - mdi) : (120 - mdi);
  SDLTest_Md5Update(ctx, MD5PADDING.slice(0, padLen));
  for (let j = 0, jj = 0; j < 14; j++, jj += 4) {
    const b0 = ctx.in[jj] ?? 0;
    const b1 = ctx.in[jj + 1] ?? 0;
    const b2 = ctx.in[jj + 2] ?? 0;
    const b3 = ctx.in[jj + 3] ?? 0;
    inw[j] = (b0) | (b1 << 8) | (b2 << 16) | (b3 << 24);
  }
  SDLTest_Md5Transform(ctx.buf, inw);
  for (let i = 0, ii = 0; i < 4; i++, ii += 4) {
    const v = (ctx.buf[i] ?? 0) >>> 0;
    ctx.digest[ii] = v & 0xFF;
    ctx.digest[ii + 1] = (v >>> 8) & 0xFF;
    ctx.digest[ii + 2] = (v >>> 16) & 0xFF;
    ctx.digest[ii + 3] = (v >>> 24) & 0xFF;
  }
}

export function SDLTest_GenerateExecKey(runSeed: string | null, suiteName: string | null, testName: string | null, iteration: number): bigint {
  if (!runSeed || runSeed.length === 0) { SDLTest_LogError('Invalid runSeed string.'); return 0n; }
  if (!suiteName || suiteName.length === 0) { SDLTest_LogError('Invalid suiteName string.'); return 0n; }
  if (!testName || testName.length === 0) { SDLTest_LogError('Invalid testName string.'); return 0n; }
  if (iteration <= 0) { SDLTest_LogError('Invalid iteration count.'); return 0n; }

  const iterationString = String(iteration);
  const combined = runSeed + suiteName + testName + iterationString;
  const encoder = new TextEncoder();
  const bytes = encoder.encode(combined);

  const ctx: SDLTest_Md5Context = { i0:0, i1:0, buf: [0,0,0,0], in: new Uint8Array(64), digest: new Uint8Array(16) };
  SDLTest_Md5Init(ctx);
  SDLTest_Md5Update(ctx, bytes);
  SDLTest_Md5Final(ctx);

  // Interpret first 8 bytes as little-endian Uint64
  let key = 0n;
  for (let i = 0; i < 8; i++) {
    key |= (BigInt(ctx.digest[i] ?? 0) << (8n * BigInt(i)));
  }
  return key;
}
