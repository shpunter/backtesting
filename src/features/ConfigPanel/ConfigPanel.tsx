import { useNavigate, useSearch } from "@tanstack/react-router";
import ConfigModal from "./ConfigModal/ConfigModal";
import Select, { type SelectChangeEvent } from "../shared/Select/Select";

const ConfigPanel = () => {
  const { period } = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });

  const selectOnChange = (e: SelectChangeEvent<typeof period>) => {
    navigate({ search: (prev) => ({ ...prev, period: e.target.value }) });
  };

  return (
    <div>
      <Select label="Fake period" value={period} onChange={selectOnChange}>
        <Select.Option value="1d">1 day</Select.Option>
        <Select.Option value="1m">1 month</Select.Option>
      </Select>
      <ConfigModal />
    </div>
  );
};

export default ConfigPanel;
