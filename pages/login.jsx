import React from "react";
import { useRouter } from "next/router";

import { ACCOUNT_SOURCE_URL } from "constants/navigation";
import {
  default as SignInOrUp,
  SIGNIN_OR_SIGNUP_TABS,
} from "components/auth/SignInOrUp";

const Login = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push(ACCOUNT_SOURCE_URL);
  };

  return (
    <SignInOrUp tab={SIGNIN_OR_SIGNUP_TABS[0].tab} onSuccess={handleSuccess} />
  );
};

export default Login;
