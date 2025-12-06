export type ChartDataEntry = {
    open: string;
    close: string;
    high: string;
    low: string;
    volume: string;
  };
  
  export type MALineProps = {
    data: { [date: string]: ChartDataEntry };
    maPeriod: number;
    color: string;
  };