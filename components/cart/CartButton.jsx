import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Badge, IconButton } from "@mui/material";
import { ShopContext } from "context";
import { ShoppingCart } from "lucide-react";

const CartButton = ({ color = "white", styles, ...props }) => {
  const { lineItemTotal, setMenuOpen, toggleCart } = useContext(ShopContext);

  const handleCartClick = () => {
    setMenuOpen(false);
    toggleCart();
  };

  return (
    <IconButton
      color="primary"
      onClick={handleCartClick}
      sx={{ ...sx.root, ...styles }}
      size="medium"
    >
      <Badge badgeContent={lineItemTotal} color="primary">
        <ShoppingCart height={24} width={24} color={color} />
      </Badge>
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
