import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

describe('SDLTest_Log and SDLTest_LogError wrappers', () => {
  it('SDLTest_Log calls LogMessage with INFO priority (console.log) and leading space', () => {
    const logs: string[] = [];
    const origLog = (console as any).log;
    (console as any).log = (m: any) => logs.push(String(m));
    try {
      SDLTest.SDLTest_Log('wrapper %s', 'ok');
      expect(logs.length).toBe(1);
      expect(logs[0]!.includes('wrapper ok')).toBe(true);
      expect(logs[0]!.startsWith(' ')).toBe(true);
    } finally {
      (console as any).log = origLog;
    }
  });

  it('SDLTest_LogError calls LogMessage with ERROR priority (console.error) and no leading space', () => {
    const errs: string[] = [];
    const origErr = (console as any).error;
    (console as any).error = (m: any) => errs.push(String(m));
    try {
      SDLTest.SDLTest_LogError('wraperr %d', 42);
      expect(errs.length).toBe(1);
      expect(errs[0]!.includes('wraperr 42')).toBe(true);
      expect(errs[0]!.startsWith(' ')).toBe(false);
    } finally {
      (console as any).error = origErr;
    }
  });
});
