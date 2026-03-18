import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

describe('SDLTest_GenerateExecKey', () => {
  it('returns deterministic non-zero key for valid inputs and zero for invalid', () => {
    const runSeed = 'SEED123';
    const suite = 'SuiteName';
    const test = 'TestName';
    const iter = 1;

    const k1 = SDLTest.SDLTest_GenerateExecKey(runSeed, suite, test, iter);
    const k2 = SDLTest.SDLTest_GenerateExecKey(runSeed, suite, test, iter);
    expect(k1).toBe(k2);
    expect(k1).not.toBe(0n);

    // invalid inputs
    expect(SDLTest.SDLTest_GenerateExecKey('', suite, test, iter)).toBe(0n);
    expect(SDLTest.SDLTest_GenerateExecKey(runSeed, '', test, iter)).toBe(0n);
    expect(SDLTest.SDLTest_GenerateExecKey(runSeed, suite, '', iter)).toBe(0n);
    expect(SDLTest.SDLTest_GenerateExecKey(runSeed, suite, test, 0)).toBe(0n);
  });
});
