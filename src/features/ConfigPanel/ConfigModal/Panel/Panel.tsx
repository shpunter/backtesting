import { useRef } from "react";
import useChartStore, { type LinesMA } from "@/features/Chart/chart.store";
import Button from "@/features/shared/Button/Button";

const Panel = () => {
  const addLineMA = useChartStore(({ addLineMA }) => addLineMA);
  const deleteAllLinesMA = useChartStore(
    ({ deleteAllLinesMA }) => deleteAllLinesMA,
  );

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
        <Button onClick={onClickAddFn}>add</Button>
        <Button onClick={deleteAllLinesMA}>delete all</Button>
        <Button>Save Changes</Button>
      </div>
    </>
  );
};

export default Panel;
