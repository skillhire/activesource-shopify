import React from "react";
import { useRouter } from "next/router";

import { default as SignInOrUp, SIGNIN_OR_SIGNUP_TABS } from "components/auth/SignInOrUp";

const Login = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/");
  };

  return (
    <SignInOrUp tab={SIGNIN_OR_SIGNUP_TABS[0].tab} onSuccess={handleSuccess} />
  );
};

export default Login;
