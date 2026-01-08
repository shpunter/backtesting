import { useNavigate, useSearch } from "@tanstack/react-router";
import ConfigModal from "./ConfigModal/ConfigModal";
import Select, { type SelectChangeEvent } from "../../shared/Select/Select";
import Input from "@/shared/Input/Input";
import Button from "@/shared/Button/Button";

const ConfigPanel = () => {
  const { period, stock } = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });

  const periodOnChange = (e: SelectChangeEvent<typeof period>) => {
    navigate({ search: (prev) => ({ ...prev, period: e.target.value }) });
  };

  const stockOnChange = (e: SelectChangeEvent<typeof stock>) => {
    navigate({ search: (prev) => ({ ...prev, stock: e.target.value }) });
  };

  return (
    <div>
      <Select label="Period" value={period} onChange={periodOnChange}>
        <Select.Option value="1y">1 year</Select.Option>
      </Select>
      <Select label="Stock" value={stock} onChange={stockOnChange}>
        <Select.Option value="nsdq">NASDAQ</Select.Option>
        <Select.Option value="tsla">Tesla</Select.Option>
        <Select.Option value="nvda">NVIDIA</Select.Option>
      </Select>
      <ConfigModal />
      <br />
      <br />
      Green Zone Entry / Red Zone Exit.{" "}
      {/* <Input type="number" label=" Start with amount $" />
      <Button variant="contained" color="primary">
        Calc
      </Button> */}
    </div>
  );
};

export default ConfigPanel;
