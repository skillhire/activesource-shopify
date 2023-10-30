import { Box, TextField, Button } from "@mui/material";

const TextInput = (props) => {
  const { value, placeholder, handleChange, buttonText, handleClick } =
    props || {};

  return (
    <Box sx={sx.textInput}>
      <TextField
        fullWidth
        variant="standard"
        placeholder={placeholder}
        color="secondary"
        value={value}
        sx={sx.textField}
        onChange={handleChange}
        InputProps={{
          disableUnderline: true,
        }}
      />
      {buttonText && <Button onClick={handleClick}>{buttonText}</Button>}
    </Box>
  );
};
export default TextInput;

const sx = {
  textInput: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid",
    wrap: "no-wrap",
  },
  textField: {
    width: "100%",
    border: "none",
    "& .MuiInputBase-root": {
      border: "none",
      fontSize: "20px",
      fontWeight: 400,
    },
  },
};
