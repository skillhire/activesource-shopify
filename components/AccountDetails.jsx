import {
  Box,
  Stack,
  Grid,
  Button,
  Checkbox,
  TextField,
  InputLabel,
  Typography,
  FormControlLabel,
} from "@mui/material";

export default function AccountDetails() {
  return (
    <Stack sx={sx.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} sx={sx.labelContainer}>
          <InputLabel htmlFor="first-name" sx={sx.inputLabel}>First Name: </InputLabel>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <TextField
            id="first-name"
            name="first-name"
            size="small"
            fullWidth
            sx={sx.input}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={sx.labelContainer}>
          <InputLabel htmlFor="last-name" sx={sx.inputLabel}>Last Name: </InputLabel>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <TextField
            id="last-name"
            name="last-name"
            size="small"
            fullWidth
            sx={sx.input}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={sx.labelContainer}>
          <InputLabel htmlFor="email" sx={sx.inputLabel}>Email Address: </InputLabel>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <TextField
            id="email"
            name="email"
            size="small"
            fullWidth
            sx={sx.input}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <FormControlLabel
          control={
            <Checkbox
              // checked={customer?.acceptsMarketing || false}
              // onChange={handleChange}
              name="acceptsMarketing"
              size="small"
            />
          }
          label={
            <Typography variant="overline">
              Tick here if you want to get marketing emails from Active Source
              Lab
            </Typography>
          }
        />
      </Box>
      <Stack alignItems="end">
        <Button
          sx={sx.button}
          fullWidth
          size="small"
          color="secondary"
          variant="contained"
        // onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </Stack>
    </Stack>
  );
}

const sx = {
  root: {
    maxWidth: 500,
  },
  button: {
    my: 2,
    mt: 4,
    width: "auto",
    minWidth: 200,
  },
  labelContainer: {
    display: "flex",
    alignItems: "center",
  },
  inputLabel: {
    color: "primary.main",
    fontFamily: "Poppins",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "120%",
  },
  input: {
    backgroundColor: "background.paper"
  }
};
