import React from "react";
import { Box, Container, Typography } from "@mui/material";

const SimplePage = ({ title, subtitle, image, body, html = false, ...props }) => {

  return (
    <Box sx={sx.root}>           
      <Container maxWidth="md" sx={ sx.container }>                
        <div data-tf-live="01HNVSQKZEYK6MJ3KXHMZYQEGD"></div>
      </Container>
    </Box>
  );
};

export default SimplePage;

const sx = {
  root: {
    py: '200px',
  },
  title: {
    mb: '40px'
  },  
  container: {
    maxWidth: '776px',
    minHeight: '800px'
  },
};
