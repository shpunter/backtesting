export type ChartDataEntry = {
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
};

export type DataEntries = [string, ChartDataEntry][];
