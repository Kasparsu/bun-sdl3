import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

describe('SDLTest_TextWindow basic behavior', () => {
  it('creates a text window and appends text', () => {
    const tw = SDLTest.SDLTest_TextWindowCreate(0, 0, 100, 100);
    expect(tw.numlines).toBe(1);
    expect(tw.current).toBe(0);
    SDLTest.SDLTest_TextWindowAddText(tw, 'hello');
    expect(tw.lines[0]).toBe('hello');
  });

  it('handles newline and backspace correctly', () => {
    const tw = SDLTest.SDLTest_TextWindowCreate(0, 0, 100, 100);
    SDLTest.SDLTest_TextWindowAddText(tw, 'first\nsecond');
    expect(tw.lines.length).toBe(2);
    expect(tw.current).toBe(1);
    expect(tw.lines[0]).toBe('first');
    expect(tw.lines[1]).toBe('second');

    // backspace removes last char
    SDLTest.SDLTest_TextWindowAddText(tw, '\b');
    expect(tw.lines[1]).toBe('secon');

    // remove remaining chars
    for (let i = 0; i < 5; i++) SDLTest.SDLTest_TextWindowAddText(tw, '\b');
    // now the line is empty; one more backspace removes the line and moves to previous
    SDLTest.SDLTest_TextWindowAddText(tw, '\b');
    expect(tw.current).toBe(0);
    expect(tw.lines.length).toBe(1);
    expect(tw.lines[0]).toBe('first');
  });
});
