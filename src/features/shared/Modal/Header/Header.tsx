import type { ReactNode } from "react";
import css from "./header.module.css";

const Header = ({ children }: { children: ReactNode }) => (
  <header className={css.header}>{children}</header>
);

export default Header;
