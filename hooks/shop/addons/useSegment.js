import React, { useContext } from "react";
import { useCart } from "hooks";
import { SegmentContext } from "context";

// Implementation of the Segment v2 eCommerce analytics events
// https://segment.com/docs/connections/spec/ecommerce/v2/
const useSegment = () => {
  const { segment } = useContext(SegmentContext);
  const { cart } = useCart();

  const trackAddToCart = ({ variant, quantity, product }) => {
    segment?.track("Product Added", {
      cart_id: cart?.id,
      product_id: product?.id,
      sku: variant?.sku,
      category: product?.productType,
      name: variant?.title || product?.title,
      brand: product?.vendor,
      variant: variant?.id,
      price: variant?.price?.amount,
      quantity: quantity,
      url: window.location.href,
      image_url: variant?.image?.url,
    });
  };

  const trackRemoveFromCart = ({ variant, quantity, product }) => {
    segment?.track("Product Removed", {
      cart_id: cart?.id,
      product_id: product?.id,
      sku: variant?.sku,
      category: product?.productType,
      name: product?.title,
      brand: product?.vendor,
      variant: variant?.id,
      price: variant?.price?.amount,
      quantity: quantity,
      url: window.location.href,
      image_url: variant?.image?.url,
    });
  };

  const trackCartViewed = (cart) => {
    const products = cart.lines.edges.map((line) => {
      const variant = line?.node?.merchandise;
      const product = variant?.product;

      return {
        product_id: product?.id,
        sku: variant?.sku,
        name: product?.title,
        price: variant?.price?.amount,
        quantity: line?.node.quantity,
        brand: product?.vendor,
        variant: variant?.id,
        category: product?.productType,
        url: window.location.href,
        image_url: variant?.image?.url,
      };
    });

    const total = Number(cart?.totalAmount?.amount) || 0
  
    segment?.track("Cart Viewed", {
      order_id: cart.id,
      affiliation: "active-source-lab",
      value: total,
      revenue: total,
      coupon: cart.discountApplications.edges
        ?.map((e) => e?.node)
        .map((node) => node?.code)
        .join(", "),
      currency: 'USD',
      products: products,
    });
  };

  const trackCheckoutStarted = (cart) => {
    const products = cart.lines.edges.map((line) => {
      const variant = line?.node?.variant;
      const product = variant?.product;

      return {
        product_id: product?.id,
        sku: variant?.sku,
        name: product?.title,
        price: variant?.price?.amount,
        quantity: line?.node.quantity,
        brand: product?.vendor,
        variant: variant?.id,
        category: product?.productType,
        url: window.location.href,
        image_url: variant?.image?.url,
      };
    });

    segment?.track("Checkout Started", {
      order_id: cart.id,
      affiliation: "active-source-lab",
      value: cart?.totalPrice?.amount,
      revenue: cart?.totalPrice?.amount,
      coupon: [],
      currency: cart?.cost?.totalAmount?.currencyCode,
      products: products,
    });
  };

  const trackProductsSearched = (query) => {
    segment?.track("Products Searched", {
      query: query,
    });
  };

  const trackProductViewed = (product) => {
    const variant = product.variants.edges[0].node;

    segment?.track("Product Viewed", {
      product_id: product?.id,
      sku: variant?.sku,
      category: product?.productType,
      name: product?.title,
      brand: product?.vendor,
      price: variant?.price?.amount,
      variant: variant?.id,
      currency: variant?.price?.currencyCode,
      url: window.location.href,
      image_url: variant?.image?.url,
    });
  };

  const trackProductClicked = (product) => {
    const variant = product.variants.edges[0].node;
    segment?.track("Product Clicked", {
      product_id: product?.id,
      sku: product?.variants?.edges[0]?.node?.sku,
      category: product?.productType,
      name: product?.title,
      brand: product?.vendor,
      price: variant?.price?.amount,
      variant: variant?.id,
      quantity: 1,
      url: `/products/${product?.handle}`,
      image_url: variant?.image?.url,
    });
  };

  const trackProductList = (collection) => {
    const products = collection.products.edges.map((line) => {
      const product = line?.node;
      const variant = product?.variants?.edges[0].node;

      return {
        product_id: product?.id,
        sku: variant?.sku,
        name: product?.title,
        price: variant?.price?.amount,
        category: product?.productType,
        url: window.location.href,
        image_url: variant?.image?.url,
      };
    });
    segment?.track("Product List Viewed", {
      list_id: collection?.id,
      products,
    });
  };

  return {
    segment,
    trackCartViewed,
    trackCheckoutStarted,
    trackAddToCart,
    trackRemoveFromCart,
    trackProductClicked,
    trackProductViewed,
    trackProductsSearched,
    trackProductList,
  };
};

export default useSegment;
