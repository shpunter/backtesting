import ButtonMUI from "@mui/material/Button";
import type { ReactNode } from "react";
import type { ButtonProps as MuiButtonProps } from "@mui/material";

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <ButtonMUI sx={{ textTransform: "none" }} variant="contained" {...props}>
      {children}
    </ButtonMUI>
  );
};

export default Button;

type ButtonProps = MuiButtonProps & {
  children: ReactNode;
};
