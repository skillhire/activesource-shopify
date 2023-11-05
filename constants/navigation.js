export const SUPPORT_URL = "/support"
export const SHOP_ALL_URL = "/collections/home"
export const ENTERPRISE_SOLUTIONS_URL = "/enterprise-solutions"

export const PRODUCTS_MENU = [
  { label: "Men", value: "/collections/men", divider: false },
  { label: "Women", value: "/collections/women", divider: false },
  { label: "Accesories", value: "/collections/accesories", divider: false },
]

export const SUPPORT_MENU = [
  { label: "Help Center", value: "/help-center", divider: false },
  { label: "Contact Us", value: "/contact-us", divider: false },
]

export const LEGAL_MENU = [
  { label: "Privacy Policy", value: "/privacy-policy", divider: false },
  { label: "Terms of use", value: "/terms-of-use", divider: false },
]

export const SHOP_ALL_MENU = [
  { label: "All products", value: SHOP_ALL_URL, divider: false, hasSubmenu: true, submenu: PRODUCTS_MENU },
]

export const ENTERPRISE_SOLUTIONS_MENU = [
  { label: "Enterprise Solutions", value: ENTERPRISE_SOLUTIONS_URL, divider: false },
]

export const NEED_HELP_MENU = [
  { label: "Need Help?", value: SUPPORT_URL, divider: false, hasSubmenu: true, submenu: SUPPORT_MENU },
]

export const NAVIGATION_MENU = [
  ...SHOP_ALL_MENU,
  ...ENTERPRISE_SOLUTIONS_MENU,
  ...NEED_HELP_MENU,
];

export const SERVICES_MENU = [
  ...ENTERPRISE_SOLUTIONS_MENU,
  { label: "Hire an expert", value: "/hire-an-expert", divider: false },
  { label: "About us", value: "/about-us", divider: false },
]

export const UNLOGGED_MENU = [
  { label: "Login", value: "/login", divider: false },
];

export const LOGGED_MENU = [
  {
    label: "Account", value: "/account", divider: false, hasSubmenu: true,
    submenu: [
      { label: "My Account", value: "/account/me", divider: false },
      { label: "Order History", value: "/account/orders", divider: false },
    ]
  }
];

export const FOOTER_MENU = {
  products: [
    ...SHOP_ALL_MENU,
    ...PRODUCTS_MENU
  ],
  support: SUPPORT_MENU,
  legal: LEGAL_MENU,
  services: SERVICES_MENU,
};
