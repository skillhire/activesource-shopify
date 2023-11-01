export default {
  fontFamily: ["Poppins"],
  h1: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 60,
    lineHeight: "133%", /* 79.8px */
    letterSpacing: "-0.9px",
  },
  h2: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 45,
    lineHeight: "133%", /* 59.85px */
    "@media (max-width: 600px)": {
      fontSize: 35,
      lineHeight: "120%",
    },
  },
  h3: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 35,
    lineHeight: "120%", /* 42px */
  },
  h4: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 30,
    lineHeight: "133%", /* 39.9px */
  },
  body1: {
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: 500,
    lineHeight: "120%",
  },
  body2: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "120%",
    "@media (max-width: 600px)": {
      fontSize: 14,
    },
  },
  body3: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: 13,
    lineHeight: "120%",
  },
  body4: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: 10,
    lineHeight: "120%",
  },
  footer: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "200%",
    "@media (max-width: 600px)": {
      fontSize: 14,
    },
  },
  // TODO: check if needed
  caption: {
    fontFamily: "Poppins",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.33px",
    lineHeight: "120%",
    textTransform: "uppercase",
  },
  overline: {
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.33px",
    lineHeight: "120%",
    textTransform: "uppercase",
  },
};
