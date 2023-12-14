import React from "react";
import { useRouter } from "next/router";
import { AuthScreen, ForgotPassword } from "components";
import { ACCOUNT_SOURCE_URL } from "constants/navigation";

const Forgot = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push(ACCOUNT_SOURCE_URL);
  };

  return (
    <AuthScreen>
      <ForgotPassword onSuccess={handleSuccess} />
    </AuthScreen>
  );
};

export default Forgot;
