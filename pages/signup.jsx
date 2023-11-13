import React from "react";
import { SignUp } from "components";
import { Box, Container } from "@mui/material";
import { Layout } from "components";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const handleSuccess = () => {
    router.push("/");
  };
  return (
    <Layout>
      <Box sx={sx.root}>
        <Container maxWidth="sm">
          <SignUp onSuccess={handleSuccess} />
        </Container>
      </Box>
    </Layout>
  );
};

export default Signup;

const sx = {
  root: {
    mt: 6,
  },
};
