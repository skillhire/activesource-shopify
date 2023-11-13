import React from "react";
import { SignIn } from "components";
import { Box, Container } from "@mui/material";
import { Layout } from "components";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const handleSuccess = () => {
    router.push("/");
  };
  return (
    <Layout>
      <Box sx={sx.root}>
        <Container maxWidth="sm">
          <SignIn onSuccess={handleSuccess} />
        </Container>
      </Box>
    </Layout>
  );
};

export default Login;

const sx = {
  root: {
    mt: 6,
  },
};
