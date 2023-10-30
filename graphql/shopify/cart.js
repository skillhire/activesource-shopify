import { gql } from "@apollo/client";

export const CartFragment = gql`
  fragment CartFragment on Cart {
    id
    createdAt
    updatedAt
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          customAttributes {
            key
            value
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              sku
              price {
                amount
                currencyCode
              }
              image {
                src
                altText
                width
                height
              }
              product {
                id
                title
                handle
                productType
                vendor
              }
            }
          }
          sellingPlanAllocation {
            priceAdjustments {
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              unitPrice {
                amount
                currencyCode
              }
              perDeliveryPrice {
                amount
                currencyCode
              }
            }
            sellingPlan {
              id
            }
          }
        }
      }
    }
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
    discountCodes {
      applicable
      code
    }
    checkoutUrl
  }
`;

export const CART_FETCH = gql`
  query cart($id: ID!) {
    cart(id: $id) {
      ...CartFragment
    }
  }
  ${CartFragment}
`;

export const CART_CREATE = gql`
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      userErrors {
        message
        field
      }
      cart {
        ...CartFragment
      }
    }
  }
  ${CartFragment}
`;

export const CART_LINES_ADD = gql`
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      userErrors {
        message
        field
      }
      cart {
        ...CartFragment
      }
    }
  }
  ${CartFragment}
`;

export const CART_LINES_UPDATE = gql`
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      userErrors {
        message
        field
      }
      cart {
        ...CartFragment
      }
    }
  }
  ${CartFragment}
`;

export const CART_LINES_REMOVE = gql`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      userErrors {
        message
        field
      }
      cart {
        ...CartFragment
      }
    }
  }
  ${CartFragment}
`;

export const CART_BUYER_IDENTITY_UPDATE = gql`
  query cartBuyerIdentityUpdate(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
  ) {
    cartBuyerIdentityUpdate(
      cartId: $cartId
      buyerIdentity: $buyerIdentity
      countryCode: "US"
    ) {
      userErrors {
        message
        field
      }
      cart {
        ...CartFragment
      }
    }
  }
  ${CartFragment}
`;
