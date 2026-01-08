import { calculateSMA } from "@/features/utils";
import { describe, it, expect } from "vitest";

describe("calculateSMA", () => {
  it("should return an empty array for an empty prices array", () => {
    const prices: number[] = [];
    const period = 5;

    expect(calculateSMA(prices, period)).toEqual([]);
  });

  it("should return the original prices array when period is 1", () => {
    const prices = [10, 20, 30, 40];
    const period = 1;

    expect(calculateSMA(prices, period)).toEqual([10, 20, 30, 40]);
  });

  it("should return all nulls if prices length is less than the period", () => {
    const prices = [10, 20];
    const period = 5;
    const expected = [null, null];

    expect(calculateSMA(prices, period)).toEqual(expected);
  });

  it("should return all nulls if the period is much greater than array length", () => {
    const prices = [10, 20, 30];
    const period = 100;
    const expected = [null, null, null];

    expect(calculateSMA(prices, period)).toEqual(expected);
  });

  it("should return period - 1 null values at the start", () => {
    const prices = [1, 2, 3, 4, 5, 6, 7];
    const period = 4;
    const result = calculateSMA(prices, period);

    expect(result.length).toBe(prices.length);
    expect(result.slice(0, period - 1)).toEqual([null, null, null]);
    expect(typeof result[period - 1]).toBe("number");
  });

  it("should correctly calculate a standard 3-period SMA", () => {
    const prices = [10, 12, 14, 16, 18];
    const period = 3;
    const expected = [null, null, 12, 14, 16];

    expect(calculateSMA(prices, period)).toEqual(expected);
  });

  it("should correctly calculate a 4-period SMA with an exact result", () => {
    const prices = [10, 20, 30, 40];
    const period = 4;
    const expected = [null, null, null, 25];

    expect(calculateSMA(prices, period)).toEqual(expected);
  });

  it("should handle zero and negative prices correctly", () => {
    const prices = [10, 0, -10, 20];
    const period = 3;
    const expected = [null, null, 0, 10 / 3];
    const result = calculateSMA(prices, period);

    expect(result.length).toBe(prices.length);
    expect(result[2]).toBe(expected[2]);
    expect(result[3]).toBeCloseTo(expected[3] as number, 5);
  });

  it("should maintain floating-point precision in calculations", () => {
    const prices = [1.1, 2.2, 3.3, 4.4];
    const period = 2;
    const expected = [null, 1.65, 2.75, 3.85];
    const result = calculateSMA(prices, period);

    expect(result[1]).toBeCloseTo(expected[1] as number, 10);
    expect(result[2]).toBeCloseTo(expected[2] as number, 10);
    expect(result[3]).toBeCloseTo(expected[3] as number, 10);
  });

  it("should return the price value when all prices are identical", () => {
    const prices = [50, 50, 50, 50, 50];
    const period = 4;
    const expected = [null, null, null, 50, 50];

    expect(calculateSMA(prices, period)).toEqual(expected);
  });
});
