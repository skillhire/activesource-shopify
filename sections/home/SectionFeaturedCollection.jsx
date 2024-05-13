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
          <Box sx={sx.titleContainer}>
            <Typography variant="h4" sx={sx.title}>
              Your Members Deserve The Best
            </Typography>
            <Typography variant="body1" sx={sx.subtitle}>
              We’ve curated a collection of high-quality and best-fitting
              on-trend apparel at wholesale prices. Choose yours today.
            </Typography>
          </Box>
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
  titleContainer: {
    maxWidth: "660px",
  },
};
