import { Heading, ProductCollection } from "components";
import { Box, Button, Container } from "@mui/material";
import { useRouter } from "next/router";

const SectionFeaturedCollection = (props) => {
  const { featuredCollection } = props || {};
  const router = useRouter();

  const handleClick = () => {
    router.push(`/collections/${featuredCollection.handle}`);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={sx.container}>
        <Heading my={8}>Featured Products</Heading>
        {featuredCollection && (
          <ProductCollection
            handle={featuredCollection.handle}
            title={featuredCollection.title}
          />
        )}
        <Box sx={sx.button}>
          <Button variant="outlined" onClick={handleClick}>
            Shop All
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SectionFeaturedCollection;

const sx = {
  container: {
    mb: 6,
  },
  button: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    mt: 4,
  },
};
