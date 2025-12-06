import { getChartScales } from "../utils";

// Simple Moving Average 
const SMALine = ({
  data,
  maPeriod,
  color,
}: SMALineProps) => {
  const dataEntries = Object.entries(data);
  const closingPrices = dataEntries.map(([, value]) => parseFloat(value.close));
  const maValues: (number | null)[] = [];
  const numCandles = dataEntries.length;
  const chartWidth = dataEntries.length * 10;
  const spacePerCandle = chartWidth / numCandles;

  const { getPixelY } = getChartScales(dataEntries);

  for (let i = 0; i < numCandles; i += 1) {
    if (i < maPeriod - 1) {
      maValues.push(null);
    } else {
      const slice = closingPrices.slice(i - maPeriod + 1, i + 1);
      const sum = slice.reduce((acc, price) => acc + price, 0);
      const sma = sum / maPeriod;

      maValues.push(sma);
    }
  }

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

type ChartDataEntry = {
  open: string;
  close: string;
  high: string;
  low: string;
  volume: string;
};

type SMALineProps = {
  data: { [date: string]: ChartDataEntry };
  maPeriod: number;
  color: string;
};
