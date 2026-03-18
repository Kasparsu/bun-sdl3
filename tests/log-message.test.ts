import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

describe('SDLTest_LogMessage formatting and priority', () => {
  it('prints indented timestamp for INFO and lower, and uses console.error for ERROR', () => {
    const logs: string[] = [];
    const errs: string[] = [];
    const origLog = (console as any).log;
    const origErr = (console as any).error;
    (console as any).log = (m: any) => logs.push(String(m));
    (console as any).error = (m: any) => errs.push(String(m));

    try {
      // INFO (4) should be logged with leading space and go to console.log
      SDLTest.SDLTest_LogMessage(4, 'hello %s', 'world');
      expect(logs.length).toBe(1);
      expect(logs[0]!.includes('hello world')).toBe(true);
      expect(logs[0]!.startsWith(' ')).toBe(true);

      // ERROR (6) should be logged without leading space and go to console.error
      SDLTest.SDLTest_LogMessage(6, 'error: %d', 123);
      expect(errs.length).toBe(1);
      expect(errs[0]!.includes('error: 123')).toBe(true);
      expect(errs[0]!.startsWith(' ')).toBe(false);
    } finally {
      (console as any).log = origLog;
      (console as any).error = origErr;
    }
  });
});
