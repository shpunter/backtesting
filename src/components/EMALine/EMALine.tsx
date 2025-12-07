import { calculateEMA, getChartScales } from "../utils";

import type { ChartDataEntry } from "../type";

// Exponential Moving Average
const EMALine = ({ data, maPeriod, color }: EMALineProps) => {
  const closingPrices = data.map(([, value]) => parseFloat(value.close));
  const numCandles = data.length;
  const chartWidth = numCandles * 10;
  const spacePerCandle = chartWidth / numCandles;
  const emaValues = calculateEMA(closingPrices, maPeriod);

  const { getPixelY } = getChartScales(data);

  const exponentialMovingAveragePoints = emaValues
    .map((ema, index) => {
      if (ema !== null) {
        const xPosition = index * spacePerCandle + spacePerCandle / 2;
        const yPosition = getPixelY(ema);

        return `${xPosition},${yPosition}`;
      }
      return null;
    })
    .filter((point): point is string => point !== null) 
    .join(" ");

  if (exponentialMovingAveragePoints.length === 0) {
    return null;
  }

  return (
    <polyline
      points={exponentialMovingAveragePoints}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
    />
  );
};

export default EMALine;

export type EMALineProps = {
  data: [string, ChartDataEntry][];
  maPeriod: number;
  color: string;
};
