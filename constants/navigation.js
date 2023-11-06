export const SUPPORT_URL = "/support"
export const SHOP_ALL_URL = "/collections/home"
export const ENTERPRISE_SOLUTIONS_URL = "/enterprise-solutions"

export const MOBILE_MENU = [
  {
    label: "Shop all", value: SHOP_ALL_URL, divider: false, hasSubmenu: true,
    submenu: [
      { label: "Men", value: "/collections/men", divider: false },
      { label: "Women", value: "/collections/women", divider: false },
      { label: "Accesories", value: "/collections/accesories", divider: false },
    ]
  },
  { label: "Enterprise Solutions", value: ENTERPRISE_SOLUTIONS_URL, divider: false },
  { label: "Need Help?", value: SUPPORT_URL, divider: false },
];

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

export const DESKTOP_MENU = [
  { label: "Shop all", value: SHOP_ALL_URL },
  { label: "Enterprise Solutions", value: ENTERPRISE_SOLUTIONS_URL },
  { label: "Need help?", value: SUPPORT_URL },
];

export const FOOTER_MENU = {
  products: [
    { label: "Link 1", value: "/" },
    { label: "Link 2", value: "/" },
    { label: "Link 3", value: "/" },
  ],
  support: [
    { label: "Link 1", value: "/" },
    { label: "Link 2", value: "/" },
    { label: "Link 3", value: "/" },
  ],
  legal: [
    { label: "Link 1", value: "/" },
    { label: "Link 2", value: "/" },
    { label: "Link 3", value: "/" },
  ],
  "use-cases": [
    { label: "Link 1", value: "/" },
    { label: "Link 2", value: "/" },
    { label: "Link 3", value: "/" },
  ],
};
