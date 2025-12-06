import type { MALineProps } from "../type";
import { getChartScales } from "../utils";

// Weighted Moving Average 
const WMALine = ({ data, maPeriod, color }: MALineProps) => {
  const dataEntries = Object.entries(data);
  const closingPrices = dataEntries.map(([, value]) => parseFloat(value.close));
  const wmaValues: (number | null)[] = [];
  const numCandles = dataEntries.length;
  const chartWidth = numCandles * 10;
  const spacePerCandle = chartWidth / numCandles;

  const { getPixelY } = getChartScales(dataEntries);

  const weights = Array.from({ length: maPeriod }, (_, i) => i + 1);
  const sumOfWeights = weights.reduce((sum, weight) => sum + weight, 0);

  for (let i = 0; i < numCandles; i += 1) {
    if (i < maPeriod - 1) {
      wmaValues.push(null);
    } else {
      const slice = closingPrices.slice(i - maPeriod + 1, i + 1);
      let weightedSum = 0;

      for (let j = 0; j < maPeriod; j++) {
        weightedSum += slice[j] * (j + 1);
      }

      const wma = weightedSum / sumOfWeights;
      wmaValues.push(wma);
    }
  }

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
