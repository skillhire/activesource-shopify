export default {
  styleOverrides: {
    root: {},
    colorSecondary: ({ theme }) => ({
      border: "1px solid",
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    }),
  },
};
