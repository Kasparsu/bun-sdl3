import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

// Reference LCG step matching SDL_rand_bits_r
function ref_next(stateBig: bigint) {
  const MUL = 0xff1cd035n;
  const ADD = 0x05n;
  stateBig = (stateBig * MUL + ADD) & ((1n << 64n) - 1n);
  const top32 = Number((stateBig >> 32n) & 0xFFFFFFFFn) >>> 0;
  return { state: stateBig, value: top32 };
}

describe('SDLTest_RandomUnitDouble parity', () => {
  it('matches SDL 53-bit double generation', () => {
    const seed = 0x13579BDFn;
    // compute expected using two LCG steps -> build 64-bit, take top 53 bits
    let s = seed;
    const r1 = ref_next(s); s = r1.state;
    const r2 = ref_next(s); s = r2.state;
    const combined = (BigInt(r2.value) << 32n) | BigInt(r1.value);
    const top53 = combined >> 11n; // 64 - 53 = 11
    const expected = Number(top53) * Math.pow(2, -53);

    SDLTest.SDLTest_FuzzerInit(seed);
    const got = SDLTest.SDLTest_RandomUnitDouble();

    expect(got).toBe(expected);
  });
});
