import { useRef } from "react";
import useChartStore from "../Chart/chart.store";
import type { LinesMA } from "../Chart/chart.store";

const ConfigPanel = () => {
  const addLineMA = useChartStore(({ addLineMA }) => addLineMA);
  const resetLinesMA = useChartStore(({ resetLinesMA }) => resetLinesMA);

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

  return (
    <>
      <div>
        <span>type</span>
        <select ref={refType}>
          <option value="wma" label="wma" selected />
          <option value="ema" label="ema" />
          <option value="sma" label="sma" />
        </select>
      </div>
      <div>
        <span>period</span>
        <input ref={refPeriod} />
      </div>
      <div>
        <span>color</span>
        <input ref={refColor} />
      </div>
      <button type="button" onClick={onClickAddFn}>
        add
      </button>
      <button type="button" onClick={resetLinesMA}>
        clear
      </button>
    </>
  );
};

export default ConfigPanel;
