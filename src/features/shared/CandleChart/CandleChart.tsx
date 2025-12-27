import { CANDLE_WIDTH_RATIO, getChartScales } from "@/features/utils";
import Candle from "./Candle/Candle";
import { memo } from "react";
import type { ChartDataEntry } from "@/features/type";

const CandleChart = ({ data }: CandleChartProps) => {
  const chartWidth = data.length * 10;
  const numCandles = data.length;

  const { getPixelY } = getChartScales(data);

  const spacePerCandle = chartWidth / numCandles;
  const candleWidth = spacePerCandle * CANDLE_WIDTH_RATIO;
  const gap = (spacePerCandle - candleWidth) / 2;

  return (
    <>
      {data.map(([date, value], index) => {
        const {open, close, high, low} = value;
        const type = close > open ? "buy" : "sell";
        const xPosition = index * spacePerCandle + gap;

        const yHighPixel = getPixelY(high);
        const yLowPixel = getPixelY(low);
        const yOpenPixel = getPixelY(open);
        const yClosePixel = getPixelY(close);

        const yBodyTop = Math.min(yOpenPixel, yClosePixel);
        const heightBody = Math.abs(yOpenPixel - yClosePixel);

        const yWickMax = yHighPixel;
        const yWickMin = yLowPixel;

        const finalHeightBody = heightBody === 0 ? 1 : heightBody;

        return (
          <Candle
            key={date}
            type={type}
            x={xPosition}
            width={candleWidth}
            yBody={yBodyTop}
            heightBody={finalHeightBody}
            yWickMax={yWickMax}
            yWickMin={yWickMin}
          />
        );
      })}
    </>
  );
};

export default memo(CandleChart);

type CandleChartProps = {
  data: [string, ChartDataEntry][];
};
