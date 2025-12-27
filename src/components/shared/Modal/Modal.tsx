import { useImperativeHandle, useRef, type ReactNode } from "react";
import Header from "./Modal.Header";
import Body from "./Modal.Body";
import Footer from "./Modal.Footer";

const Modal = ({ children, onClose, ref }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  return (
    <dialog ref={dialogRef} onClose={onClose} className="border-4 border-red-400 p-6 rounded-lg backdrop:bg-black/50">
      {children}d
    </dialog>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
  ref: React.Ref<ModalHandler>;
}

export interface ModalHandler {
  open: () => void;
  close: () => void;
}
