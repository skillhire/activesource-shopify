import React, { useEffect } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CustomizeProvider, SegmentProvider, ShopProvider } from "context";
import { theme } from "theme";
import { AuthFromCookie } from "components";
import { SEGMENT_WRITE_KEY } from "constants/shop";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "react-multi-carousel/lib/styles.css";

export default function ShopJs({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SegmentProvider writeKey={SEGMENT_WRITE_KEY}>
          <ShopProvider>
            <CustomizeProvider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <CssBaseline />
                <AuthFromCookie />
                <Component {...pageProps} />
              </LocalizationProvider>
            </CustomizeProvider>
          </ShopProvider>
        </SegmentProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
