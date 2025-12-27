import css from "./closeButton.module.css";

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button type="button" className={css["close-btn"]} onClick={onClick}>
      X
    </button>
  );
};

export default CloseButton;

type CloseButtonProps = {
  onClick: (() => void) | undefined;
};
