export type ChartDataEntry = {
  open: string;
  close: string;
  high: string;
  low: string;
  volume: string;
};

export type DataEntries = [string, ChartDataEntry][];
