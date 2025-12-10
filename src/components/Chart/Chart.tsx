import CandleChart from "../CandleChart/CandleChart";
import MACDChart from "../MACDChart/MACDChart";
import VolumeChart from "../VolumeChart/VolumeChart";
import LineChart from "../LineChart/LineChart";
import useChartStore from "./chart.store";
import { CHART_HEIGHT } from "../utils";

import type { ChartDataEntry } from "../type";
import ConfigPanel from "../ConfigPanel/ConfigPanel";

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
        {linesMA.map((ma) => (
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
        <MACDChart data={data} />
      </svg>
    </>
  );
};

export default Chart;

type ChartProps = {
  data: [string, ChartDataEntry][];
};
