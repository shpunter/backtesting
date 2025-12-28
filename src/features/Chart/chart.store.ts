import { create } from "zustand";
import { broadcastSync } from "./middleware";

const useChartStore = create<State & Actions>()(
  broadcastSync("chart_sync_channel")((set) => ({
    linesMA: {},

    addLineMA: ({ type, period, color }) => {
      const uuid = crypto.randomUUID();
      const newLine: LineMA = { uuid, type, period, color };

      set((state) => ({
        linesMA: { ...state.linesMA, [newLine.uuid]: newLine },
      }));
    },
    removeAllLinesMA: () => {
      set(() => ({
        linesMA: {},
      }));
    },
    removeLineByID: (uuid: string) => {
      set((state) => ({
        linesMA: Object.fromEntries(
          Object.entries(state.linesMA).filter(
            ([, line]) => line.uuid !== uuid,
          ),
        ),
      }));
    },
  })),
);

export default useChartStore;

export type State = {
  linesMA: LinesMA;
};

export type Actions = {
  addLineMA: (attr: AddLineMAAttr) => void;
  removeAllLinesMA: () => void;
  removeLineByID: (uuid: string) => void
};

type AddLineMAAttr = {
  type: LineMA["type"];
  period: LineMA["period"];
  color: LineMA["color"];
};

export type LinesMA = Record<string, LineMA>;

export type LineMA = {
  uuid: string;
  type: "sma" | "ema" | "wma";
  period: number;
  color: string;
};
