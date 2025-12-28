import type { ReactNode } from "react";
import css from "./footer.module.css";

const Footer = ({ children }: { children: ReactNode }) => (
  <footer className={css.footer}>{children}</footer>
);

export default Footer;
