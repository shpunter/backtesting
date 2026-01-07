import useChartStore from "@/features/Chart/chart.store";
import Button from "@/shared/Button/Button";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import css from "./list.module.css";

const List = () => {
  const linesMAObj = useChartStore(({ linesMA }) => linesMA);
  const linesMA = Object.values(linesMAObj)
  const removeLineByID = useChartStore(({ removeLineByID }) => removeLineByID);

  const onRemoveClick = (uuid: string) => () => {
    removeLineByID(uuid);
  };

  return (
    <>
      {linesMA.length > 0 && <div className={css["dividing-line"]} />}
      <div>
        {linesMA.map((line) => {
          return (
            <div key={line.uuid} className={css.list}>
              <Select label="Type" value={line.type} disabled>
                <Select.Option value="wma">WMA</Select.Option>
                <Select.Option value="ema">EMA</Select.Option>
                <Select.Option value="sma">SMA</Select.Option>
              </Select>
              <Input label="Period" value={line.period} disabled />
              <Input label="Color" value={line.color} disabled />
              <Button
                variant="outlined"
                color="error"
                sx={{ width: 90, textTransform: "none" }}
                onClick={onRemoveClick(line.uuid)}
              >
                Remove
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default List;
