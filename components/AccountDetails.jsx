import {
  Box,
  Stack,
  Grid,
  Button,
  Checkbox,
  TextField,
  InputLabel,
  Typography,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";

export default function AccountDetails({
  customer,
  loading,
  handleChange,
  handleCancel,
  isEditing,
  handleSubmit,
}) {
  return (
    <Stack sx={sx.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} sx={sx.labelContainer}>
          <InputLabel htmlFor="firstName" sx={sx.inputLabel}>
            <Typography variant="body1">First Name:</Typography>
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          {isEditing && (
            <TextField
              defaultValue={customer?.firstName}
              id="firstName"
              name="firstName"
              size="small"
              fullWidth
              onChange={handleChange}
            />
          )}
          {!isEditing && (
            <Typography variant="h5" sx={sx.infoLabel}>
              {customer?.firstName}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={sx.labelContainer}>
          <InputLabel htmlFor="lastName" sx={sx.inputLabel}>
            <Typography variant="body1">Last Name:</Typography>
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          {isEditing && (
            <TextField
              defaultValue={customer?.lastName}
              id="lastName"
              name="lastName"
              size="small"
              fullWidth
              onChange={handleChange}
            />
          )}
          {!isEditing && (
            <Typography variant="h5" sx={sx.infoLabel}>
              {customer?.lastName}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={sx.labelContainer}>
          <InputLabel htmlFor="email" sx={sx.inputLabel}>
            <Typography variant="body1">Email Address:</Typography>
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          {isEditing && (
            <TextField
              defaultValue={customer?.email}
              id="email"
              name="email"
              size="small"
              fullWidth
              onChange={handleChange}
            />
          )}
          {!isEditing && (
            <Typography variant="h5" sx={sx.infoLabel}>
              {customer?.email}
            </Typography>
          )}
        </Grid>
      </Grid>
      {isEditing && (
        <Box mt={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={customer?.acceptsMarketing}
                onChange={handleChange}
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
      )}
      <Stack alignItems="end" mt={2}>
        {isEditing && (
          <Stack direction="row" spacing={2}>
            <Button
              sx={sx.button}
              size="small"
              color="tertiary"
              variant="contained"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              sx={sx.button}
              endIcon={
                loading && <CircularProgress size={20} sx={sx.progress} />
              }
              size="small"
              color="secondary"
              variant="contained"
              disabled={loading}
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

const sx = {
  root: { maxWidth: 500 },
  button: {
    width: "auto",
    minWidth: 200,
  },
  labelContainer: {
    display: "flex",
    alignItems: "center",
  },
  infoLabel: {
    minHeight: 46,
    display: "flex",
    alignItems: "center",
  },
  inputLabel: { color: "primary.main" },
};
