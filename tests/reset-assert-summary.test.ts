import { test, expect } from 'bun:test';
import {
  SDLTest_ResetAssertSummary,
  SDLTest_AssertCheck,
  SDLTest_AssertSummaryToTestResult,
} from '../src/sdl-tests';

test('SDLTest_ResetAssertSummary clears counters and reports NO_ASSERT', () => {
  SDLTest_ResetAssertSummary();

  // create a pass and a fail
  SDLTest_AssertCheck(1, 'pass');
  SDLTest_AssertCheck(0, 'fail');

  // should report FAILED
  const before = SDLTest_AssertSummaryToTestResult();
  expect(before).toBe(1);

  // reset and expect NO_ASSERT
  SDLTest_ResetAssertSummary();
  const after = SDLTest_AssertSummaryToTestResult();
  expect(after).toBe(2);
});
