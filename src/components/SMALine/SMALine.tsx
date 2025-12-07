import { calculateSMA, getChartScales } from "../utils";

import type { ChartDataEntry } from "../type";

// Simple Moving Average
const SMALine = ({ data, maPeriod, color }: SMALineProps) => {
  const dataEntries = Object.entries(data);
  const closingPrices = dataEntries.map(([, value]) => parseFloat(value.close));
  const numCandles = dataEntries.length;
  const chartWidth = numCandles * 10;
  const spacePerCandle = chartWidth / numCandles;
  const maValues = calculateSMA(closingPrices, maPeriod);
  
  const { getPixelY } = getChartScales(dataEntries);

  const movingAveragePoints = maValues
    .map((ma, index) => {
      if (ma === null) return null;

      const xPosition = index * spacePerCandle + spacePerCandle / 2;
      const yPosition = getPixelY(ma);

      return `${xPosition},${yPosition}`;
    })
    .filter((point): point is string => point !== null)
    .join(" ");

  if (movingAveragePoints.length === 0) {
    return null;
  }

  return (
    <polyline
      points={movingAveragePoints}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
    />
  );
};

export default SMALine;

type SMALineProps = {
  data: { [date: string]: ChartDataEntry };
  maPeriod: number;
  color: string;
};
