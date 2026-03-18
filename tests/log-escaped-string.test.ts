import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

describe('SDLTest_LogEscapedString', () => {
  it('escapes special characters correctly', () => {
    const logs: string[] = [];
    const origLog = (console as any).log;
    (console as any).log = (m: any) => logs.push(String(m));
    try {
      const arr = new Uint8Array([0, 0x22, 0x0a, 0x5c, 0x01, 0x41]);
      SDLTest.SDLTest_LogEscapedString('P:', arr, arr.length);
      expect(logs.length).toBe(1);
      const out = logs[0]!;
      // should contain prefix and opening quote
      expect(out.includes('P:"')).toBe(true);
      expect(out.includes('\\0')).toBe(true);
      expect(out.includes('\\"')).toBe(true);
      expect(out.includes('\\n')).toBe(true);
      expect(out.includes('\\\\')).toBe(true); // backslash becomes \\ in logged string
      expect(out.includes('\\x01')).toBe(true);
      expect(out.includes('A')).toBe(true);
    } finally {
      (console as any).log = origLog;
    }
  });

  it('truncates very long buffers with ellipses', () => {
    const logs: string[] = [];
    const origLog = (console as any).log;
    (console as any).log = (m: any) => logs.push(String(m));
    try {
      const large = new Uint8Array(4000);
      for (let i = 0; i < large.length; i++) large[i] = 0;
      SDLTest.SDLTest_LogEscapedString('T:', large, large.length);
      expect(logs.length).toBe(1);
      expect(logs[0]!.includes('...')).toBe(true);
    } finally {
      (console as any).log = origLog;
    }
  });
});
