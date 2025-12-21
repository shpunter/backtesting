import { useRef } from "react";
import type { ChangeEvent } from "react";
import useChartStore from "../Chart/chart.store";
import type { LinesMA } from "../Chart/chart.store";
import { useNavigate, useSearch } from "@tanstack/react-router";

const ConfigPanel = () => {
  const addLineMA = useChartStore(({ addLineMA }) => addLineMA);
  const resetLinesMA = useChartStore(({ resetLinesMA }) => resetLinesMA);
  const { period } = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });

  const refPeriod = useRef<HTMLInputElement>(null);
  const refColor = useRef<HTMLInputElement>(null);
  const refType = useRef<HTMLSelectElement & { value: LinesMA["type"] }>(null);

  const onClickAddFn = () => {
    if (!refPeriod.current || !refColor.current || !refType.current) return;

    addLineMA({
      period: +refPeriod.current?.value,
      color: refColor.current.value,
      type: refType.current.value,
    });
  };

  const selectOnChange = (
    e: ChangeEvent<HTMLSelectElement & { value: "1d" | "1m" }>,
  ) => {
    const { value } = e.currentTarget;

    navigate({ search: (prev) => ({ ...prev, period: value }) });
  };

  return (
    <>
      <div>
        <span>fake period: </span>
        <select defaultValue={period} onChange={selectOnChange}>
          <option value="1d" label="1d"></option>
          <option value="1m" label="1m"></option>
        </select>
      </div>
      <div>
        <span>type: </span>
        <select ref={refType} defaultValue="sma">
          <option value="wma" label="wma" />
          <option value="ema" label="ema" />
          <option value="sma" label="sma" />
        </select>
      </div>
      <div>
        <span>period: </span>
        <input ref={refPeriod} />
      </div>
      <div>
        <span>color: </span>
        <input ref={refColor} />
      </div>
      <div>
        <button type="button" onClick={onClickAddFn}>
          add
        </button>
        <button type="button" onClick={resetLinesMA}>
          clear
        </button>
      </div>
    </>
  );
};

export default ConfigPanel;
