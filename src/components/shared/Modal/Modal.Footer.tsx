import type { ReactNode } from "react";

const Footer = ({ children }: { children: ReactNode }) => (
  <footer className="modal-footer">{children}</footer>
);

export default Footer;
