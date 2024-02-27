import { gql } from "@apollo/client";
import { CheckoutFragment } from "graphql/shopify/checkout";
import { CartFragment } from "graphql/shopify/cart";

export const CHECKOUT_DISCOUNT_CODE_APPLY = gql`
  mutation checkoutDiscountCodeApply($checkoutId: ID!, $discountCode: String!) {
    checkoutDiscountCodeApplyV2(
      discountCode: $discountCode
      checkoutId: $checkoutId
    ) {
      checkout {
        ...CheckoutFragment
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
  ${CheckoutFragment}
`;

export const CHECKOUT_DISCOUNT_CODE_REMOVE = gql`
  mutation checkoutDiscountCodeRemove($checkoutId: ID!) {
    checkoutDiscountCodeRemove(checkoutId: $checkoutId) {
      checkout {
        ...CheckoutFragment
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
  ${CheckoutFragment}
`;

export const CART_DISCOUNT_CODE_UPDATE = gql`
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      userErrors {
        code
        field
        message
      }
      cart {
        ...CartFragment
      }
    }
  }
  ${CartFragment}
`;
