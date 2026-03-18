import { test, expect } from 'bun:test';
import {
  SDLTest_ResetAssertSummary,
  SDLTest_AssertPass,
  SDLTest_AssertSummaryToTestResult,
} from '../src/sdl-tests';

test('SDLTest_AssertPass increments pass counter and reports PASSED', () => {
  SDLTest_ResetAssertSummary();
  SDLTest_AssertPass('explicit pass %s', 'ok');
  const res = SDLTest_AssertSummaryToTestResult();
  expect(res).toBe(0); // TEST_RESULT_PASSED
});
