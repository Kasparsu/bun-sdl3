import { test, expect } from 'bun:test';
import {
  SDLTest_ResetAssertSummary,
  SDLTest_AssertCheck,
  SDLTest_LogAssertSummary,
} from '../src/sdl-tests';

test('SDLTest_AssertCheck pass and fail', () => {
  SDLTest_ResetAssertSummary();

  const pass = SDLTest_AssertCheck(1, 'This should %s', 'pass');
  expect(pass).toBe(1);

  const fail = SDLTest_AssertCheck(0, 'This should %s', 'fail');
  expect(fail).toBe(0);

  // Log summary (no assertion, just ensure it runs without throwing)
  SDLTest_LogAssertSummary();
});
