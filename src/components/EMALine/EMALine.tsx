import type { MALineProps } from "../type";
import { getChartScales } from "../utils";

// Exponential Moving Average 
const EMALine = ({ data, maPeriod, color }: MALineProps) => {
  const dataEntries = Object.entries(data);
  const closingPrices = dataEntries.map(([, value]) => parseFloat(value.close));
  const emaValues: number[] = [];
  const numCandles = dataEntries.length;
  const chartWidth = numCandles * 10;
  const spacePerCandle = chartWidth / numCandles;

  const { getPixelY } = getChartScales(dataEntries);

  const alpha = 2 / (maPeriod + 1);
  let currentEMA: number | null = null;

  for (let i = 0; i < numCandles; i += 1) {
    const currentPrice = closingPrices[i];

    if (i === 0) {
      currentEMA = currentPrice;
    } else if (currentEMA !== null) {
      currentEMA = currentPrice * alpha + currentEMA * (1 - alpha);
    }

    if (currentEMA !== null) {
      emaValues.push(currentEMA);
    }
  }

  const exponentialMovingAveragePoints = emaValues
    .map((ema, index) => {
      const xPosition = index * spacePerCandle + spacePerCandle / 2;
      const yPosition = getPixelY(ema);

      return `${xPosition},${yPosition}`;
    })
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
