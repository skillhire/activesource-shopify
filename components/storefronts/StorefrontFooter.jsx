import React from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  Container,
  Link,
} from "@mui/material";
import Image from "next/image";
import LOGO from 'assets/powered-by-logo.svg'

const StorefrontFooter = ({ name }) => {
  return (
    <Box sx={sx.root}>
      <Container maxWidth="lg">
        <Box sx={sx.footer}>
          <Stack direction="row" sx={sx.column}>
            <Typography variant="body2" color="primary.contrastText">
              © 2024 {name}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={sx.column2}>
            <Box sx={ sx.logo }>
              <Link href="https://www.activesourcelab.com">
                <Image 
                  src={ LOGO }
                  width={240}
                  height={60}
                  alt="Powered by ActiveSource"
                  style={{
                    width: '100%',
                    objectFit: 'contain'
                  }}
                />
            </Link>
            </Box>
          </Stack>
          <Stack direction="row" sx={sx.column}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Link href="/privacy-policy" sx={sx.link}>
                <Typography variant="body2" color="primary.contrastText">
                  Privacy Policy
                </Typography>
              </Link>
              <Link href="/terms-of-service" sx={sx.link}>
                <Typography variant="body2" color="primary.contrastText">
                  Terms of Service
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default StorefrontFooter;

const sx = {
  root: {
    backgroundColor: "primary.main",
    py: 2,
  },
  footer: {
    display: "grid",
    gridTemplateColumns: {
      md: "1fr 1fr 1fr 1fr",
      xs: "1fr",
    },
  },
  link: {
    color: "primary.contrastText",
  },
  column: {
    height: 50,
    gridColumn: "span 1",
    alignItems: "center",
    justifyContent: "center",
  },
  column2: {
    gridColumn: "span 2",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: "20px",
    borderRight: "1px solid",
    borderColor: "common.white",
  },
  logo: {
    width: '230px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
