import { Button } from "@mui/material";

const OptionButton = ({
  value,
  option,
  active,
  handleClick,
  children,
  ...props
}) => {
  return (
    <Button
      sx={{
        ...sx.button,
        ...(active && sx.active),
      }}
      onClick={() => handleClick(option, value)}
    >
      {children}
    </Button>
  );
};

export default OptionButton;

const sx = {
  active: {
    bgcolor: "secondary.light",
  },
  button: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 20,
    minWidth: 34,
  },
};
