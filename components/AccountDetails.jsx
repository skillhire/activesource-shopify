import { useState, useCallback } from "react";
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
  const [isEditing, setIsEditing] = useState(false);
  const handleCancel = useCallback(() => {
    setIsEditing(false)
  }, [setIsEditing])

  const handleSubmit = useCallback(() => {
    // TODO: handleSubmit
  }, [])

  const handleEdit = useCallback(() => {
    setIsEditing(true)
  }, [setIsEditing])

  return (
    <Stack sx={sx.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} sx={sx.labelContainer}>
          <InputLabel htmlFor="first-name" sx={sx.inputLabel}>
            <Typography variant="body1">
              First Name:
            </Typography>
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          {isEditing && <TextField id="first-name" name="first-name" size="small" fullWidth sx={sx.input} />}
          {!isEditing && (
            <Typography variant="h5" sx={sx.infoLabel}>
              ?????
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={sx.labelContainer}>
          <InputLabel htmlFor="last-name" sx={sx.inputLabel}>
            <Typography variant="body1">
              Last Name:
            </Typography>
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          {isEditing && <TextField id="last-name" name="last-name" size="small" fullWidth sx={sx.input} />}
          {!isEditing && (
            <Typography variant="h5" sx={sx.infoLabel}>
              ?????
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={sx.labelContainer}>
          <InputLabel htmlFor="email-address" sx={sx.inputLabel}>
            <Typography variant="body1">
              Email Address:
            </Typography>
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          {isEditing && <TextField id="email-address" name="email-address" size="small" fullWidth sx={sx.input} />}
          {!isEditing && (
            <Typography variant="h5" sx={sx.infoLabel}>
              ?????
            </Typography>
          )}
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
              size="small"
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </Stack>
        )}
        {!isEditing && (
          <Button
            sx={sx.button}
            size="small"
            color="tertiary"
            variant="contained"
            onClick={handleEdit}
          >
            Edit
          </Button>
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
  input: { backgroundColor: "background.paper" },
};
