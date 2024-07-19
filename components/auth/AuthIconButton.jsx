import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import { useAuth } from "hooks";
import { User } from "lucide-react";
import { LOGIN_URL, ACCOUNT_SOURCE_URL } from "constants/navigation";

const CartButton = (props) => {
  const { color = "white" } = props || {};
  const router = useRouter();
  const { accessToken } = useAuth();

  const handleUserClick = () => {
    router.push(accessToken ? ACCOUNT_SOURCE_URL : LOGIN_URL);
  };

  return (
    <IconButton
      color="primary"
      onClick={handleUserClick}
      sx={sx.root}
      size="large"
    >
      <User height={24} width={24} color={color} />
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
