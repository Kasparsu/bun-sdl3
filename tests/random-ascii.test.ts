import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

// reference LCG helper
function ref_next(stateBig: bigint) {
  const MUL = 0xff1cd035n;
  const ADD = 0x05n;
  stateBig = (stateBig * MUL + ADD) & ((1n << 64n) - 1n);
  const top32 = Number((stateBig >> 32n) & 0xFFFFFFFFn) >>> 0;
  return { state: stateBig, value: top32 };
}

describe('SDLTest Random ASCII string generators', () => {
  it('RandomAsciiStringWithMaximumLength matches C behavior deterministically', () => {
    const seed = 0x42n;
    const maxLength = 20;

    // compute expected size and chars via reference LCG
    let s = seed;
    const r1 = ref_next(s); s = r1.state;
    let expectedSize = r1.value % (maxLength + 1);
    if (expectedSize === 0) expectedSize = 1;

    const expectedChars: number[] = [];
    for (let i = 0; i < expectedSize; i++) {
      const r = ref_next(s); s = r.state;
      // simulate SDL_rand_r: (Uint64)r.value * (range+1) >> 32
      const n = BigInt(126 - 32 + 1);
      const val = (BigInt(r.value) * n) >> 32n;
      expectedChars.push(32 + Number(val));
    }
    const expected = String.fromCharCode(...expectedChars);

    SDLTest.SDLTest_FuzzerInit(seed);
    const out = SDLTest.SDLTest_RandomAsciiStringWithMaximumLength(maxLength);
    expect(out).toBe(expected);
    // invocation count: 1 (size) + expectedSize (chars) + 1 (end increment)
    expect(SDLTest.SDLTest_GetFuzzerInvocationCount()).toBe(expectedSize + 2);
  });

  it('RandomAsciiStringOfSize uses RandomIntegerInRange and increments invocation', () => {
    const seed = 0x100n;
    const size = 5;

    // compute expected chars
    let s = seed;
    const expectedChars: number[] = [];
    for (let i = 0; i < size; i++) {
      const r = ref_next(s); s = r.state;
      const n = BigInt(126 - 32 + 1);
      const val = (BigInt(r.value) * n) >> 32n;
      expectedChars.push(32 + Number(val));
    }
    const expected = String.fromCharCode(...expectedChars);

    SDLTest.SDLTest_FuzzerInit(seed);
    const out = SDLTest.SDLTest_RandomAsciiStringOfSize(size);
    expect(out).toBe(expected);
    // invocation count: size (RandomIntegerInRange increments) + 1 (end)
    expect(SDLTest.SDLTest_GetFuzzerInvocationCount()).toBe(size + 1);
  });
});
