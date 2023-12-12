import React, { useEffect, useState, useContext } from "react";
import { useBitly } from "hooks";
import { CustomizeContext } from "context";
import { CLIENT_URL } from "constants/shop";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

const sign = require("jwt-encode");

const CustomizeProvider = ({ children, ...rest }) => {
  const router = useRouter();
  const { jwt, handle } = router.query;

  const [customization, setCustomization] = useState({
    variantId: null,
    frontLogo: null,
    backLogo: null,
    front: null,
    back: null,
  });

  const { shortenUrl } = useBitly();

  const createBitlyLink = async () => {
    const jwt = encodeJwt(customization);
    let longUrl = `${CLIENT_URL}/products/${handle}?jwt=${jwt}`;
    let shortUrl = await shortenUrl(longUrl);
    return shortUrl;
  };

  const encodeJwt = (data) => {
    const secret = "no-security-required";
    const jwt = sign(data, secret);
    return jwt;
  };

  useEffect(() => {
    if (jwt?.length > 0) {
      const newCustomization = jwt_decode(jwt);
      setCustomization(newCustomization);
    }
  }, [jwt]);

  const value = {
    customization,
    setCustomization,
    createBitlyLink,
    encodeJwt,
  };

  return (
    <CustomizeContext.Provider value={value}>
      {children}
    </CustomizeContext.Provider>
  );
};

export default CustomizeProvider;
