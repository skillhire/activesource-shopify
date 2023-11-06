import { ProductCollection } from "components";
import { Link } from "@mui/material";
import { Box, Container, Typography } from "@mui/material";

const SectionFeaturedCollection = (props) => {
  const { featuredCollection } = props || {};
  return (
    <Container maxWidth="lg">
      <Box sx={sx.header}>
        <Typography variant="h4" my={8} maxWidth={633}>
          Personalize for your brand, explore our diverse range of products.
        </Typography>
        {featuredCollection && (
          <Link href={`/collections/${featuredCollection.handle}`} variant="link">
            Explore Products
          </Link>
        )}
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
