import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

describe('SDLTest_TextWindowClear', () => {
  it('resets lines, current, and numlines', () => {
    const tw = SDLTest.SDLTest_TextWindowCreate(0, 0, 80, 25);
    // populate with two lines
    SDLTest.SDLTest_TextWindowAddText(tw, 'hello\nworld');
    expect(tw.lines.length).toBe(2);
    expect(tw.current).toBe(1);

    // clear and verify state
    SDLTest.SDLTest_TextWindowClear(tw);
    expect(tw.lines.length).toBe(1);
    expect(tw.numlines).toBe(1);
    expect(tw.current).toBe(0);
    expect(tw.lines[0]).toBe('');

    // verify we can add text after clear
    SDLTest.SDLTest_TextWindowAddText(tw, 'again');
    expect(tw.lines[0]).toBe('again');
  });
});
