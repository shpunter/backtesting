import { useRef } from "react";
import useChartStore, { type LinesMA } from "@/features/Chart/chart.store";
import Button from "@/features/shared/Button/Button";
import Input from "@/features/shared/Input/Input";
import css from "./panel.module.css";
import Select from "@/features/shared/Select/Select";

const Panel = () => {
  const addLineMA = useChartStore(({ addLineMA }) => addLineMA);
  const refPeriod = useRef<HTMLDivElement>(null);
  const refColor = useRef<HTMLDivElement>(null);
  const refType = useRef<HTMLElement & { value: LinesMA["type"] }>(null);

  const onClickAddFn = () => {
    console.log(refType?.current);

    if (!refPeriod.current || !refColor.current || !refType.current) return;

    const period = refPeriod.current.querySelector("input") as HTMLInputElement;
    const color = refColor.current.querySelector("input") as HTMLInputElement;
    const type = refType.current.querySelector("input") as HTMLInputElement & {
      value: LinesMA["type"];
    };

    if (!period || !color || !type) return;

    addLineMA({
      period: +period.value,
      color: color.value,
      type: type.value,
    });
  };

  return (
    <div className={css["add-line"]}>
      <Select ref={refType} label="Type" defaultValue="sma">
        <Select.Option value="wma">WMA</Select.Option>
        <Select.Option value="ema">EMA</Select.Option>
        <Select.Option value="sma">SMA</Select.Option>
      </Select>
      <Input ref={refPeriod} label="Period" defaultValue="20" />
      <Input ref={refColor} label="Color" defaultValue="red" />
      <Button onClick={onClickAddFn}>Add</Button>
    </div>
  );
};

export default Panel;
