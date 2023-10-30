import React from "react";
import { Section, Highlight } from "components";
import { Grid } from "@mui/material";

const HighlightGrid = ({ highlights = [] }) => {
  return (
    <Section isStacked>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {highlights.map((highlight) => (
          <Grid item xs={12} sm={6} key={highlight.title}>
            <Highlight highlight={highlight} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default HighlightGrid;
