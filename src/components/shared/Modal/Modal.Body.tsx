import type { ReactNode } from "react";

const Body = ({ children }: { children: ReactNode }) => (
  <main className="modal-body">{children}</main>
);

export default Body;
