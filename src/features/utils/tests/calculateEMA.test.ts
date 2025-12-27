import { calculateEMA } from "@/features/utils";
import { describe, it, expect } from "vitest";

const round = (num: number, decimalPlaces = 6) => {
  if (num === null) return null;

  const factor = 10 ** decimalPlaces;

  return Math.round(num * factor) / factor;
};

describe("calculateEMA", () => {
  it("should calculate EMA correctly for a simple 3-period set of prices", () => {
    const prices = [10, 11, 12, 13];
    const period = 3;
    const expected = [10, 10.5, 11.25, 12.125];

    const result = calculateEMA(prices, period).map((val) =>
      round(val as number, 4),
    );

    expect(result).toEqual(expected);
  });

  it("should return an empty array when the input prices array is empty", () => {
    const prices: number[] = [];
    const period = 5;

    expect(calculateEMA(prices, period)).toEqual([]);
  });

  it("should return an array with the single price when the input has only one element", () => {
    const prices = [50];
    const period = 10;

    expect(calculateEMA(prices, period)).toEqual([50]);
  });

  it("should calculate EMA correctly for a longer 14-period", () => {
    const prices = [10, 11, 12, 13, 14, 15, 16, 17];
    const period = 5;

    const expected = [
      10.0, 10.3333, 10.8889, 11.5926, 12.3951, 13.2634, 14.1756, 15.1171,
    ];

    const result = calculateEMA(prices, period).map((val) =>
      round(val as number, 4),
    );

    expect(result).toEqual(expected);
  });

  it("should return the prices array when the period is 1 (EMA = Price)", () => {
    const prices = [100, 101, 102, 103];
    const period = 1;

    expect(calculateEMA(prices, period)).toEqual(prices);
  });

  it("should handle prices that are decimal numbers correctly", () => {
    const prices = [1.25, 1.3, 1.35];
    const period = 2;
    const expected = [1.25, 1.283333, 1.327778];

    const result = calculateEMA(prices, period).map((val) =>
      round(val as number, 6),
    );

    expect(result).toEqual(expected);
  });

  it("should handle large numbers without overflow issues", () => {
    const prices = [1000000, 1000000];
    const period = 2;
    const expected = [1000000, 1000000];

    const result = calculateEMA(prices, period).map((val) =>
      round(val as number),
    );

    expect(result).toEqual(expected);
  });
});
