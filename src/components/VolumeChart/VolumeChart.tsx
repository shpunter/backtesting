import {
  CANDLE_CHART_HEIGHT,
  CANDLE_WIDTH_RATIO,
  CHART_PADDING,
  VOLUME_CHART_HEIGHT,
} from "../utils";

import type { ChartDataEntry } from "../type";

const VolumeChart = ({ data }: VolumeChartProps) => {
  const numCandles = data.length;
  const chartWidth = numCandles * 10;

  const maxVolume = data.reduce((max, [, value]) => {
    const vol = parseFloat(value.volume);
    return vol > max ? vol : max;
  }, 0);

  const spacePerCandle = chartWidth / numCandles;
  const candleWidth = spacePerCandle * CANDLE_WIDTH_RATIO;
  const gap = (spacePerCandle - candleWidth) / 2;

  const volumeChartYStart = CANDLE_CHART_HEIGHT + CHART_PADDING;

  return (
    <g transform={`translate(0, ${volumeChartYStart})`}>
      {data.map(([date, value], index) => {
        const open = parseFloat(value.open);
        const close = parseFloat(value.close);
        const volume = parseFloat(value.volume);

        const height = (volume / maxVolume) * VOLUME_CHART_HEIGHT;
        const color =
          close > open ? "rgba(255, 82, 82, 0.7)" : "rgba(0, 150, 136, 0.7)";
        const xPosition = index * spacePerCandle + gap;
        const yPosition = VOLUME_CHART_HEIGHT - height;

        return (
          <rect
            key={date}
            x={xPosition}
            y={yPosition}
            width={candleWidth}
            height={height}
            fill={color}
          />
        );
      })}

      <line
        x1="0"
        y1={VOLUME_CHART_HEIGHT}
        x2={chartWidth}
        y2={VOLUME_CHART_HEIGHT}
        stroke="lightgray"
        strokeWidth="1"
      />
    </g>
  );
};

export default VolumeChart;

type VolumeChartProps = {
  data: [string, ChartDataEntry][];
};
