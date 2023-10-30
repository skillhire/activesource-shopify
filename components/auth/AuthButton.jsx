import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { DesktopMenuItem } from "components";
import { useAuth } from "hooks";
import { useRouter } from "next/router";

const AuthButton = ({ styles, ...props }) => {
  const router = useRouter();
  const { accessToken, signOut } = useAuth();

  const handleClick = (url) => {
    router.push(url);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return accessToken ? (
    <>
      <DesktopMenuItem
        menuItem={{
          title: "My Account",
          url: "/account",
        }}
        handleClick={handleClick}
      />
      <DesktopMenuItem
        menuItem={{
          title: "Log out",
          url: "/",
        }}
        handleClick={handleSignOut}
      />
    </>
  ) : (
    <>
      <DesktopMenuItem
        menuItem={{
          title: "Login",
          url: "/login",
        }}
        handleClick={handleClick}
      />
      <DesktopMenuItem
        menuItem={{
          title: "Register",
          url: "/register",
        }}
        handleClick={handleClick}
      />
    </>
  );
};

AuthButton.propTypes = {
  styles: PropTypes.object,
};

export default AuthButton;

const sx = {
  root: {},
};
