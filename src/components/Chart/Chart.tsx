import CandleChart from "../CandleChart/CandleChart";
import EMALine from "../EMALine/EMALine";
import MACDChart from "../MACDChart/MACDChart";
import SMALine from "../SMALine/SMALine";
import { CHART_HEIGHT } from "../utils";
import VolumeChart from "../VolumeChart/VolumeChart";
import WMALine from "../WMALine/WMALine";

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
      {/* <SMALine data={data} maPeriod={20} color="green"/> */}
      <WMALine data={data} maPeriod={20} color="red"/>
      <WMALine data={data} maPeriod={50} color="green"/>
      {/* <EMALine data={data} maPeriod={20} color="blue"/> */}

      <CandleChart data={data} />
      <VolumeChart data={data} />
      <MACDChart data={data}/>
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
