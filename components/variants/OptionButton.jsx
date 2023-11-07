import { Button } from "@mui/material";

const OptionButton = ({
  value,
  option,
  active,
  handleClick,
  children,
  width = 70,
  justifyContent = "flex-start",
  ...props
}) => {
  return (
    <Button
      sx={{
        ...sx.button,
        ...(active && sx.active),
        minWidth: width,
        justifyContent: justifyContent,
      }}
      color="primary"
      onClick={() => handleClick(option, value)}
    >
      {children}
    </Button>
  );
};

export default OptionButton;

const sx = {
  active: {
    opacity: 1,
  },
  button: {
    textWrap: "nowrap",
    opacity: 0.4,
    py: 0,
    height: 36,
    borderRadius: 0.5,
  },
};
