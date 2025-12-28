import type { ReactNode } from "react";
import css from "./body.module.css";

const Body = ({ children }: { children: ReactNode }) => (
  <main className={css.body}>{children}</main>
);

export default Body;
