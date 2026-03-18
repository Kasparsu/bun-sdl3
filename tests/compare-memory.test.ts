import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

describe('SDLTest_CompareMemory', () => {
  it('returns 0 for identical buffers and logs assertion pass', () => {
    const logs: string[] = [];
    const origLog = (console as any).log;
    (console as any).log = (m: any) => logs.push(String(m));
    try {
      const a = new Uint8Array([1, 2, 3, 4]);
      const b = new Uint8Array([1, 2, 3, 4]);
      const r = SDLTest.SDLTest_CompareMemory(a, a.length, b, b.length);
      expect(r).toBe(0);
      // should have asserted that memory blocks are the same (pass)
      expect(logs.some(l => l.includes('Memory blocks contain the same data'))).toBe(true);
    } finally {
      (console as any).log = origLog;
    }
  });

  it('returns 1 and logs hex dump when sizes differ', () => {
    const errs: string[] = [];
    const origErr = (console as any).error;
    (console as any).error = (m: any) => errs.push(String(m));
    try {
      const a = new Uint8Array([1, 2, 3]);
      const b = new Uint8Array([1, 2, 3, 4]);
      const r = SDLTest.SDLTest_CompareMemory(a, a.length, b, b.length);
      expect(r).toBe(1);
      // header and at least one hex line should be logged
      expect(errs.some(e => e.includes('actual'))).toBe(true);
      expect(errs.length).toBeGreaterThan(1);
    } finally {
      (console as any).error = origErr;
    }
  });

  it('returns 1 and logs hex dump when content differs', () => {
    const errs: string[] = [];
    const origErr = (console as any).error;
    (console as any).error = (m: any) => errs.push(String(m));
    try {
      const a = new Uint8Array([0x41, 0x42, 0x43]); // ABC
      const b = new Uint8Array([0x41, 0x00, 0x43]); // A?C
      const r = SDLTest.SDLTest_CompareMemory(a, a.length, b, b.length);
      expect(r).toBe(1);
      // should log hex bytes and printable characters
      expect(errs.some(e => e.includes('41'))).toBe(true);
      expect(errs.some(e => e.includes('|'))).toBe(true);
    } finally {
      (console as any).error = origErr;
    }
  });
});
