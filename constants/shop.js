import { User, ShoppingCart, Send, MapPin } from "lucide-react";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
export const BITLY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_BITLY_ACCESS_TOKEN;
export const SHOP_NAME = process.env.NEXT_PUBLIC_SHOP_NAME || "Active Source";
export const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
export const SHOPIFY_STOREFRONT_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
export const PRODUCT_IMAGE_RESIZE = 800;

export const MAX_FILE_SIZE = 5000000; // 5MB
export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
export const CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
export const SENDGRID_API_KEY = process.env.NEXT_PUBLIC_SENDGRID_API_KEY;
export const SENDGRID_FROM_EMAIL =
  process.env.NEXT_PUBLIC_SENDGRID_FROM_EMAIL ||
  "info@em9212.activesourcelab.com";
export const SENDGRID_TO_EMAIL =
  process.env.NEXT_PUBLIC_SENDGRID_TO_EMAIL || "test_test@activesource.com";

// Search defaults
export const PER_PAGE = 50;
export const PRICE_RANGE_MIN = 0;
export const PRICE_RANGE_MAX = 250;

export const KAVIYO_LIST_ID = process.env.NEXT_PUBLIC_KAVIYO_LIST_ID;
export const KLAVIYO_API_KEY = process.env.NEXT_PUBLIC_KLAVIYO_API_KEY;
export const SEGMENT_WRITE_KEY = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY;

export const IMAGE_WIDTH = 1600;
export const IMAGE_HEIGHT = 1600;

export const PIXELS_PER_INCH = 300;

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export const LOGO = "assets/logo.svg";

export const ACCOUNT_ITEMS = [
  {
    path: "account/edit",
    title: "Account Details",
    subtitle: "Edit personal details",
    icon: <User />,
  },
  {
    path: "account/orders",
    title: "Order History",
    subtitle: "View order history",
    icon: <ShoppingCart />,
  },
  {
    path: "account/addresses",
    title: "Shipping Addresses",
    subtitle: "View and manage addresses",
    icon: <MapPin />,
  },
  {
    path: "contact-us",
    title: "Contact Us",
    subtitle: "Send us a message",
    icon: <Send />,
  },
];

export const CAROUSEL_RESPONSIVE = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 4,
    partialVisibilityGutter: 0,
  },
  desktop: {
    breakpoint: { max: 1440, min: 960 },
    items: 4,
    partialVisibilityGutter: 0,
  },
  tablet: {
    breakpoint: { max: 960, min: 600 },
    items: 3,
    partialVisibilityGutter: 0,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    partialVisibilityGutter: 120,
  },
};

export const IMAGE_CAROUSEL_RESPONSIVE = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 2,
    partialVisibilityGutter: 50,
  },
  desktop: {
    breakpoint: { max: 1280, min: 960 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 960, min: 600 },
    items: 1,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    partialVisibilityGutter: 20,
  },
};

export const INSTA_CAROUSEL_RESPONSIVE = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 4,
    partialVisibilityGutter: 50,
  },
  desktop: {
    breakpoint: { max: 1280, min: 960 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 960, min: 600 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    partialVisibilityGutter: 20,
  },
};

// See all sort keys:
// https://shopify.dev/docs/api/storefront/2023-04/enums/ProductSortKeys
export const PRODUCT_SORT_OPTIONS = [
  { label: "Title A-Z", value: "TITLE", reverse: false },
  { label: "Title Z-A", value: "TITLE", reverse: true },
  { label: "Recommended", value: "RELEVANCE", reverse: false },
  { label: "Price - High to Low", value: "PRICE", reverse: true },
  { label: "Price - Low to High", value: "PRICE", reverse: false },
  { label: "Popular", value: "BEST_SELLING", reverse: false },
];

export const COLLECTION_SORT_OPTIONS = [
  { label: "Collection", value: "COLLECTION_DEFAULT", reverse: false },
  { label: "Recommended", value: "RELEVANCE", reverse: false },
  { label: "Price - High to Low", value: "PRICE", reverse: true },
  { label: "Price - Low to High", value: "PRICE", reverse: false },
];

export const PRICE_FILTER_MIN = 500;
export const PRICE_FILTER_MAX = 1500;
