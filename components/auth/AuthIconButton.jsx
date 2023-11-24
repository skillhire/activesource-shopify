import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";

import { User } from "lucide-react";

const CartButton = () => {
  const router = useRouter();

  const handleUserClick = () => {
    router.push("/login");
  };

  return (
    <IconButton
      color="primary"
      onClick={handleUserClick}
      sx={sx.root}
      size="large"
    >
      <User height={24} width={24} color="white" />
    </IconButton>
  );
};

CartButton.propTypes = {
  styles: PropTypes.object,
};

export default CartButton;

const sx = {
  root: {},
};
