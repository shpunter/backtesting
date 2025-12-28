import Modal, { type ModalHandler } from "@/features/shared/Modal/Modal";
import css from "./configModal.module.css";
import { useRef } from "react";
import CloseButton from "@/features/shared/CloseButton/CloseButton";
import Panel from "./Panel/Panel";
import Button from "@/features/shared/Button/Button";
import useChartStore from "@/features/Chart/chart.store";

const ConfigModal = () => {
  const modalRef = useRef<ModalHandler>(null);

  const deleteAllLinesMA = useChartStore(
    ({ deleteAllLinesMA }) => deleteAllLinesMA,
  );

  const closeFn = () => modalRef.current?.close();
  const openFn = () => modalRef.current?.open();

  return (
    <>
      <Button onClick={openFn}>open</Button>
      <Modal ref={modalRef}>
        <Modal.Header>
          <h3 className={css["modal-title"]}>Configure Lines MA</h3>
          <CloseButton onClick={closeFn} />
        </Modal.Header>

        <Modal.Body>
          <Panel />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outlined" onClick={closeFn}>Cancel</Button>
          <Button onClick={deleteAllLinesMA}>Remove all</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfigModal;
