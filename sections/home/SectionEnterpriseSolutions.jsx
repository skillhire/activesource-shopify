import { Stack, Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";

const SectionFeaturedSolutions = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/enterprise-solutions`);
  };

  return (
    <Box py={16} sx={{ background: (theme) => theme.palette.gradient.main }}>
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
  button: {
    width: {
      sm: 'auto',
      xs: '100%',
    },
  }
};


export default SectionFeaturedSolutions;

