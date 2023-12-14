import React from "react";
import { useRouter } from "next/router";
import {
  AuthScreen,
  ResetPassword 
} from "components";
import { ACCOUNT_SOURCE_URL } from "constants/navigation";

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
