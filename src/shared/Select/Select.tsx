import { FormControl, InputLabel, MenuItem } from "@mui/material";
import SelectMUI, {
  type SelectChangeEvent,
  type SelectProps as SelectPropsMUI,
} from "@mui/material/Select";

const Select = <T,>({
  label,
  children,
  onChange,
  ...props
}: SelectProps<T>) => {
  const labelId = `${label.replace(/\s+/g, "-").toLowerCase()}-label`;

  return (
    <FormControl sx={{ m: 1, minWidth: 120, margin: 0 }} size="small">
      <InputLabel id={labelId}>{label}</InputLabel>{" "}
      <SelectMUI
        labelId={labelId}
        label={label}
        onChange={onChange}
        MenuProps={{ disablePortal: true }}
        {...props}
      >
        {children}
      </SelectMUI>
    </FormControl>
  );
};

interface SelectProps<T> extends Omit<SelectPropsMUI<T>, "onChange"> {
  label: string;
  onChange?: (event: SelectChangeEvent<T>, child: React.ReactNode) => void;
}

Select.Option = MenuItem;

export default Select;
export type { SelectChangeEvent };
