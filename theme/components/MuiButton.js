export default {
  styleOverrides: {
    root: {
      fontWeight: 600,
      boxShadow: "none",
      "&:hover": {
        boxShadow: "none",
      },
    },
    text: {
      boxShadow: "none",
    },
    outlined: {
      height: 44,
      minHeight: 44,
      minWidth: 140,
      borderRadius: 50,
      boxShadow: "none",
    },
    contained: {
      height: 44,
      minHeight: 44,
      minWidth: 140,
      borderRadius: 50,
      boxShadow: "none",
    },
  },
  variants: [
    {
      props: { size: "large" },
      style: {
        height: 64,
        fontSize: 20,
        lineHeight: "120%",
        padding: "20px 52px",
        "@media (max-width: 600px)": {
          height: 42,
          fontSize: 14,
          padding: "12px 24px",
        },
      },
    },
    {
      props: { size: "medium" },
      style: {
        fontSize: 16,
        lineHeight: "120%",
        padding: "12px 24px",
        "@media (max-width: 600px)": {
          height: 42,
          fontSize: 14,
        },
      },
    },
    {
      props: { size: "small" },
      style: {
        height: 42,
        fontSize: 14,
        lineHeight: "120%",
        padding: "12px 24px",
      },
    },
  ],
};
