import { create } from "zustand";

const useChartStore = create<State & Actions>((set) => {
  return {
    linesMA: [],
    addLineMA: ({ type, period, color }) => {
      return set((state) => ({
        linesMA: [
          ...state.linesMA,
          {
            uuid: crypto.randomUUID(),
            type,
            period,
            color,
          },
        ],
      }));
    },
    resetLinesMA: () => {
      return set(() => ({
        linesMA: [],
      }));
    },
  };
});

export default useChartStore;

export type State = {
  linesMA: LinesMA[];
};

export type Actions = {
  addLineMA: (attr: AddLineMAAttr) => void;
  resetLinesMA: () => void;
};

type AddLineMAAttr = {
  type: LinesMA["type"];
  period: LinesMA["period"];
  color: LinesMA["color"];
};

export type LinesMA = {
  uuid: string;
  type: "sma" | "ema" | "wma";
  period: number;
  color: string;
};
