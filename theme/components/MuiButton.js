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
        fontSize: 20,
        lineHeight: "120%",
        height: 64,
        padding: "20px 52px",
      },
    },
    {
      props: { size: "medium" },
      style: {
        fontSize: 16,
        lineHeight: "120%",
        padding: "12px 16px"
      },
    },
    {
      props: { size: "small" },
      style: {
        fontSize: 14,
        lineHeight: "120%",
        padding: "12px 16px",
      },
    },
  ],
};
