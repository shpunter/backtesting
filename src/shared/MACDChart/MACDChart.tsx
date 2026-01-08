import type { ChartDataEntry } from "@/features/type";
import {
  calculateEMA,
  CANDLE_CHART_HEIGHT,
  CANDLE_WIDTH_RATIO,
  CHART_PADDING,
  MACD_CHART_HEIGHT,
  VOLUME_CHART_HEIGHT,
} from "@/features/utils";
import { memo } from "react";

const FULL_CHART_HEIGHT =
  CANDLE_CHART_HEIGHT +
  CHART_PADDING * 2 +
  VOLUME_CHART_HEIGHT +
  MACD_CHART_HEIGHT;

const BAR_WIDTH = 10;

const MACDChart = ({
  data,
  fastPeriod = 12,
  slowPeriod = 26,
  signalPeriod = 9,
}: MACDChartProps) => {
  const numCandles = data.length;
  const chartWidth = numCandles * BAR_WIDTH;
  const spacePerCandle = chartWidth / numCandles;
  const closingPrices = data.map(([, value]) => value.close);
  const fastEMA = calculateEMA(closingPrices, fastPeriod);
  const slowEMA = calculateEMA(closingPrices, slowPeriod);

  const macdLineValues = fastEMA.map((macd, i) => {
    if (macd === null || slowEMA[i] === null) return null;

    return macd - slowEMA[i];
  });

  const validMacdValues = macdLineValues.filter((value) => value !== null);
  const signalLineValuesPartial = calculateEMA(validMacdValues, signalPeriod);

  const signalLineValues = Array<number | null>(
    macdLineValues.length - signalLineValuesPartial.length,
  )
    .fill(null)
    .concat(signalLineValuesPartial);

  const histogramValues = macdLineValues.map((macd, i) => {
    const signal = signalLineValues[i];

    if (macd === null || signal === null) return null;

    return macd - signal;
  });

  let maxMacd = 0;
  let minMacd = 0;

  for (let i = 0; i < macdLineValues.length; i++) {
    const macd = macdLineValues[i];
    const signal = signalLineValues[i];

    if (macd !== null) {
      if (maxMacd < macd) maxMacd = macd;
      if (minMacd > macd) minMacd = macd;
    }

    if (signal !== null) {
      if (maxMacd < signal) maxMacd = signal;
      if (minMacd > signal) minMacd = signal;
    }
  }

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

  const calcPoints = (lineValues: (number | null)[]) => {
    return lineValues.reduce((all, macd, index) => {
      if (macd === null) return all;

      const xPosition = index * spacePerCandle + spacePerCandle / 2;
      const yPosition = getMacdPixelY(macd);

      all.push(`${xPosition},${yPosition}`);

      return all;
    }, [] as string[]);
  };

  const macdLinePoints = calcPoints(macdLineValues);
  const signalLinePoints = calcPoints(signalLineValues);

  return (
    <g transform={`translate(0, ${macdChartYStart})`}>
      {histogramValues.map((hist, index) => {
        if (hist === null) return null;
        const candleWidth = spacePerCandle * CANDLE_WIDTH_RATIO;
        const gap = (spacePerCandle - candleWidth) / 2;
        const xPosition = index * spacePerCandle + gap;
        const color = hist > 0 ? "#00B0FF" : "#FF5252";
        const height = Math.abs(getMacdPixelY(hist) - zeroLineY);

        let yPosition = zeroLineY;
        if (hist > 0) {
          yPosition = getMacdPixelY(hist);
        } else {
          yPosition = zeroLineY;
        }

        const key = `${xPosition}-${yPosition}`;

        return (
          <g key={`${key}`}>
            <rect
              x={xPosition - gap}
              y={-macdChartYStart}
              width={candleWidth + 2 * gap}
              height={FULL_CHART_HEIGHT}
              fill={hist > 0 ? "#d7fbdb" : "#fbd7d7"}
            />

            <rect
              x={xPosition}
              y={yPosition}
              width={candleWidth}
              height={height}
              fill={color}
            />
          </g>
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
        points={macdLinePoints.join(" ")}
        fill="none"
        stroke="#00BCD4"
        strokeWidth="1.5"
      />
      <polyline
        points={signalLinePoints.join(" ")}
        fill="none"
        stroke="#FF9800"
        strokeWidth="1.5"
      />
    </g>
  );
};

export default memo(MACDChart);

type MACDChartProps = {
  data: [string, ChartDataEntry][];
  fastPeriod?: number;
  slowPeriod?: number;
  signalPeriod?: number;
};
