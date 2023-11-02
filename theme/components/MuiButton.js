export default {
  styleOverrides: {
    root: {
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
      style: { fontSize: 20, lineHeight: "120%", }
    },
    {
      props: { size: "medium" },
      style: { fontSize: 16, lineHeight: "120%", }
    },
    {
      props: { size: "small" },
      style: { fontSize: 14, lineHeight: "120%" }
    }
  ]
};
