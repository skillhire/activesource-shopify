import { Button } from "@mui/material";

const OptionButton = ({
  value,
  option,
  active,
  handleClick,
  children,
  width = 70,
  ...props
}) => {
  return (
    <Button
      sx={{
        ...sx.button,
        ...(active && sx.active),
        minWidth: width,
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
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
};
