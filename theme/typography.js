import { capitalize } from "@mui/material";

export default {
  fontFamily: ["Poppins"],
  // Big Heading (SemiBold) 60/133
  h1: {
    fontSize: 60,
    fontWeight: 600,
    lineHeight: "133%", /* 79.8px */
    letterSpacing: "-0.9px",
  },
  // Heading (SemiBold) 45/133
  h2: {
    fontSize: 45,
    fontWeight: 600,
    lineHeight: "133%", /* 59.85px */
    // Mobile Heading 25/120
    "@media (max-width: 600px)": {
      fontSize: 35,
      lineHeight: "120%",
    },
  },
  // Title (SemiBold) 35/120
  h3: {
    fontSize: 35,
    fontWeight: 600,
    lineHeight: "120%", /* 42px */
  },
  // Small Title (SemiBold) 30/133
  h4: {
    fontSize: 30,
    fontWeight: 600,
    lineHeight: "133%", /* 39.9px */
  },
  subtitle1: { // Header Menu (SemiBold) 16/120
    fontSize: 16,
    fontWeight: 600,
    lineHeight: "120%",
  },
  subtitle2: { // Form Title (Medium) 16/120
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "120%",
  },
  body1: { // Big Body Copy (Regular) 20/120
    fontSize: 20,
    fontWeight: 400,
    lineHeight: "120%",
  },
  body2: { // Body Copy (Regular) 16/120
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "120%",
    // Mobile Body Copy 14/120
    "@media (max-width: 600px)": {
      fontSize: 14,
    },
  },
  overline: { // Small Body (Regular) 13/120
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "120%",
    // Mobile Footer Menu 14/200
    "@media (max-width: 600px)": { // Mini Body (Regular) 10/120
      fontSize: 10,
      fontWeight: 400,
      lineHeight: "120%",
    },
  },
  caption: { // Mini Body (Regular) 10/120
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "120%",
  },
  button: {
    textTransform: "capitalize",
  },
  // custom:
  link: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: "120%",
    textDecoration: "underline",
  },
  footer: { // Footer Menu 16/200
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "200%",
    // Mobile Footer Menu 14/200
    "@media (max-width: 600px)": {
      fontSize: 14,
    },
  },
};
