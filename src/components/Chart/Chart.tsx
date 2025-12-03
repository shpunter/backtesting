import CandleChart from "../CandleChart/CandleChart";
import MovingAverageLine from "../MovingAverageLine/MovingAverageLine";
import { CHART_HEIGHT } from "../utils";
import VolumeChart from "../VolumeChart/VolumeChart";

const Chart = ({ data }: ChartProps) => {
  const dataEntries = Object.entries(data);
  const chartWidth = dataEntries.length * 10;

  return (
    <svg
      width={chartWidth}
      height={CHART_HEIGHT}
      viewBox={`0 0 ${chartWidth} ${CHART_HEIGHT}`}
    >
      <title>t</title>
      <MovingAverageLine data={data} maPeriod={20} color="green"/>
      <MovingAverageLine data={data} maPeriod={50} color="red"/>
      <CandleChart data={data} />
      <VolumeChart data={data} />
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
