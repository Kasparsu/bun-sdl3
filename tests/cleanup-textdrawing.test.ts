import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

describe('SDLTest_CleanupTextDrawing', () => {
  it('is callable and noop', () => {
    expect(() => SDLTest.SDLTest_CleanupTextDrawing()).not.toThrow();
  });
});
