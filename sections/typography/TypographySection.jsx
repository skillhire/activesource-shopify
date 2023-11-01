import React from "react";
import { Box, Typography, Button } from "@mui/material";

const TypographySection = () => {
  return (
    <Box sx={sx.container}>
      <Box sx={sx.item}>
        <Typography variant="h1">Big Heading (SemiBold) 60/133</Typography>
        <Typography variant="h2">Heading (SemiBold) 45/133</Typography>
        {/* <Typography variant="h2">Mobile Heading 25/120</Typography> */}
        <Typography variant="h3">Title (SemiBold) 35/120</Typography>
        <Typography variant="h4">Small Title (SemiBold) 30/133</Typography>
      </Box>

      <Box sx={sx.item}>
        <Typography variant="body1">Big Body Copy (Regular) 20/120</Typography>
        <Typography variant="body2">Body Copy (Regular) 16/120</Typography>
        {/* <Typography variant="body2">Mobile Body Copy 14/120</Typography> */}
        <Typography variant="body3">Small Body (Regular) 13/120</Typography>
        <Typography variant="body4">Mini Body (Regular) 10/120</Typography>
      </Box>

      <Box sx={sx.item}>
        <Typography variant="subtitle1">Header Menu (SemiBold) 16/120</Typography>
        <Typography variant="subtitle2">Form Title (Medium) 16/120</Typography>
        <Typography variant="footer">Footer Menu 16/200</Typography>
        {/* <Typography variant="footer">Mobile Footer Menu 14/200</Typography> */}
      </Box>

      <Box sx={sx.item}>
        <Button size="small" variant="contained">Small Button (SemiBold) 14/120</Button>
        <br />
        <Button size="medium" variant="contained">Button Medium (SemiBold) 20/120</Button>
        <br />
        <Button size="large" variant="contained">Button Large (SemiBold) 20/120</Button>
      </Box>
    </Box>
  );
};

const sx = {
  container: {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    marginY: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  }
};

export default TypographySection;

