import Modal, { type ModalHandler } from "@/features/shared/Modal/Modal";
import css from "./configModal.module.css";
import { useRef } from "react";
import CloseButton from "@/features/shared/CloseButton/CloseButton";
import Panel from "./Panel/Panel";
import Button from "@/features/shared/Button/Button";
import useChartStore from "@/features/Chart/chart.store";
import List from "./List/List";

const ConfigModal = () => {
  const modalRef = useRef<ModalHandler>(null);

  const removeAllLinesMA = useChartStore(
    ({ removeAllLinesMA }) => removeAllLinesMA,
  );

  const closeFn = () => modalRef.current?.close();
  const openFn = () => modalRef.current?.open();

  return (
    <>
      <Button onClick={openFn}>Config MA lines</Button>
      <Modal ref={modalRef}>
        <Modal.Header>
          <h3 className={css["modal-title"]}>Configure MA Lines</h3>
          <CloseButton onClick={closeFn} />
        </Modal.Header>

        <Modal.Body>
          <Panel />
          <List />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outlined" onClick={closeFn}>
            Cancel
          </Button>
          <Button variant="outlined" color="error" onClick={removeAllLinesMA}>
            Remove all
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfigModal;
