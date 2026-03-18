import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

describe('SDLTest TestSuiteRunner helpers', () => {
  it('creates a runner and attaches argparser to state', () => {
    const state: any = { argparser: { next: null } };
    const suites = [{ name: 's1' }];
    const runner = SDLTest.SDLTest_CreateTestSuiteRunner(state, suites);
    expect(runner).not.toBeNull();
    // last element in chain should be runner.argparser
    let ap = state.argparser;
    while (ap.next) ap = ap.next;
    expect(ap).toBe(runner.argparser);
  });

  it('destroy clears fields and detaches argparser', () => {
    const state: any = { argparser: { next: null } };
    const suites = [{ name: 's1' }];
    const runner = SDLTest.SDLTest_CreateTestSuiteRunner(state, suites);
    expect(runner.user.testSuites).not.toBeNull();
    SDLTest.SDLTest_DestroyTestSuiteRunner(runner);
    expect(runner.user.testSuites).toBeNull();
    // ensure state chain no longer points to runner.argparser
    let found = false;
    let ap = state.argparser;
    while (ap) {
      if (ap === runner.argparser) { found = true; break; }
      ap = ap.next;
    }
    expect(found).toBe(false);
  });

  it('execute returns 0 on minimal runner', () => {
    const state: any = { argparser: { next: null } };
    const suites = [{ name: 's1' }];
    const runner = SDLTest.SDLTest_CreateTestSuiteRunner(state, suites);
    const res = SDLTest.SDLTest_ExecuteTestSuiteRunner(runner);
    expect(res).toBe(0);
  });
});
