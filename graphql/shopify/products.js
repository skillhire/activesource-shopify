import { gql } from "@apollo/client";
import { ImageFragment } from "./media";

export const ProductFragment = gql`
  fragment ProductFragment on Product {
    availableForSale
    createdAt
    updatedAt
    description
    descriptionHtml
    handle
    id
    images(first: 250) {
      edges {
        node {
          id
          altText
          url
        }
      }
    }
    metafields(
      identifiers: [
        { namespace: "custom", key: "colors" }
        { namespace: "custom", key: "front_placement" }
        { namespace: "custom", key: "back_placement" }
        { namespace: "custom", key: "recommended_products" }
        { namespace: "custom", key: "not_for_sale" }
        { namespace: "custom", key: "product_type" }
        { namespace: "custom", key: "warehouse" }
        { namespace: "custom", key: "is_enterprise" }
        { namespace: "custom", key: "disable_placement" }
        { namespace: "custom", key: "disable_logo" }
      ]
    ) {
      id
      key
      value
      namespace
      description
      reference {
        ... on MediaImage {
          image {
            id
            altText
            url
          }
        }
        ... on ProductVariant {
          id
          title
          sku
          availableForSale
        }
      }
      references(first: 250) {
        edges {
          node {
            ... on Product {
              id
              handle
              title
              images(first: 10) {
                edges {
                  node {
                    id
                    altText
                    url
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              metafields(
                identifiers: [
                  { namespace: "custom", key: "colors" }
                  { namespace: "custom", key: "front_placement" }
                  { namespace: "custom", key: "back_placement" }
                  { namespace: "custom", key: "recommended_products" }
                  { namespace: "custom", key: "not_for_sale" }
                  { namespace: "custom", key: "is_enterprise" }
                  { namespace: "custom", key: "disable_placements" }
                  { namespace: "custom", key: "disable_logo" }
                ]
              ) {
                id
                key
                value
                namespace
                description
                references(first: 250) {
                  edges {
                    node {
                      ... on Metaobject {
                        id
                        handle
                        type
                        updatedAt
                        fields {
                          key
                          type
                          value
                          reference {
                            ... on MediaImage {
                              image {
                                ...ImageFragment
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              variants(first: 20) {
                edges {
                  node {
                    id
                    sku
                    title
                    image {
                      id
                      url
                      altText
                    }
                    availableForSale
                  }
                }
              }
            }
            ... on Metaobject {
              id
              handle
              type
              updatedAt
              fields {
                key
                type
                value
                reference {
                  ... on MediaImage {
                    image {
                      id
                      altText
                      url
                    }
                  }
                  ... on Product {
                    id
                    handle
                    title
                    images(first: 10) {
                      edges {
                        node {
                          id
                          altText
                          url
                        }
                      }
                    }
                    variants(first: 20) {
                      edges {
                        node {
                          id
                          sku
                          title
                          image {
                            url
                          }
                          availableForSale
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    onlineStoreUrl
    options {
      id
      name
      values
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    sellingPlanGroups(first: 10) {
      edges {
        node {
          name
          sellingPlans(first: 10) {
            edges {
              node {
                id
                name
                description
                priceAdjustments {
                  adjustmentValue {
                    ... on SellingPlanFixedAmountPriceAdjustment {
                      adjustmentAmount {
                        amount
                        currencyCode
                      }
                    }
                    ... on SellingPlanFixedPriceAdjustment {
                      price {
                        amount
                        currencyCode
                      }
                    }
                    ... on SellingPlanPercentagePriceAdjustment {
                      adjustmentPercentage
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    productType
    publishedAt
    tags
    title
    updatedAt
    variants(first: 250) {
      edges {
        node {
          availableForSale
          compareAtPrice {
            amount
            currencyCode
          }
          id
          image {
            id
            altText
            url
          }
          price {
            amount
            currencyCode
          }
          requiresShipping
          selectedOptions {
            name
            value
          }
          sku
          title
          weight
          weightUnit
        }
      }
    }
    vendor
  }
  ${ImageFragment}
`;

export const QUERY_PRODUCT = gql`
  query Product($handle: String!) {
    productByHandle(handle: $handle) {
      ...ProductFragment
    }
  }
  ${ProductFragment}
`;

export const QUERY_PRODUCT_BY_ID = gql`
  query Product($id: ID!) {
    product(id: $id) {
      ...ProductFragment
    }
  }
  ${ProductFragment}
`;

export const QUERY_PRODUCTS = gql`
  query Products(
    $first: Int!
    $query: String
    $reverse: Boolean
    $sortKey: ProductSortKeys
    $after: String
  ) {
    products(
      first: $first
      after: $after
      query: $query
      reverse: $reverse
      sortKey: $sortKey
    ) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${ProductFragment}
`;

export const QUERY_PRODUCT_RECOMMENDATIONS = gql`
  query ProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...ProductFragment
    }
  }
  ${ProductFragment}
`;
