import { TextField, type TextFieldProps } from "@mui/material";

const Input = ({
  variant = "outlined",
  size = "small",
  ...props
}: InputProps) => {
  return <TextField variant={variant} size={size} {...props} />
};

export default Input;

type InputProps = TextFieldProps;
