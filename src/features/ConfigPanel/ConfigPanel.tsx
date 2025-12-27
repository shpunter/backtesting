import { useNavigate, useSearch } from "@tanstack/react-router";
import ConfigModal from "./ConfigModal/ConfigModal";
import type { ChangeEvent } from "react";

const ConfigPanel = () => {
  const { period } = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });

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
      <ConfigModal />
    </>
  );
};

export default ConfigPanel;
