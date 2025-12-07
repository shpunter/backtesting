import CandleChart from "../CandleChart/CandleChart";
// import EMALine from "../EMALine/EMALine";
import MACDChart from "../MACDChart/MACDChart";
// import SMALine from "../SMALine/SMALine";
import VolumeChart from "../VolumeChart/VolumeChart";
import WMALine from "../WMALine/WMALine";
import { CHART_HEIGHT } from "../utils";

import type { ChartDataEntry } from "../type";

const Chart = ({ data }: ChartProps) => {
  const dataEntries = Object.entries(data);
  const chartWidth = dataEntries.length * 10;

  return (
    <svg
      width={chartWidth}
      height={CHART_HEIGHT}
      viewBox={`0 0 ${chartWidth} ${CHART_HEIGHT}`}
    >
      <WMALine data={data} maPeriod={20} color="red" />
      <WMALine data={data} maPeriod={100} color="green" />

      <CandleChart data={data} />
      <VolumeChart data={data} />
      <MACDChart data={data} />
    </svg>
  );
};

export default Chart;

type ChartProps = {
  data: [string, ChartDataEntry][];
};
