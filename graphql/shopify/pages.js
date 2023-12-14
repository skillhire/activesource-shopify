import { gql } from "@apollo/client";

const PageFragment = gql`
  fragment PageFragment on Page {
    id
    handle
    title
    body
    bodySummary
    createdAt
    updatedAt
    metafields(identifiers: [{ namespace: "custom", key: "image" }]) {
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
            src
            url
          }
        }
      }
    }
  }
`;

export const QUERY_PAGE_BY_HANDLE = gql`
  query Page($handle: String!) {
    pageByHandle(handle: $handle) {
      ...PageFragment
    }
  }
  ${PageFragment}
`;

export const QUERY_PAGES = gql`
  query Pages($first: Int!, $query: String) {
    pages(first: $first, query: $query) {
      edges {
        node {
          ...PageFragment
        }
      }
    }
  }
  ${PageFragment}
`;
