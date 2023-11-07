import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import ProductDescription from "./ProductDescription";

const ProductTabs = ({ product }) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (e, newValue) => setTab(newValue);

  return (
    <Box sx={sx.root}>
      <Tabs value={tab} indicatorColor="primary" onChange={handleTabChange}>
        <Tab value={0} label="Description" />
        <Tab value={1} label="Shipping" />
        <Tab value={2} label="File Guidlines" />
      </Tabs>
      <Box sx={sx.content}>
        {tab == 0 && <ProductDescription product={product} />}
        {tab == 1 && (
          <Typography sx={sx.text} variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus
            risus at ultrices mi tempus imperdiet nulla. Adipiscing diam donec
            adipiscing tristique risus nec. Massa enim nec dui nunc mattis enim
            ut tellus elementum. Aliquam nulla facilisi cras fermentum odio eu.
            Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Eu
            sem integer vitae justo eget magna. Neque gravida in fermentum et
            sollicitudin ac orci phasellus.
            <br />
            <br />
            Neque aliquam vestibulum morbi blandit cursus risus at ultrices.
            Parturient montes nascetur ridiculus mus mauris. Consectetur
            adipiscing elit ut aliquam purus sit. Commodo ullamcorper a lacus
            vestibulum sed arcu. Quis hendrerit dolor magna eget est lorem ipsum
            dolor sit. Ac tortor dignissim convallis aenean et tortor at risus.
            Lacus vel facilisis volutpat est velit egestas dui id ornare.
            Pretium aenean pharetra magna ac placerat vestibulum lectus mauris
            ultrices. Turpis egestas sed tempus urna et pharetra pharetra massa.
            Non curabitur gravida arcu ac tortor dignissim convallis aenean et.
          </Typography>
        )}
        {tab == 2 && (
          <Typography sx={sx.text} variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus
            risus at ultrices mi tempus imperdiet nulla. Adipiscing diam donec
            adipiscing tristique risus nec. Massa enim nec dui nunc mattis enim
            ut tellus elementum. Aliquam nulla facilisi cras fermentum odio eu.
            Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Eu
            sem integer vitae justo eget magna. Neque gravida in fermentum et
            sollicitudin ac orci phasellus.
            <br />
            <br />
            Neque aliquam vestibulum morbi blandit cursus risus at ultrices.
            Parturient montes nascetur ridiculus mus mauris. Consectetur
            adipiscing elit ut aliquam purus sit. Commodo ullamcorper a lacus
            vestibulum sed arcu. Quis hendrerit dolor magna eget est lorem ipsum
            dolor sit. Ac tortor dignissim convallis aenean et tortor at risus.
            Lacus vel facilisis volutpat est velit egestas dui id ornare.
            Pretium aenean pharetra magna ac placerat vestibulum lectus mauris
            ultrices. Turpis egestas sed tempus urna et pharetra pharetra massa.
            Non curabitur gravida arcu ac tortor dignissim convallis aenean et.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProductTabs;

const sx = {
  root: {
    width: "100%",
  },
  tabs: {
    borderBottom: "1px solid",
    borderColor: "common.divider",
  },
  content: {
    py: 2,
    minHeight: "240px",
  },
  text: {
    whiteSpace: "pre-line",
  },
};
