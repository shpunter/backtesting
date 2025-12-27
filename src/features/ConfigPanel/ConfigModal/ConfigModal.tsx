import Modal, { type ModalHandler } from "@/features/shared/Modal/Modal";
import css from "./configModal.module.css";
import { useRef } from "react";
import CloseButton from "@/features/shared/CloseButton/CloseButton";
import Panel from "./Panel/Panel";

const ConfigModal = () => {
  const modalRef = useRef<ModalHandler>(null);

  const closeFn = () => modalRef.current?.close();
  const openFn = () => modalRef.current?.open();

  return (
    <>
      <button type="button" onClick={openFn}>
        open
      </button>
      <Modal ref={modalRef}>
        <Modal.Header>
          <h3 className={css["modal-title"]}>Configure Lines MA</h3>
          <CloseButton onClick={closeFn} />
        </Modal.Header>

        <Modal.Body>
          <Panel />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfigModal;
