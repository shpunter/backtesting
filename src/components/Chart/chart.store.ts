import { create } from "zustand";

// const useChartStore = create<State & Actions>((set) => {
const useChartStore = create<State>(() => {
  return {
    linesMA: [
      { uuid: crypto.randomUUID(), type: "sma", period: 9, color: "red" },
      { uuid: crypto.randomUUID(), type: "sma", period: 20, color: "green" },
    ],
  };
});

export default useChartStore;

export type State = {
  linesMA: LinesMA[];
};

// export type Actions = {};

type LinesMA = {
  uuid: string;
  type: "sma" | "ema" | "wma";
  period: number;
  color: string;
};
