import type { ChartDataEntry } from "../type";
import {
  CANDLE_CHART_HEIGHT,
  CHART_PADDING,
  MACD_CHART_HEIGHT,
  VOLUME_CHART_HEIGHT,
} from "../utils";

const CANDLE_WIDTH_RATIO = 0.8;

type MACDChartProps = {
  data: { [date: string]: ChartDataEntry };
  fastPeriod?: number; // Default 12
  slowPeriod?: number; // Default 26
  signalPeriod?: number; // Default 9
};

const calculateEMA = (prices: number[], period: number): (number | null)[] => {
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

const MACDChart = ({
  data,
  fastPeriod = 12,
  slowPeriod = 26,
  signalPeriod = 9,
}: MACDChartProps) => {
  const dataEntries = Object.entries(data);
  const numCandles = dataEntries.length;
  const chartWidth = numCandles * 10;
  const spacePerCandle = chartWidth / numCandles;

  const closingPrices = dataEntries.map(([, value]) => parseFloat(value.close));

  const fastEMA = calculateEMA(closingPrices, fastPeriod);
  const slowEMA = calculateEMA(closingPrices, slowPeriod);

  const macdLineValues = fastEMA.map((f, i) =>
    f !== null && slowEMA[i] !== null ? f - (slowEMA[i] as number) : null,
  );

  const validMacdValues = macdLineValues.filter((v): v is number => v !== null);
  const signalLineValuesPartial = calculateEMA(validMacdValues, signalPeriod);

  const signalLineValues = Array(
    macdLineValues.length - signalLineValuesPartial.length,
  )
    .fill(null)
    .concat(signalLineValuesPartial);

  const histogramValues = macdLineValues.map((macd, i) =>
    macd !== null && signalLineValues[i] !== null
      ? macd - (signalLineValues[i] as number)
      : null,
  );

  const macdAndSignalValues = macdLineValues
    .concat(signalLineValues)
    .filter((v): v is number => v !== null);

  const maxMacd = macdAndSignalValues.reduce((max, v) => Math.max(max, v), 0);
  const minMacd = macdAndSignalValues.reduce((min, v) => Math.min(min, v), 0);
  const maxAbsValue = Math.max(Math.abs(maxMacd), Math.abs(minMacd));

  if (maxAbsValue === 0) {
    return null;
  }

  const getMacdPixelY = (value: number): number => {
    const normalizedValue = value / maxAbsValue;

    return MACD_CHART_HEIGHT / 2 - (normalizedValue * MACD_CHART_HEIGHT) / 2;
  };

  const macdChartYStart =
    CANDLE_CHART_HEIGHT + CHART_PADDING * 2 + VOLUME_CHART_HEIGHT;
  const zeroLineY = getMacdPixelY(0);

  const macdLinePoints = macdLineValues
    .map((macd, index) => {
      if (macd === null) return null;

      const xPosition = index * spacePerCandle + spacePerCandle / 2;
      const yPosition = getMacdPixelY(macd);

      return `${xPosition},${yPosition}`;
    })
    .filter((point): point is string => point !== null)
    .join(" ");

  const signalLinePoints = signalLineValues
    .map((signal, index) => {
      if (signal === null) return null;

      const xPosition = index * spacePerCandle + spacePerCandle / 2;
      const yPosition = getMacdPixelY(signal);

      return `${xPosition},${yPosition}`;
    })
    .filter((point): point is string => point !== null)
    .join(" ");

  return (
    <g transform={`translate(0, ${macdChartYStart})`}>
      {histogramValues.map((hist, index) => {
        if (hist === null) return null;

        const candleWidth = spacePerCandle * CANDLE_WIDTH_RATIO;
        const gap = (spacePerCandle - candleWidth) / 2;

        const color = hist > 0 ? "#00B0FF" : "#FF5252";
        const xPosition = index * spacePerCandle + gap;

        const height = Math.abs(getMacdPixelY(hist) - zeroLineY);

        let yPosition = zeroLineY;
        if (hist > 0) {
          yPosition = getMacdPixelY(hist);
        } else {
          yPosition = zeroLineY;
        }

        const key = `hist-${index}`;

        return (
          <rect
            key={key}
            x={xPosition}
            y={yPosition}
            width={candleWidth}
            height={height}
            fill={color}
            opacity="0.7"
          />
        );
      })}

      <line
        x1="0"
        y1={zeroLineY}
        x2={chartWidth}
        y2={zeroLineY}
        stroke="#CCCCCC"
        strokeWidth="1"
        strokeDasharray="2,2"
      />
      <polyline
        points={macdLinePoints}
        fill="none"
        stroke="#00BCD4"
        strokeWidth="1.5"
      />
      <polyline
        points={signalLinePoints}
        fill="none"
        stroke="#FF9800"
        strokeWidth="1.5"
      />
    </g>
  );
};

export default MACDChart;
