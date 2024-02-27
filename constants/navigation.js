export const SUPPORT_URL = "/contact-us";
export const SERVICES_URL = "/services";
export const ABOUT_URL = "/about-us";
export const SHOP_ALL_URL = "/collections/womens";
export const LOGIN_URL = "/login";
export const PRINTING_URL = '/pages/printing-guide';
export const USEFUL_URL = '/pages/useful-guide';
export const ACCOUNT_SOURCE_URL = "/account/me";

export const COLLECTIONS_MENU = [  
  {
    label: "Women's clothing",
    handle: "womens",
    value: "/collections/womens",
    divider: false,
  },
  {
    label: "Men's clothing",
    handle: "mens",
    value: "/collections/mens",
    divider: false,
  },  
  {
    label: "Unisex",
    handle: "unisex",
    value: "/collections/unisex",
    divider: false,
  },
  {
    label: "Accessories",
    handle: "accessories",
    value: "/collections/accessories",
    divider: false,
  }
];

export const PRINTING_SUBMENU = [
  { label: "Printing Guide", value: "/docs/printing-guide", divider: false },
];

export const USEFUL_SUBMENU = [
  { label: "Shipping", value: "/docs/shipping", divider: false },
  { label: "Return Policy", value: "/docs/return-policy", divider: false },
];

export const SUPPORT_SUBMENU = [
  { label: "Contact Us", value: "/contact-us", divider: false },
  { label: "Hire an Expert", value: "/hire-an-expert", divider: false },
  { label: "Printing Guide", value: "/docs/printing-guide", divider: false },
];

export const SERVICES_SUBMENU = [
  {
    label: "Enterprise Solutions",
    value: "/enterprise-solutions",
    divider: false,
  },
  { label: "Hire an Expert", value: "/hire-an-expert", divider: false },
  { label: "About Us", value: "/about-us", divider: false },
];


export const ABOUT_SUBMENU = [  
  { label: "About Us", value: "/about-us", divider: false },
  { label: "Shipping", value: "/docs/shipping", divider: false },
  { label: "Sales Tax", value: "/docs/sales-tax", divider: false },
  { label: "Quality Assurance", value: "/docs/quality-assurance", divider: false },
];  

export const PRODUCTS_MENU = {
  label: "Products",
  value: SHOP_ALL_URL,
  divider: false,
  hasSubmenu: true,
  submenu: COLLECTIONS_MENU,
}

export const ABOUT_US = {
  label: "Enterprise Solutions",
  value: ABOUT_URL,
  divider: false,
  hasSubmenu: true,
  submenu: ABOUT_SUBMENU,
}

export const SERVICES = {
  label: "Enterprise Solutions",
  value: SERVICES_URL,
  divider: false,
  hasSubmenu: true,
  submenu: SERVICES_SUBMENU,
}

export const SUPPORT_MENU = {
  label: "Need Help?",
  value: SUPPORT_URL,
  divider: false,
  hasSubmenu: true,
  submenu: SUPPORT_SUBMENU,
}

export const PRINTING_GUIDE = {
  label: "Printing Guide",
  value: PRINTING_URL,
  divider: false,
  hasSubmenu: true,
  submenu: PRINTING_SUBMENU,
}

export const USEFUL_GUIDE = {
  label: "Useful Guide",
  value: USEFUL_URL,
  divider: false,
  hasSubmenu: true,
  submenu: USEFUL_SUBMENU,
}

export const NAVIGATION_MENU = [
  PRODUCTS_MENU, 
  SERVICES, 
  SUPPORT_MENU,  
];

export const FOOTER_MENU = [
  PRODUCTS_MENU, 
  ABOUT_US, 
  SUPPORT_MENU  
];

export const MOBILE_MENU = [
  PRODUCTS_MENU, 
  { 
    ...SERVICES,
    hasSubmenu: false,
  },
  { 
    ...SUPPORT_MENU,
    hasSubmenu: false,
  }
];


export const LEGAL_MENU = [
  { label: "Privacy Policy", value: "/privacy-policy", divider: false },
  { label: "Terms of Service", value: "/terms-of-service", divider: false }
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
