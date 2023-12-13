import { Link, Box, Container, Typography } from "@mui/material";

import { useResponsive } from "hooks";
import { ProductCollection } from "components";

const SectionFeaturedCollection = (props) => {
  const { isMobile } = useResponsive();
  const { featuredCollection } = props || {};
  return (
    <Container maxWidth="lg">
      <Box py={12}>
        <Box sx={sx.header}>
          <Typography variant="h4" sx={sx.title}>
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
            variant={isMobile ? "grid" : "carousel"}
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
    mb: { xs: 0, sm: 5 },
    flexWrap: { xs: "wrap", sm: "nowrap" },
    textAlign: { xs: "center", sm: "left" },
    justifyContent: { xs: "center", sm: "space-between" },
  },
  title: {
    mr: { xs: 0, sm: 2 },
    mb: { xs: 2, sm: 0 },
  },
  link: {
    py: 2,
    whiteSpace: "nowrap",
  },
};
