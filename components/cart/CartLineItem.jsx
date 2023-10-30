import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "context";
import { useCheckout, useSegment } from "hooks";
import {
  Badge,
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Close } from "@mui/icons-material";
import { formatCurrency } from "utils";
import { useRouter } from "next/router";

const CartLineItem = ({ lineItem }) => {
  const router = useRouter();
  const { trackRemoveFromCart } = useSegment();
  const { loading, checkoutLineItemRemove } = useCheckout();
  const { setCartOpen } = useContext(ShopContext);

  const { id, quantity, variant, customAttributes } = lineItem || {};

  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);

  const {
    product,
    price: { amount },
    image: { src },
  } = variant || {};

  const handleRemoveLineItem = async (event) => {
    event.stopPropagation();
    await checkoutLineItemRemove(id);

    trackRemoveFromCart({
      quantity,
      variant,
      product,
    });
  };

  const handleClick = () => {
    router.push(`/products/${product?.handle}`);
    setCartOpen(false);
  };

  useEffect(() => {
    if (variant) {
      const _size = variant.selectedOptions.find(
        (option) => option.name == "Size"
      );
      setSize(_size?.value);
    }
  }, [variant]);

  useEffect(() => {
    if (customAttributes) {
      const _color = customAttributes.find(
        (attribute) => attribute.key === "color"
      );
      setColor(_color?.value);
    }
  }, [customAttributes]);

  return (
    <ListItem
      sx={{
        ...sx.root,
        ...(loading && sx.loading),
      }}
    >
      <ListItemButton
        onClick={handleClick}
        sx={sx.listItemButton}
        disableRipple
        disableGutters
      >
        <ListItemIcon sx={sx.thumbnail}>
          <Badge badgeContent={quantity} color="primary">
            <Image src={src} height={72} width={72} style={styles.image} />
          </Badge>
        </ListItemIcon>
        <ListItemText
          sx={sx.text}
          primary={
            <Box>
              <Typography variant="button" color="textPrimary" sx={sx.line}>
                <Box sx={sx.fields}>{product?.title}</Box>
                <IconButton size={"small"} sx={sx.removeButton}>
                  <Close onClick={handleRemoveLineItem} sx={sx.removeIcon} />
                </IconButton>
              </Typography>
              {size && (
                <Typography variant="body2" color="textSecondary">
                  size: {size}
                </Typography>
              )}
              {color && (
                <Typography variant="body2" color="textSecondary">
                  color: {color}
                </Typography>
              )}
              <Typography variant="button" color="textPrimary" sx={sx.line}>
                <Box>{amount == 0 ? "FREE" : formatCurrency(amount)}</Box>
              </Typography>
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default CartLineItem;

const sx = {
  root: {
    p: 0,
    pb: 2.5,
    "&:not(:last-of-type)": {
      mb: 2.5,
      borderBottom: "1px solid",
      borderColor: "common.border",
    },
  },
  loading: {
    opacity: 0.6,
  },
  listItemButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  button: {
    p: 0,
  },
  thumbnail: {
    mr: 2,
  },
  text: {
    height: 72,
    m: 0,
  },
  line: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 20,
    lineHeight: "20px",
  },
  removeButton: {
    mt: "-8px",
    mr: "-8px",
  },
  removeIcon: {
    height: 20,
    fontSize: 20,
    color: "primary.main",
  },
};

const styles = {
  image: {
    objectFit: "contain",
  },
};
