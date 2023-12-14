import React from "react";
import { useRouter } from "next/router";
import {
  AuthScreen,
  ResetPassword 
} from "components";

const Reset = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push(ACCOUNT_SOURCE_URL);
  };

  return (
    <AuthScreen>
      <ResetPassword onSuccess={handleSuccess} />
    </AuthScreen>
  );
};

export default Reset;
