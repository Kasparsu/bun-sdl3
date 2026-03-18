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

describe('SDLTest_RandomSint64 parity with SDL LCG', () => {
  it('produces the same signed 64-bit sequence as the reference LCG', () => {
    const seed = 0xCAFEBABEn;
    // compute expected sequence using two LCG steps per 64-bit output
    let s = seed;
    const expected: bigint[] = [];
    for (let i = 0; i < 6; i++) {
      const r1 = ref_next(s); s = r1.state;
      const r2 = ref_next(s); s = r2.state;
      const combined = (BigInt(r2.value) << 32n) | BigInt(r1.value);
      expected.push(BigInt.asIntN(64, combined));
    }

    SDLTest.SDLTest_FuzzerInit(seed);
    const got: bigint[] = [];
    for (let i = 0; i < 6; i++) got.push(SDLTest.SDLTest_RandomSint64());

    expect(got).toEqual(expected);

    // invocation count should be at least 12 (2 per 64-bit sample)
    expect(SDLTest.SDLTest_GetFuzzerInvocationCount()).toBeGreaterThanOrEqual(12);
  });
});
