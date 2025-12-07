import { calculateWMA, getChartScales } from "../utils";

import type { ChartDataEntry } from "../type";

// Weighted Moving Average
const WMALine = ({ data, maPeriod, color }: MALineProps) => {
  const closingPrices = data.map(([, value]) => parseFloat(value.close));
  const numCandles = data.length;
  const chartWidth = numCandles * 10;
  const spacePerCandle = chartWidth / numCandles;
  const wmaValues = calculateWMA(closingPrices, maPeriod);

  const { getPixelY } = getChartScales(data);

  const weightedMovingAveragePoints = wmaValues
    .map((wma, index) => {
      if (wma === null) return null;

      const xPosition = index * spacePerCandle + spacePerCandle / 2;
      const yPosition = getPixelY(wma);

      return `${xPosition},${yPosition}`;
    })
    .filter((point): point is string => point !== null)
    .join(" ");

  if (weightedMovingAveragePoints.length === 0) {
    return null;
  }

  return (
    <polyline
      points={weightedMovingAveragePoints}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
    />
  );
};

export default WMALine;

export type MALineProps = {
  data: [string, ChartDataEntry][];
  maPeriod: number;
  color: string;
};