import { Button } from "@mui/material";

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <Button
      sx={{
        width: 28,
        height: 28,
        minWidth: 28,
        color: "#464646",
        backgroundColor: "#e5e7eb",
        borderRadius: "50%",
        padding: 0,
      }}
      onClick={onClick}
      variant="contained"
    >
      X
    </Button>
  );
};

export default CloseButton;

type CloseButtonProps = {
  onClick: (() => void) | undefined;
};
