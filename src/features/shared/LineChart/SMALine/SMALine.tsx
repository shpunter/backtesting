import { calculateSMA, getChartScales } from "@/features/utils";
import type { ChartDataEntry } from "@/features/type";

// Simple Moving Average
const SMALine = ({ data, period, color }: SMALineProps) => {
  const closingPrices = data.map(([, value]) => value.close);
  const numCandles = data.length;
  const chartWidth = numCandles * 10;
  const spacePerCandle = chartWidth / numCandles;
  const maValues = calculateSMA(closingPrices, period);
  const { getPixelY } = getChartScales(data);

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
  data: [string, ChartDataEntry][];
  period: number;
  color: string;
};
