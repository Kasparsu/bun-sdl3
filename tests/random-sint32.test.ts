import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

describe('SDLTest_RandomSint32 parity with SDL LCG', () => {
  it('produces the same signed 32-bit sequence as the reference LCG', () => {
    const execKey = 0x12345678n;
    SDLTest.SDLTest_FuzzerInit(execKey);

    // reference state emulator
    let state = execKey & ((1n << 64n) - 1n);
    const MUL = 0xff1cd035n;
    const ADD = 0x05n;

    const iterations = 10;
    const got: number[] = [];
    for (let i = 0; i < iterations; i++) {
      const v = SDLTest.SDLTest_RandomSint32();
      got.push(v);
    }

    // compute expected sequence
    const expected: number[] = [];
    for (let i = 0; i < iterations; i++) {
      state = (state * MUL + ADD) & ((1n << 64n) - 1n);
      const top32 = Number((state >> 32n) & 0xFFFFFFFFn);
      expected.push(top32 | 0);
    }

    expect(got.length).toBe(expected.length);
    for (let i = 0; i < iterations; i++) {
      expect(got[i]).toBe(expected[i]);
    }

    // invocation count should equal iterations
    expect(SDLTest.SDLTest_GetFuzzerInvocationCount()).toBe(iterations);
  });
});
