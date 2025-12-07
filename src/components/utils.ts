import type { DataEntries } from "./type";

export const CANDLE_WIDTH_RATIO = 0.6;
export const MA_PERIOD = 10;
export const CANDLE_CHART_HEIGHT = 500;
export const VOLUME_CHART_HEIGHT = 100;
export const MACD_CHART_HEIGHT = 100;
export const CHART_PADDING = 20;

export const CHART_HEIGHT =
  CANDLE_CHART_HEIGHT +
  VOLUME_CHART_HEIGHT +
  MACD_CHART_HEIGHT +
  CHART_PADDING * 3;

export const VOLUME_CHART_Y_START = CANDLE_CHART_HEIGHT + CHART_PADDING;

export const getChartScales = (dataEntries: DataEntries) => {
  if (dataEntries.length === 0) {
    return {
      priceMin: 0,
      priceMax: 0,
      priceRange: 0,
      getPixelY: () => CHART_HEIGHT / 2,
    };
  }

  let priceMin = parseFloat(dataEntries[0][1].low);
  let priceMax = parseFloat(dataEntries[0][1].high);

  for (let i = 0; i < dataEntries.length; i += 1) {
    const [, value] = dataEntries[i];
    const vh = parseFloat(value.high);
    const vl = parseFloat(value.low);

    if (vh > priceMax) priceMax = vh;
    if (vl < priceMin) priceMin = vl;
  }

  const priceRange = priceMax - priceMin;

  const getPixelY = (priceValue: number): number => {
    if (priceRange === 0) return CHART_HEIGHT / 2;

    return (
      CANDLE_CHART_HEIGHT -
      ((priceValue - priceMin) / priceRange) * CANDLE_CHART_HEIGHT
    );
  };

  return { priceMin, priceMax, priceRange, getPixelY };
};

export const calculateEMA = (
  prices: number[],
  period: number,
): (number | null)[] => {
  if (prices.length === 0) return [];

  const alpha = 2 / (period + 1);
  const emaValues: (number | null)[] = [];
  let currentEMA: number | null = null;

  for (let i = 0; i < prices.length; i += 1) {
    const currentPrice = prices[i];

    if (i === 0) {
      currentEMA = currentPrice;
    } else if (currentEMA !== null) {
      currentEMA = currentPrice * alpha + currentEMA * (1 - alpha);
    }

    emaValues.push(currentEMA);
  }
  return emaValues;
};

export const calculateSMA = (
  prices: number[],
  period: number,
): (number | null)[] => {
  if (prices.length === 0) return [];

  const smaValues: (number | null)[] = [];
  const numPrices = prices.length;

  for (let i = 0; i < numPrices; i += 1) {
    if (i < period - 1) {
      smaValues.push(null);
    } else {
      const slice = prices.slice(i - period + 1, i + 1);
      const sum = slice.reduce((acc, price) => acc + price, 0);
      const sma = sum / period;

      smaValues.push(sma);
    }
  }

  return smaValues;
};

export const calculateWMA = (
  prices: number[],
  period: number,
): (number | null)[] => {
  if (prices.length === 0) return [];

  const wmaValues: (number | null)[] = [];
  const numCandles = prices.length;
  const weights = Array.from({ length: period }, (_, i) => i + 1);
  const sumOfWeights = weights.reduce((sum, weight) => sum + weight, 0);

  for (let i = 0; i < numCandles; i += 1) {
    if (i < period - 1) {
      wmaValues.push(null);
    } else {
      const slice = prices.slice(i - period + 1, i + 1);
      let weightedSum = 0;

      for (let j = 0; j < period; j++) {
        weightedSum += slice[j] * weights[j];
      }

      const wma = weightedSum / sumOfWeights;
      wmaValues.push(wma);
    }
  }

  return wmaValues;
};
