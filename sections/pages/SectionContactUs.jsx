import { Stack, Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";

const SectionFeaturedSolutions = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/contact-us`);
  };

  return (
    <Box py={16} sx={sx.root}>
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h3">
            Lorem ipsum dolor sit amet consectetur adipiscing elit
          </Typography>
          <Typography variant="body1">
            Talk to our representative for more details on custom solutions
          </Typography>
          <Box pt={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleClick}
              sx={sx.button}
            >
              Contact Us Now
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

const sx = {
  root: {
    background: (theme) => theme.palette.gradient.main,
  },
  button: {
    width: {
      sm: "auto",
      xs: "100%",
    },
  },
};

export default SectionFeaturedSolutions;
