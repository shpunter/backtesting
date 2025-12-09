

import EMALine from "./EMALine/EMALine";
import SMALine from "./SMALine/SMALine";
import WMALine from "./WMALine/WMALine";
import type { ChartDataEntry } from "../type";

const MAP = {
  sma: SMALine,
  wma: WMALine,
  ema: EMALine,
};

const LineChart = ({ type, data, period, color }: LineChartProps) => {
  const Component = MAP[type];

  return <Component data={data} period={period} color={color} />;
};

export default LineChart;

type LineChartProps = {
  type: "sma" | "ema" | "wma";
  data: [string, ChartDataEntry][];
  period: number;
  color: string;
};
