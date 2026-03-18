import { test, expect } from 'bun:test';
import {
  SDLTest_ResetAssertSummary,
  SDLTest_AssertCheck,
  SDLTest_LogAssertSummary,
} from '../src/sdl-tests';

test('SDLTest_LogAssertSummary outputs correct summary', () => {
  SDLTest_ResetAssertSummary();

  // produce one pass and one fail
  SDLTest_AssertCheck(1, 'pass');
  SDLTest_AssertCheck(0, 'fail');

  // capture console output
  const logs: string[] = [];
  const origLog = console.log;
  const origError = console.error;
  (console as any).log = (...args: any[]) => { logs.push(String(args.join(' '))); };
  (console as any).error = (...args: any[]) => { logs.push(String(args.join(' '))); };

  try {
    SDLTest_LogAssertSummary();
  } finally {
    console.log = origLog;
    console.error = origError;
  }

  const joined = logs.join('\n');
  expect(joined).toMatch(/Assert Summary:\s*Total=2/);
  expect(joined).toMatch(/Passed=1/);
  expect(joined).toMatch(/Failed=1/);
});
