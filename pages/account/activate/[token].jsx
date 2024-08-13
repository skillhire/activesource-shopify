import React from "react";
import { useRouter } from "next/router";
import { AuthScreen, ActivateCustomer } from "components";

const Reset = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/login');
  };

  return (
    <AuthScreen>
      <ActivateCustomer onSuccess={handleSuccess} />
    </AuthScreen>
  );
};

export default Reset;
