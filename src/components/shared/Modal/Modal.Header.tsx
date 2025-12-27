import type { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => (
  <header className="modal-header">{children}</header>
);

export default Header;
