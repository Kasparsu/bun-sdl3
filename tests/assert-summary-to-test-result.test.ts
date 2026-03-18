import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

describe('SDLTest_AssertSummaryToTestResult', () => {
  it('returns NO_ASSERT when no asserts recorded', () => {
    SDLTest.SDLTest_ResetAssertSummary();
    expect(SDLTest.SDLTest_AssertSummaryToTestResult()).toBe(2);
  });

  it('returns PASSED when only passes recorded', () => {
    SDLTest.SDLTest_ResetAssertSummary();
    SDLTest.SDLTest_AssertPass('ok');
    expect(SDLTest.SDLTest_AssertSummaryToTestResult()).toBe(0);
  });

  it('returns FAILED when any failures recorded', () => {
    SDLTest.SDLTest_ResetAssertSummary();
    SDLTest.SDLTest_AssertCheck(0, 'fail');
    expect(SDLTest.SDLTest_AssertSummaryToTestResult()).toBe(1);
  });

  it('returns FAILED if both passes and failures recorded', () => {
    SDLTest.SDLTest_ResetAssertSummary();
    SDLTest.SDLTest_AssertPass('ok');
    SDLTest.SDLTest_AssertCheck(0, 'fail');
    expect(SDLTest.SDLTest_AssertSummaryToTestResult()).toBe(1);
  });
});
