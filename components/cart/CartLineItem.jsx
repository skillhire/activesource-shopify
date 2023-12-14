import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "context";
import { useCheckout, useSegment } from "hooks";
import {
  Box,
  Link,
  Stack,
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

import QuantitySelector from "components/variants/QuantitySelector";

const CartLineItem = ({ lineItem }) => {
  const router = useRouter();
  const { trackAddToCart, trackRemoveFromCart } = useSegment();
  const { loading, checkoutLineItemsUpdate, checkoutLineItemRemove } =
    useCheckout();
  const { setCartOpen } = useContext(ShopContext);
  const { id, quantity, variant, customAttributes } = lineItem || {};

  const {
    product,
    price: { amount },
    image: { src },
  } = variant || {};

  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);

  const handleQuantityChange = async (newQuantity) => {
    if (quantity == 0) {
      return handleRemoveLineItem();
    }
    let newLineItem = {
      id,
      quantity: newQuantity,
      variantId: variant.id,
    };
    await checkoutLineItemsUpdate([newLineItem]);
    let diff = newQuantity - quantity;
    if (diff > 0) {
      trackAddToCart({
        quantity: diff,
        variant: variant,
        product: product,
      });
    } else {
      trackRemoveFromCart({
        quantity: diff,
        variant: variant,
        product: product,
      });
    }
  };

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
    let url = lineItem?.customAttributes.find(
      (attribute) => attribute.key === "url"
    )?.value;
    if (url) {
      router.push(url);
    } else {
      router.push(`/products/${product?.handle}`);
    }
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
    <Box sx={{ ...sx.root }}>
      <ListItem
        sx={{
          ...sx.container,
          ...(loading && sx.loading),
        }}
      >
        <ListItemButton sx={sx.listItemButton} disableRipple disableGutters>
          <ListItemIcon sx={sx.thumbnail}>
            <Image src={src} height={120} width={120} style={styles.image} />
          </ListItemIcon>
          <ListItemText
            sx={sx.text}
            primary={
              <Stack spacing={1}>
                <Typography
                  variant="subtitle2"
                  color="textPrimary"
                  sx={sx.line}
                >
                  <Box>{product?.title}</Box>
                  <IconButton>
                    <Close onClick={handleRemoveLineItem} sx={sx.removeIcon} />
                  </IconButton>
                </Typography>
                <Stack>
                  {color && (
                    <Typography variant="overline" color="text">
                      Color: {color}
                    </Typography>
                  )}
                  {size && (
                    <Typography variant="overline" color="text">
                      Size: {size}
                    </Typography>
                  )}
                </Stack>
                <Stack direction="row" spacing={1} sx={sx.quantity}>
                  <QuantitySelector
                    small
                    quantity={quantity}
                    handleChange={handleQuantityChange}
                  />
                  <Typography variant="button" color="textPrimary" sx={sx.line}>
                    <Box>
                      {amount == 0 ? "FREE" : formatCurrency(amount * quantity)}
                    </Box>
                  </Typography>
                </Stack>
              </Stack>
            }
          />
        </ListItemButton>
      </ListItem>
      <Link variant="link" onClick={handleClick} sx={sx.link}>
        <Typography variant="overline">Preview</Typography>
      </Link>
    </Box>
  );
};

export default CartLineItem;

const sx = {
  root: { p: 0 },
  container: {
    "&:not(:last-of-type)": {
      borderBottom: "1px solid",
      borderColor: "common.border",
    },
  },
  loading: { opacity: 0.6 },
  listItemButton: {
    display: "flex",
    alignItems: "flex-start",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  button: { p: 0 },
  thumbnail: { mr: 2 },
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
  removeIcon: {
    height: 21,
    fontSize: 21,
    color: "disabled",
  },
  quantity: {
    alignItems: "center",
    flexDirection: "row",
  },
  link: {
    cursor: "pointer",
  },
};

const styles = {
  image: {
    objectFit: "contain",
  },
};
