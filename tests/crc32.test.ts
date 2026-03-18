import { describe, it, expect } from 'bun:test';
import * as SDLTest from '../src/sdl-tests';

describe('SDLTest CRC32', () => {
  it('calculates CRC32 for "123456789" correctly', () => {
    const ctx: SDLTest.SDLTest_Crc32Context = { table: null };
    expect(SDLTest.SDLTest_Crc32Init(ctx)).toBe(true);
    const buf = new TextEncoder().encode('123456789');
    const out: { value?: number } = {};
    expect(SDLTest.SDLTest_Crc32Calc(ctx, buf, buf.length, out)).toBe(true);
    // standard CRC32 for "123456789"
    expect(out.value).toBe(0xCBF43926);
  });

  it('SDLTest_Crc32CalcBuffer alias works and Crc32Done clears table', () => {
    const ctx: SDLTest.SDLTest_Crc32Context = { table: null };
    expect(SDLTest.SDLTest_Crc32Init(ctx)).toBe(true);
    const buf = new Uint8Array([0,1,2,3,4,5]);
    const out: { value?: number } = {};
    expect(SDLTest.SDLTest_Crc32CalcBuffer(ctx, buf, buf.length, out)).toBe(true);
    expect(typeof out.value).toBe('number');
    expect(SDLTest.SDLTest_Crc32Done(ctx)).toBe(true);
    // after Done, table should be null and further calc should fail
    const out2: { value?: number } = {};
    expect(SDLTest.SDLTest_Crc32Calc(ctx, buf, buf.length, out2)).toBe(false);
  });
});
