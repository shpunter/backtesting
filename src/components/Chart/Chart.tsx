import Candle from "../Candle/Candle";

const CHART_HEIGHT = 500;
const CANDLE_WIDTH_RATIO = 0.6;

const Chart = ({ data }: ChartProps) => {
  const dataEntries = Object.entries(data);
  const chartWidth = dataEntries.length * 10;
  const numCandles = dataEntries.length;

  let priceMin = parseFloat(dataEntries[0][1].low);
  let priceMax = parseFloat(dataEntries[0][1].high);

  for (let i = 0; i < dataEntries.length; i += 1) {
    const [, value] = dataEntries[i];
    const vh = parseFloat(value.high);
    const vl = parseFloat(value.low);

    if (vh > priceMax) priceMax = vh;
    if (vl < priceMin) priceMin = vl;
  }

  const priceRange = priceMax - priceMin;

  const getPixelY = (priceValue: number): number => {
    if (priceRange === 0) return CHART_HEIGHT / 2;

    return CHART_HEIGHT - ((priceValue - priceMin) / priceRange) * CHART_HEIGHT;
  };

  const spacePerCandle = chartWidth / numCandles;
  const candleWidth = spacePerCandle * CANDLE_WIDTH_RATIO;
  const gap = (spacePerCandle - candleWidth) / 2;

  return (
    <svg
      width={chartWidth}
      height={CHART_HEIGHT}
      viewBox={`0 0 ${chartWidth} ${CHART_HEIGHT}`}
    >
      <title>t</title>
      {dataEntries.map(([date, value], index) => {
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
    </svg>
  );
};

export default Chart;

type ChartProps = {
  data: {
    [date: string]: {
      open: string;
      close: string;
      high: string;
      low: string;
      volume: string;
    };
  };
};
