import React from "react";
import { Section } from "components";
import { Box, Typography, Button } from "@mui/material";

const CTA = (props) => {
  const { cta, styles = {}, handleClick, height = 274 } = props || {};

  return (
    <Section
      height={height}
      color={cta?.color}
      styles={{ ...sx.section, ...styles }}
    >
      <Box sx={sx.root}>
        <Typography
          variant="h3"
          color={cta?.isDark ? "secondary" : "primary"}
          sx={cta?.styles}
        >
          {cta?.title}
        </Typography>
        {cta?.subtitle && (
          <Typography
            variant="subtitle2"
            color={cta?.isDark ? "secondary" : "primary"}
            sx={sx.subtitle}
          >
            {cta.subtitle}
          </Typography>
        )}
        <Button
          color={cta?.isDark ? "secondary" : "primary"}
          variant="outlined"
          sx={sx.button}
          onClick={handleClick}
        >
          {cta?.buttonCta}
        </Button>
      </Box>
    </Section>
  );
};

export default CTA;

const sx = {
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  subtitle: {
    mt: 2,
  },
  button: {
    mt: 4,
  },
};
