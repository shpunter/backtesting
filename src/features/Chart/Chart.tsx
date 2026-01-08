import VolumeChart from "../../shared/VolumeChart/VolumeChart";
import useChartStore from "./chart.store";
import { CHART_HEIGHT } from "../utils";

import type { ChartDataEntry } from "../type";
import ConfigPanel from "../ConfigPanel/ConfigPanel";
import LineChart from "../../shared/LineChart/LineChart";
import CandleChart from "../../shared/CandleChart/CandleChart";
import MACDChart from "../../shared/MACDChart/MACDChart";

const Chart = ({ data }: ChartProps) => {
  const chartWidth = data.length * 10;
  const linesMA = useChartStore(({ linesMA }) => linesMA);

  return (
    <>
      <ConfigPanel />
      <svg
        width={chartWidth}
        height={CHART_HEIGHT}
        viewBox={`0 0 ${chartWidth} ${CHART_HEIGHT}`}
      >
        <MACDChart data={data} />
        {Object.values(linesMA).map((ma) => (
          <LineChart
            key={ma.uuid}
            type={ma.type}
            data={data}
            period={ma.period}
            color={ma.color}
          />
        ))}
        <CandleChart data={data} />
        <VolumeChart data={data} />
      </svg>
    </>
  );
};

export default Chart;

type ChartProps = {
  data: [string, ChartDataEntry][];
};
