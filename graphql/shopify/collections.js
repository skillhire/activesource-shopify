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
    images(first: 50) {
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
        { namespace: "custom", key: "recommended_products" }
        { namespace: "custom", key: "product_type" }
        { namespace: "custom", key: "warehouse" }
        { namespace: "custom", key: "is_enterprise" }
        { namespace: "custom", key: "enterprise_product_description" }
        { namespace: "custom", key: "disable_placement" }
        { namespace: "custom", key: "disable_logo" }
        { namespace: "custom", key: "disable_bulk_order" }
        { namespace: "custom", key: "disable_support" }
        { namespace: "custom", key: "enable_notes" }
        { namespace: "custom", key: "notes_description" }
        { namespace: "custom", key: "min_quantity" }
        { namespace: "custom", key: "brand" }
        { namespace: "custom", key: "style" }
        { namespace: "custom", key: "note" }
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
      references(first: 100) {
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
                  { namespace: "custom", key: "front_placement" }
                  { namespace: "custom", key: "back_placement" }
                  { namespace: "custom", key: "recommended_products" }
                  { namespace: "custom", key: "is_enterprise" }
                  { namespace: "custom", key: "enterprise_product_description" }
                  { namespace: "custom", key: "disable_placements" }
                  { namespace: "custom", key: "disable_logo" }
                  { namespace: "custom", key: "disable_bulk_order" }
                  { namespace: "custom", key: "disable_support" }
                  { namespace: "custom", key: "enable_notes" }
                  { namespace: "custom", key: "notes_description" }
                  { namespace: "custom", key: "min_quantity" }
                  { namespace: "custom", key: "brand" }
                  { namespace: "custom", key: "style" }
                  { namespace: "custom", key: "note" }
                ]
              ) {
                id
                key
                value
                namespace
                description
                references(first: 100) {
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


export const CollectionFragment = gql`
  fragment CollectionFragment on Collection {
    id
    handle
    title
    description
    descriptionHtml
    image {
      id
      url
    }
    updatedAt
    metafields(identifiers: [
      { namespace: "custom", key: "category" }
     ]) {
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
      }
    }
  }
`;

export const QUERY_COLLECTION = gql`
  query Collection(
    $handle: String!
    $first: Int!
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $after: String
  ) {
    collectionByHandle(handle: $handle) {
      ...CollectionFragment
      products(
        first: $first
        filters: $filters
        sortKey: $sortKey
        reverse: $reverse
        after: $after
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
  }
  ${CollectionFragment}
  ${ProductFragment}
`;

export const QUERY_COLLECTIONS = gql`
  query Collections($first: Int!, $query: String) {
    collections(first: $first, query: $query) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ...CollectionFragment
        }
      }
    }
  }
  ${CollectionFragment}
`;
