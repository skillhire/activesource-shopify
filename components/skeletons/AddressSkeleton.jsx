import React from "react";
import PropTypes from "prop-types";
import { Card, Skeleton } from "@mui/material";

const AddressSkeleton = ({ styles, ...props }) => {
  return (
    <Card sx={{ ...sx.root, ...styles }} elevation={0}>
      <Skeleton
        animation={false}
        variant="rectangular"
        width={"100%"}
        height={20}
      />
      <Skeleton
        animation={false}
        variant="rectangular"
        width={"100%"}
        height={20}
      />
      <Skeleton animation={false} />
      <Skeleton animation={false} />
      <Skeleton animation={false} />
    </Card>
  );
};

AddressSkeleton.propTypes = {
  styles: PropTypes.object,
};

export default AddressSkeleton;

const sx = {
  root: {
    my: 2,
    width: "100%",
  },
};
