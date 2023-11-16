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
      onClick={() => handleClick(option, value)}
    >
      {children}
    </Button>
  );
};

export default OptionButton;

const sx = {
  active: {
    background: (theme) => `${theme.palette.tertiary.main} !important`
  },
  button: {
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
};
