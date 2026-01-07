import { useImperativeHandle, useRef, type ReactNode } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Body from "./Body/Body";
import css from "./modal.module.css";

const Modal = ({ children, onClose, ref }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  return (
    <dialog className={css.modal} ref={dialogRef} onClose={onClose}>
      {children}
    </dialog>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;

type ModalProps = {
  children: ReactNode;
  onClose?: () => void;
  ref: React.Ref<ModalHandler>;
};

export type ModalHandler = {
  open: () => void;
  close: () => void;
};
