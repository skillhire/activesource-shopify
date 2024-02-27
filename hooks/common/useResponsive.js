import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const useResponsive = (props) => {
  const theme = useTheme();

  const [breakpoint, setBreakpoint] = useState("desktop");
  const [breakpointWidth, setBreakpointWidth] = useState(
    theme.breakpoints.values.lg
  );

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isSuperLargeDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const setResponsiveBreakpoint = () => {
    if (isMobile) {
      setBreakpoint("mobile");
      setBreakpointWidth(theme.breakpoints.values.sm);
    }
    if (isTablet) {
      setBreakpoint("tablet");
      setBreakpointWidth(theme.breakpoints.values.md);
    }
    if (isDesktop) {
      setBreakpoint("desktop");
      setBreakpointWidth(theme.breakpoints.values.lg);
    }
    if (isSuperLargeDesktop) {
      setBreakpoint("superLargeDesktop");
      setBreakpointWidth(theme.breakpoints.values.xl);
    }
  };

  useEffect(() => {
    setResponsiveBreakpoint();
  }, [isMobile, isTablet, isDesktop, isSuperLargeDesktop]);

  return {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isSuperLargeDesktop,
    breakpointWidth,
  };
};

export default useResponsive;
