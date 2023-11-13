import Image from "next/image";
import { Stack, Chip, Container, Grid, Typography, Box, IconButton } from "@mui/material";

import DesignImage from "assets/upload-design@2x.png";
import PickProductImage from "assets/pick-product@2x.png";
import OrderProductImage from "assets/order-product@2x.png";
import DesignIcon from "assets/pencil-icon.svg";
import PickProductIcon from "assets/cursor-icon.svg";
import OrderProductIcon from "assets/cart-icon.svg";


const ITEMS = [
  {
    title: "Pick a Product",
    description: "Choose from our wide range of products",
    image: PickProductImage,
    icon: PickProductIcon,
  },
  {
    title: "Upload your Design",
    description: "Easily add your designs to a wide range of products using our free tools",
    image: DesignImage,
    icon: DesignIcon,
  },
  {
    title: "Order the Product",
    description: "Relax while we handle the fulfillment and shipping of your order",
    image: OrderProductImage,
    icon: OrderProductIcon,
  }
]

const SectionFeaturedCollection = () => {
  return (
    <Container maxWidth="lg" sx={sx.root}>
      <Stack sx={sx.header}>
        <Chip label="OUR PROCESS" variant="filled" color="tertiary" />
        <Typography variant="h2" maxWidth={700} my={2}>
          Launch your fitness apparel collection in 3 easy steps
        </Typography>
      </Stack>
      <Stack>
        {ITEMS.map((item, i) => {
          let itemContainerClass = { ...sx.itemContainer };
          if (i % 2 !== 0) {
            itemContainerClass = { ...itemContainerClass, ...sx.itemContainerReversed }
          }
          return (
            <Box
              key={item.title}
              sx={itemContainerClass}
            >
              <Box sx={sx.item}>
                <Stack spacing={1}>
                  <Box>
                    <IconButton disabled sx={sx.iconButton} >
                      <Image responsive="true" src={item.icon} alt={`${item.title} Icon`} width={24} height={24} />
                    </IconButton>
                  </Box>
                  <Typography variant="body1">STEP {i >= 10 ? i + 1 : `0${i + 1}`}</Typography>
                  <Typography variant="h3">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" maxWidth={380}>
                    {item.description}
                  </Typography>
                </Stack>
              </Box>
              <Box sx={sx.imageContainer}>
                <Image src={item.image} alt={`${item.title} Image`} style={sx.image} />
              </Box>
            </Box>
          )
        })}
      </Stack>
    </Container >
  );
};

export default SectionFeaturedCollection;

const sx = {
  root: {

  },
  header: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  iconButton: {
    p: 1,
    background: (theme) => `${theme.palette.tertiary.main} !important`
  },
  image: {
    objectFit: "contain",
    width: "75%",
    height: "auto",
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  imageContainer: {
    flex: 1,
    position: "relative",
    "@media (max-width: 600px)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  itemContainer: {
    my: 5,
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 600px)": {
      flexDirection: "column",
    },
  },
  itemContainerReversed: {
    flexDirection: "row-reverse",
  },
  item: {
    my: 5,
    px: 4,
    flex: 1,
    "@media (max-width: 600px)": {
      padding: 0,
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },
  }
};
