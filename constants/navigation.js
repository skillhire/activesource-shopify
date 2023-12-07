export const SUPPORT_URL = "/support";
export const SERVICES_URL = "/services";
export const SHOP_ALL_URL = "/collections/home";
export const LOGIN_URL = "/login";
export const ACCOUNT_SOURCE_URL = "/account/me";

export const COLLECTIONS_MENU = [
  { label: "Shop All", handle: "home", value: SHOP_ALL_URL, divider: false },
  { label: "Men's clothing", handle: "mens", value: "/collections/mens", divider: false },
  { label: "Women's clothing", handle: "womens", value: "/collections/womens", divider: false },
  { label: "Accessories", handle: "accessories", value: "/collections/accessories", divider: false },
];

export const SUPPORT_SUBMENU = [
  { label: "Help Center", value: "/help-center", divider: false },
  { label: "Contact Us", value: "/contact-us", divider: false },
];

export const SERVICES_SUBMENU = [
  {
    label: "Enterprise Solution",
    value: "/enterprise-solution",
    divider: false,
  },
  { label: "Hire an Expert", value: "/hire-an-expert", divider: false },
  { label: "About Us", value: "/about-us", divider: false },
];

export const PRODUCTS_MENU = [
  {
    label: "Products",
    value: SHOP_ALL_URL,
    divider: false,
    hasSubmenu: true,
    submenu: COLLECTIONS_MENU,
  },
];

export const SERVICES = [
  {
    label: "Services",
    value: SERVICES_URL,
    divider: false,
    hasSubmenu: true,
    submenu: SERVICES_SUBMENU,
  },
];

export const SUPPORT_MENU = [
  {
    label: "Need Help?",
    value: SUPPORT_URL,
    divider: false,
    hasSubmenu: true,
    submenu: SUPPORT_SUBMENU,
  },
];

export const NAVIGATION_MENU = [...PRODUCTS_MENU, ...SERVICES, ...SUPPORT_MENU];

export const LEGAL_MENU = [
  { label: "Privacy Policy", value: "/privacy-policy", divider: false },
  { label: "Terms of Use", value: "/terms-of-use", divider: false },
];

export const ACCOUNT_MENU = [
  { label: "My Account", value: ACCOUNT_SOURCE_URL, divider: false },
  { label: "Order History", value: "/account/orders", divider: false },
];

export const LOGGED_MENU = [
  {
    label: "Account",
    value: ACCOUNT_SOURCE_URL,
    divider: false,
    hasSubmenu: true,
    submenu: ACCOUNT_MENU,
  },
];

export const UNLOGGED_MENU = [
  { label: "Login", value: LOGIN_URL, divider: false },
];