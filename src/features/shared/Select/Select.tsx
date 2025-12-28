import { FormControl, InputLabel, MenuItem } from "@mui/material";
import SelectMUI, {
  type SelectProps as SelectPropsMUI,
} from "@mui/material/Select";

const Select = ({ label, children, ...props }: SelectProps) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120, margin: 0 }} size="small">
      <InputLabel id="select-small-label">{label}</InputLabel>
      <SelectMUI
        labelId="select-small-label"
        label="Age"
        MenuProps={{ disablePortal: true }}
        {...props}
      >
        {children}
      </SelectMUI>
    </FormControl>
  );
};

type SelectProps = SelectPropsMUI & {
  label: string;
};

Select.Option = MenuItem;

export default Select;
