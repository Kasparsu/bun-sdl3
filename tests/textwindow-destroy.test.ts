import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

describe('SDLTest_TextWindowDestroy', () => {
  it('clears internal state and is idempotent', () => {
    const tw = SDLTest.SDLTest_TextWindowCreate(0, 0, 80, 25);
    SDLTest.SDLTest_TextWindowAddText(tw, 'abc\nxyz');
    expect(tw.lines.length).toBe(2);

    SDLTest.SDLTest_TextWindowDestroy(tw);
    expect(tw.lines.length).toBe(0);
    expect(tw.numlines).toBe(0);
    expect(tw.current).toBe(0);

    // calling destroy again should be safe
    expect(() => SDLTest.SDLTest_TextWindowDestroy(tw)).not.toThrow();
  });
});
