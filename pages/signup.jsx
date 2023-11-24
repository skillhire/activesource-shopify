import React from "react";
import { useRouter } from "next/router";

import { SignInOrUp } from "components";

const Signup = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/");
  };

  return (
    <SignInOrUp onSuccess={handleSuccess}></SignInOrUp>
  );
};

export default Signup;
