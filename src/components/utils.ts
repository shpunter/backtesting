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

type ChartDataEntry = {
  open: string;
  close: string;
  high: string;
  low: string;
  volume: string;
};

export type DataEntries = [string, ChartDataEntry][];

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
