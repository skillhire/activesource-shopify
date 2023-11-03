import { ProductCollection } from "components";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";

const SectionFeaturedCollection = (props) => {
  const { featuredCollection } = props || {};
  const router = useRouter();

  const handleClick = () => {
    router.push(`/collections/${featuredCollection.handle}`);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={sx.header}>
        <Typography variant="h4" my={8} maxWidth={633}>
          Personalize for your brand, explore our diverse range of products.
        </Typography>
        <Button variant="outlined" onClick={handleClick}>
          Explore Products
        </Button>
      </Box>
      {featuredCollection && (
        <ProductCollection
          handle={featuredCollection.handle}
          title={featuredCollection.title}
        />
      )}
    </Container>
  );
};

export default SectionFeaturedCollection;

const sx = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};
