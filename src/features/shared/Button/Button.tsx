import type { ButtonHTMLAttributes, ReactNode } from "react";
import css from "./button.module.css";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "",
  className = "",
  ...props
}) => {
  return (
    <button className={`${css.btn} ${css[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;

type ButtonVariant = "primary" | "danger" | "warning" | "link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}
