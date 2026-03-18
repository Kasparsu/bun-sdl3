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

describe('SDLTest_RandomUnitFloat parity', () => {
  it('matches SDL 24-bit float generation', () => {
    const seed = 0xABCDEF01n;
    // expected uses one LCG step
    let s = seed;
    const r = ref_next(s); s = r.state;
    const expected = (r.value >>> 8) * (1 / 16777216);

    SDLTest.SDLTest_FuzzerInit(seed);
    const got = SDLTest.SDLTest_RandomUnitFloat();

    expect(got).toBe(expected);
    // note: SDLTest_RandomUnitFloat does not increment the fuzzer invocation
  });
});
