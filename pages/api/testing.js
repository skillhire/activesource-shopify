import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';

import { SHOPIFY_DOMAIN, SHOPIFY_STOREFRONT_TOKEN } from 'constants/shop.js';

const resolvers = {
  Query: {
    productsAndCollections: async (_, { firstProducts, queryProducts, firstCollections, queryCollections }) => {
      const shopifyQuery = `
        query ProductsAndCollections($firstProducts: Int!, $queryProducts: String, $firstCollections: Int!, $queryCollections: String) {
          products(first: $firstProducts, query: $queryProducts) {
            edges {
              node {
                id
                title
                handle
                description
                descriptionHtml
                availableForSale
                createdAt
                updatedAt
                onlineStoreUrl
                productType
                publishedAt
                tags
                vendor
                priceRange {
                  minVariantPrice { amount currencyCode }
                  maxVariantPrice { amount currencyCode }
                }
                images(first: 50) {
                  edges {
                    node {
                      id
                      url
                      altText
                    }
                  }
                }
                options {
                  id
                  name
                  values
                }
                variants(first: 250) {
                  edges {
                    node {
                      id
                      title
                      sku
                      availableForSale
                      requiresShipping
                      weight
                      weightUnit
                      selectedOptions {
                        name
                        value
                      }
                      price { amount currencyCode }
                      compareAtPrice { amount currencyCode }
                      image {
                        id
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
            pageInfo { hasNextPage }
          }
          collections(first: $firstCollections, query: $queryCollections) {
            edges {
              node {
                id
                title
                handle
                description
                descriptionHtml
                updatedAt
                image {
                  id
                  url
                  altText
                }
              }
            }
            pageInfo { hasNextPage }
          }
        }
      `;

      const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-04/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
        },
        body: JSON.stringify({
          query: shopifyQuery,
          variables: { firstProducts, queryProducts, firstCollections, queryCollections }
        })
      });

      const { data, errors } = await response.json();

      if (errors) {
        console.error(errors);
        throw new Error('Failed to fetch products and collections');
      }

      return {
        products: data.products,
        collections: data.collections
      };
    }
  }
};

// Define the schema with the custom JSON scalar
const typeDefs = gql`
  scalar JSON

# ----------------- Base types -----------------

type Query {
  productsAndCollections(
    firstProducts: Int!
    queryProducts: String
    firstCollections: Int!
    queryCollections: String
  ): ProductsAndCollectionsResponse
}

type ProductsAndCollectionsResponse {
  products: ProductConnection
  collections: CollectionConnection
}

type ProductConnection {
  edges: [ProductEdge!]!
  pageInfo: PageInfo!
}

type CollectionConnection {
  edges: [CollectionEdge!]!
  pageInfo: PageInfo!
}

type ProductEdge {
  node: Product!
}

type CollectionEdge {
  node: Collection!
}

type PageInfo {
  hasNextPage: Boolean!
}

# ----------------- Product types -----------------

type Product {
  id: ID!
  title: String!
  handle: String!
  description: String
  descriptionHtml: String
  availableForSale: Boolean
  createdAt: String
  updatedAt: String
  onlineStoreUrl: String
  productType: String
  publishedAt: String
  tags: [String!]!
  vendor: String
  priceRange: PriceRange
  images(first: Int): ImageConnection
  options: [ProductOption!]!
  variants(first: Int): ProductVariantConnection
  sellingPlanGroups(first: Int): SellingPlanGroupConnection
  metafields(identifiers: [MetafieldIdentifierInput!]!): [Metafield!]!
}

type ProductOption {
  id: ID!
  name: String!
  values: [String!]!
}

type ProductVariantConnection {
  edges: [ProductVariantEdge!]!
}

type ProductVariantEdge {
  node: ProductVariant!
}

type ProductVariant {
  id: ID!
  title: String!
  sku: String
  availableForSale: Boolean
  requiresShipping: Boolean
  weight: Float
  weightUnit: String
  selectedOptions: [SelectedOption!]!
  price: Money!
  compareAtPrice: Money
  image: Image
}

type SelectedOption {
  name: String!
  value: String!
}

type PriceRange {
  minVariantPrice: Money!
  maxVariantPrice: Money!
}

type Money {
  amount: String!
  currencyCode: String!
}

type SellingPlanGroupConnection {
  edges: [SellingPlanGroupEdge!]!
}

type SellingPlanGroupEdge {
  node: SellingPlanGroup!
}

type SellingPlanGroup {
  name: String!
  sellingPlans(first: Int): SellingPlanConnection!
}

type SellingPlanConnection {
  edges: [SellingPlanEdge!]!
}

type SellingPlanEdge {
  node: SellingPlan!
}

type SellingPlan {
  id: ID!
  name: String!
  description: String
  priceAdjustments: [SellingPlanPriceAdjustment!]!
}

type SellingPlanPriceAdjustment {
  adjustmentValue: SellingPlanAdjustmentValue!
}

union SellingPlanAdjustmentValue =
    SellingPlanFixedAmountPriceAdjustment
  | SellingPlanFixedPriceAdjustment
  | SellingPlanPercentagePriceAdjustment

type SellingPlanFixedAmountPriceAdjustment {
  adjustmentAmount: Money!
}

type SellingPlanFixedPriceAdjustment {
  price: Money!
}

type SellingPlanPercentagePriceAdjustment {
  adjustmentPercentage: Float!
}

# ----------------- Collection types -----------------

type Collection {
  id: ID!
  title: String!
  handle: String!
  description: String
  descriptionHtml: String
  updatedAt: String
  image: Image
  metafields(identifiers: [MetafieldIdentifierInput!]!): [Metafield!]!
}

# ----------------- Metafield types -----------------

type Metafield {
  id: ID!
  key: String!
  value: String
  namespace: String!
  description: String
  reference: MetafieldReference
}

union MetafieldReference = MediaImage | Product | Metaobject

input MetafieldIdentifierInput {
  namespace: String!
  key: String!
}

type Metaobject {
  id: ID!
  handle: String
  type: String
  updatedAt: String
  fields: [MetaobjectField!]!
}

type MetaobjectField {
  key: String!
  type: String!
  value: String
  reference: MediaImage
}

# ----------------- Image types -----------------

type ImageConnection {
  edges: [ImageEdge!]!
}

type ImageEdge {
  node: Image!
}

type Image {
  id: ID!
  url: String!
  altText: String
}

type MediaImage {
  image: Image!
}
`;

// Set up the ApolloServer
const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true, // Enable introspection for playground
});

export default startServerAndCreateNextHandler(server);