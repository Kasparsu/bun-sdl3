import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

describe('SDLTest_GenerateRunSeed', () => {
  it('generates seeds of requested lengths and handles NULL/negative inputs', () => {
    const buf: string[] = new Array(64);

    for (let i = 1; i <= 10; i += 3) {
      const result = SDLTest.SDLTest_GenerateRunSeed(buf, i);
      expect(result).not.toBeNull();
      if (result) expect(result.length).toBe(i);
    }

    // NULL buffer should return null
    const resNull = SDLTest.SDLTest_GenerateRunSeed(null, 10);
    expect(resNull).toBeNull();

    // Negative and zero lengths should return null
    for (let j = -2; j <= 0; j++) {
      const r = SDLTest.SDLTest_GenerateRunSeed(buf, j);
      expect(r).toBeNull();
    }
  });
});
