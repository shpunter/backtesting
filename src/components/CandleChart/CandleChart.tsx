import Candle from "./Candle/Candle";
import { CANDLE_WIDTH_RATIO, getChartScales } from "../utils";
import type { ChartDataEntry } from "../type";
import { memo } from "react";

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
        const open = parseFloat(value.open);
        const close = parseFloat(value.close);
        const high = parseFloat(value.high);
        const low = parseFloat(value.low);

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
