import Image from "next/image";
import {
  Stack,
  Chip,
  Container,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

import DesignImage from "assets/upload-design@2x.png";
import PickProductImage from "assets/pick-product@2x.png";
import OrderProductImage from "assets/order-product@2x.png";
import DesignIcon from "assets/pencil-icon.svg";
import PickProductIcon from "assets/cursor-icon.svg";
import OrderProductIcon from "assets/cart-icon.svg";

const ITEMS = [
  {
    title: "Pick a Product",
    description: "Choose from our range of styles, sizes, and colors. We’ve curated the best-fitting, highest-quality apparel so you can be proud of what you offer your members.",
    image: PickProductImage,
    icon: PickProductIcon,
  },
  {
    title: "Customize your Design",
    description:
      "With 15 different placements and full-color printing, there's virtually no limit on what you can create. Go from generic to “wow!” in just two clicks.",
    image: DesignImage,
    icon: DesignIcon,
  },
  {
    title: "Order the Product",
    description:
      'Once you click "order," your merch will ship in mere days. Congratulations! That new revenue stream you\'ve been wanting? It\'s yours.',
    image: OrderProductImage,
    icon: OrderProductIcon,
  },
];

const SectionFeaturedCollection = () => {
  return (
    <Container maxWidth="lg" sx={sx.root}>
      <Stack sx={sx.header} spacing={2}>
        <Chip label="OUR PROCESS" variant="filled" color="tertiary" />
        <Typography variant="h3" maxWidth={700}>
          Launch your fitness apparel collection in 3 easy steps
        </Typography>
        <Typography variant="body1" maxWidth={700}>
        You can be launched in five minutes or less. Just select your styles, upload your artwork, and get ready to profit.
        </Typography>
      </Stack>
      <Stack>
        {ITEMS.map((item, i) => {
          let itemContainerClass = { ...sx.itemContainer };
          if (i % 2 !== 0) {
            itemContainerClass = {
              ...itemContainerClass,
              ...sx.itemContainerReversed,
            };
          }
          return (
            <Box key={item.title} sx={itemContainerClass}>
              <Box sx={sx.item}>
                <Stack spacing={2}>
                  <Box>
                    <IconButton disabled sx={sx.iconButton}>
                      <Image
                        responsive="true"
                        src={item.icon}
                        alt={`${item.title} Icon`}
                        width={24}
                        height={24}
                      />
                    </IconButton>
                  </Box>
                  <Typography variant="body2">
                    STEP {i >= 10 ? i + 1 : `0${i + 1}`}
                  </Typography>
                  <Typography variant="h3">{item.title}</Typography>
                  <Typography variant="homeDescription" maxWidth={380}>
                    {item.description}
                  </Typography>
                </Stack>
              </Box>
              <Box sx={sx.imageContainer}>
                <Image
                  src={item.image}
                  alt={`${item.title} Image`}
                  style={sx.image}
                />
              </Box>
            </Box>
          );
        })}
      </Stack>
      <Box sx={sx.buttonContainer}>
        <Button sx={ sx.button } variant="contained" color="secondary" href="/collections/womens">
          Get Started 
        </Button>
      </Box>
    </Container>
  );
};

export default SectionFeaturedCollection;

const sx = {
  root: {
    pt: 0,
    pb: 6,
  },
  header: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
  },
  iconButton: {
    p: 1,
    background: (theme) => `${theme.palette.tertiary.main} !important`,
  },
  image: {
    objectFit: "contain",
    width: "100%",
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
    my: 0,
    display: "flex",
    alignItems: "center",
    flexDirection: {
      sm: "row",
      xs: "column"
    }
  },
  itemContainerReversed: {
    flexDirection: {
      sm: "row-reverse",
      xs: "column"
    }
  },
  item: {
    my: 5,
    px: {
      sm: 4,
      xs: 0
    },
    display: "flex",
    flex: 1,    
    textAlign: {
      sm: "left",
      xs: "center"
    },
    alignItems: {
      sm: "flex-start",
      xs: "center"    
    },
    justifyContent: {
      sm: "flex-start",
      xs: "center"
    },    
  },
  buttonContainer: {
    mt: 4,
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: 220,
    height: 64,
    fontSize: 20
  }
};
