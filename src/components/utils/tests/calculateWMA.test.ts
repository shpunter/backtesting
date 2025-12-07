import { calculateWMA } from "@/components/utils";
import { describe, it, expect } from "vitest";

describe("calculateWMA", () => {
  it("should return an empty array for an empty prices array", () => {
    const prices: number[] = [];
    const period = 5;

    expect(calculateWMA(prices, period)).toEqual([]);
  });

  it("should return the original prices array when period is 1 (WMA is the price itself)", () => {
    const prices = [10, 20, 30, 40];
    const period = 1;

    expect(calculateWMA(prices, period)).toEqual([10, 20, 30, 40]);
  });

  it("should correctly calculate a standard 3-period WMA", () => {
    const prices = [10, 12, 15, 13, 18];
    const period = 3;
    const expected = [null, null, 79 / 6, 81 / 6, 95 / 6];
    const result = calculateWMA(prices, period);

    expect(result.length).toBe(prices.length);
    expect(result[0]).toBeNull();
    expect(result[1]).toBeNull();
    expect(result[2]).toBeCloseTo(expected[2] as number, 5);
    expect(result[3]).toBeCloseTo(expected[3] as number, 5);
    expect(result[4]).toBeCloseTo(expected[4] as number, 5);
  });

  it("should return period - 1 null values at the start", () => {
    const prices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const period = 5;
    const result = calculateWMA(prices, period);

    expect(result.length).toBe(prices.length);
    expect(result.slice(0, period - 1)).toEqual([null, null, null, null]);
    expect(typeof result[period - 1]).toBe("number");
  });

  it("should return an array of all nulls if prices length is less than the period", () => {
    const prices = [10, 20];
    const period = 5;
    const expected = [null, null];

    expect(calculateWMA(prices, period)).toEqual(expected);
  });

  it("should correctly calculate WMA when the period equals the data length", () => {
    const prices = [10, 12, 14, 16];
    const period = 4;
    const expected = [null, null, null, 14];

    expect(calculateWMA(prices, period)).toEqual(expected);
  });

  it("should handle zero and negative prices correctly", () => {
    const prices = [0, 5, -10, 15];
    const period = 3;
    const expected = [null, null, -20 / 6, 5];
    const result = calculateWMA(prices, period);

    expect(result[2]).toBeCloseTo(expected[2] as number, 5);
    expect(result[3]).toBeCloseTo(expected[3] as number, 5);
  });

  it("should maintain floating-point precision in calculations", () => {
    const prices = [1.1, 2.2, 3.3, 4.4, 5.5];
    const period = 4;
    const expected = [null, null, null, 3.3, 4.4];
    const result = calculateWMA(prices, period);

    expect(result.length).toBe(prices.length);
    expect(result[3]).toBeCloseTo(expected[3] as number, 10);
    expect(result[4]).toBeCloseTo(expected[4] as number, 10);
  });

  it("should return the price value when all prices are identical", () => {
    const prices = [100, 100, 100, 100, 100];
    const period = 3;
    const expected = [null, null, 100, 100, 100];

    expect(calculateWMA(prices, period)).toEqual(expected);
  });

  it("should calculate correctly for a larger array and period", () => {
    const prices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const period = 8;
    const result = calculateWMA(prices, period);

    expect(result.length).toBe(10);
    expect(result.slice(0, 7)).toEqual(Array(7).fill(null));
    expect(result[7]).toBeCloseTo(204 / 36, 4);
  });

  it("should return all nulls if prices length is significantly less than the period", () => {
    const prices = [10, 20, 30];
    const period = 100;
    const expected = [null, null, null];

    expect(calculateWMA(prices, period)).toEqual(expected);
  });

  it("should show recency bias where the result is closer to the latest price", () => {
    const prices = [1, 1, 1, 100];
    const period = 3;
    const sma = (1 + 1 + 100) / 3;
    const wma = 50.5;
    const result = calculateWMA(prices, period);

    expect(result[3]).toBeCloseTo(wma, 5);
    expect(result[3] as number).toBeGreaterThan(sma);
  });
});
