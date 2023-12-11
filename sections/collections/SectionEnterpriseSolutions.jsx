import { Stack, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";

import FlyingShirts from "assets/flying-shirts@2x.png";

const SectionEnterpriseSolutions = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/enterprise-solutions`);
  };

  return (
    <Box sx={sx.root}>
      <Stack spacing={2} maxWidth={400}>
        <Typography variant="h5">
          Are you a large business looking for custom solutions?
        </Typography>
        <Typography variant="body2">
          Talk to our representative for more details on custom solutions
        </Typography>
        <Box pt={2}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleClick}
            sx={sx.button}
          >
            Explore Enterprise Solutions
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

const sx = {
  root: {
    p: 7,
    display: { xs: "none", sm: "block" },
    borderRadius: 2,
    background: (theme) => theme.palette.gradient.main,
    background: (theme) =>
      `url(${FlyingShirts.src}) right center no-repeat, ${theme.palette.gradient.main}`,
    backgroundSize: "auto 100%, 100%",
    "@media (max-width: 1200px)": {
      background: (theme) => theme.palette.gradient.main,
    },
  },
  button: {
    width: {
      sm: "auto",
      xs: "100%",
    },
  },
};

export default SectionEnterpriseSolutions;
