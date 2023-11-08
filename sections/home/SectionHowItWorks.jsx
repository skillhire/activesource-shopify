import Image from "next/image";
import { Stack, Chip, Container, Grid, Typography } from "@mui/material";

import PickProduct from "assets/pick-product@2x.png";

const ITEMS = [{
  title: "Pick a Product",
  description: "Choose from our wide range of products",
  image: PickProduct,
}]

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
        {ITEMS.map((item, i) => (
          <Grid container key={item.title}>
            <Grid item xs={12} sm={6}>
              <Stack>
                <Typography variant="body1">STEP {i >= 10 ? i + 1 : `0${i + 1}`}</Typography>
                <Typography variant="h3">
                  {item.title}
                </Typography>
                <Typography variant="body1">
                  {item.description}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} sx={sx.imageContainer}>
              <Image src={item.image} alt="Hero Image 2" style={sx.image} />
            </Grid>
          </Grid>
        ))}
      </Stack>
    </Container>
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
  image: { objectFit: "contain", width: "75%", height: "auto" },
  imageContainer: { position: "relative" },
};
