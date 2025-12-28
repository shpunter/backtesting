const Candle = ({
  type,
  x,
  yBody,
  yWickMax,
  yWickMin,
  width,
  heightBody,
}: CandleDataProps) => {
  const color = type === "buy" ? "red" : "green";
  const titleText =
    type === "buy"
      ? "Bullish candle: Close price higher than Open."
      : "Bearish candle: Close price lower than Open.";

  return (
    <g transform={`translate(${x}, 0)`}>
      <title>{titleText}</title>
      <line
        x1={width / 2}
        y1={yWickMax}
        x2={width / 2}
        y2={yWickMin}
        stroke={color}
        strokeWidth="1"
      />
      <rect
        x={0}
        y={yBody}
        width={width}
        height={heightBody}
        fill={color}
        stroke={color}
        strokeWidth="1"
      />
    </g>
  );
};

export default Candle;

type CandleDataProps = {
  type: "sell" | "buy";
  x: number;
  yBody: number;
  yWickMax: number;
  yWickMin: number;
  width: number;
  heightBody: number;
};
