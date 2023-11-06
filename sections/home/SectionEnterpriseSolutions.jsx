import { Stack, Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";

const SectionFeaturedSolutions = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/enterprise-solutions`);
  };

  return (
    <Box sx={sx.root}>
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h3">
            Are you a large business looking for custom solutions?
          </Typography>
          <Typography variant="body1">
            Talk to our representative for more details on custom solutions
          </Typography>
          <Box pt={2}>
            <Button variant="contained" color="primary" size="large" onClick={handleClick} sx={sx.button}>
              Explore Enterprise Solutions
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

const sx = {
  root: {
    py: 16,
    // TODO: move colors to palette
    background: "linear-gradient(96deg, #AEDCFF 15.87%, #C7ACFF 65.05%)",
  },
  button: {
    width: {
      sm: 'auto',
      xs: '100%',
    },
  }
};


export default SectionFeaturedSolutions;

