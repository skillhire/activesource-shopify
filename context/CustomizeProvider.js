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
    url: null,
    front_image: null,
    back_image: null,
    front_placement_code: null,
    back_placement_code: null,
  });

  const [openMobile, setOpenMobile] = useState(false);

  const { shortenUrl } = useBitly();

  const createBitlyLink = async () => {
    const jwt = encodeJwt(items);
    let longUrl = `${CLIENT_URL}/customize/${handle}?jwt=${jwt}`;
    let shortUrl = await shortenUrl(longUrl);
    return shortUrl;
  };

  const encodeJwt = (data) => {
    const secret = "no-security-required";
    const jwt = sign(data, secret);
    return jwt;
  };

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
