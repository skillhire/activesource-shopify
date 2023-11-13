import { ProductCollection } from "components";
import { Link } from "@mui/material";
import { Box, Container, Typography } from "@mui/material";

const SectionFeaturedCollection = (props) => {
  const { featuredCollection } = props || {};
  return (
    <Container maxWidth="lg">
      <Box py={12}>
        <Box sx={sx.header} mb={5}>
          <Typography variant="h4" maxWidth={633} mr={2}>
            Personalize for your brand, explore our diverse range of products.
          </Typography>
          <Link
            href={`/collections/${featuredCollection?.handle}`}
            variant="link"
            sx={sx.link}
          >
            Explore Products
          </Link>
        </Box>
        {featuredCollection && (
          <ProductCollection
            handle={featuredCollection.handle}
            title={featuredCollection.title}
          />
        )}
      </Box>
    </Container>
  );
};

export default SectionFeaturedCollection;

const sx = {
  header: {
    display: "flex",
    alignItems: "center",
    flexWrap: {
      xs: "wrap",
      sm: "nowrap",
      md: "nowrap",
    },
    justifyContent: {
      xs: "center",
      sm: "space-between",
      md: "space-between",
    },
    textAlign: {
      xs: "center",
      sm: "left",
      md: "left",
    },
  },
  link: {
    py: 2,
    whiteSpace: "nowrap",
  },
};
