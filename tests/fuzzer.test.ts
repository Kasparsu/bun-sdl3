import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

// Local reference LCG to compute expected values (matches SDL_rand_bits_r implementation)
function ref_next(stateBig: bigint) {
  const MUL = 0xff1cd035n;
  const ADD = 0x05n;
  stateBig = (stateBig * MUL + ADD) & ((1n << 64n) - 1n);
  const top32 = Number((stateBig >> 32n) & 0xFFFFFFFFn) >>> 0;
  return { state: stateBig, value: top32 };
}

describe('SDLTest Fuzzer / RNG', () => {
  it('generates deterministic 32-bit values matching reference LCG', () => {
    const seed = 0xdeadbeefn;
    SDLTest.SDLTest_FuzzerInit(seed);
    // compute expected sequence from the same LCG
    let s = seed;
    const expected: number[] = [];
    for (let i = 0; i < 4; i++) {
      const r = ref_next(s);
      s = r.state;
      expected.push(r.value);
    }

    // call the exported RNG and compare
    SDLTest.SDLTest_FuzzerInit(seed);
    const actual: number[] = [];
    for (let i = 0; i < 4; i++) actual.push(SDLTest.SDLTest_RandomUint32());

    expect(actual).toEqual(expected);
  });

  it('increments invocation count appropriately', () => {
    const seed = 12345n;
    SDLTest.SDLTest_FuzzerInit(seed);
    expect(SDLTest.SDLTest_GetFuzzerInvocationCount()).toBe(0);
    SDLTest.SDLTest_RandomUint8();
    SDLTest.SDLTest_RandomUint16();
    SDLTest.SDLTest_RandomUint32();
    SDLTest.SDLTest_RandomUint64();
    expect(SDLTest.SDLTest_GetFuzzerInvocationCount()).toBeGreaterThanOrEqual(4);
  });
});
