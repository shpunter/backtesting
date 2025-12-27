import { create } from "zustand";
import { broadcastSync } from "./middleware";

const useChartStore = create<State & Actions>()(
  broadcastSync("chart_sync_channel")((set) => ({
    linesMA: [],
    
    addLineMA: ({ type, period, color }) => {
      set((state) => ({
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

    deleteAllLinesMA: () => {
      set(() => ({
        linesMA: [],
      }));
    },
  }))
);

export default useChartStore;

export type State = {
  linesMA: LinesMA[];
};

export type Actions = {
  addLineMA: (attr: AddLineMAAttr) => void;
  deleteAllLinesMA: () => void;
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
