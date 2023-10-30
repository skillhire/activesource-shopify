import React from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";

const SectionHeroPrimary = (props) => {
  const { home } = props;
  const router = useRouter();

  const handleClick = () => {
    router.push("/browse");
  };

  return (
    <Box sx={sx.root}>
      <Typography variant="h1">{home?.title}</Typography>
      <Typography variant="h1">{home?.subtitle}</Typography>
    </Box>
  );
};

export default SectionHeroPrimary;

const sx = {
  root: {
    mt: {
      sm: "80px",
      xs: 0,
    },
  },
};
