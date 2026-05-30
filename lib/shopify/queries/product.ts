import productFragment from "../fragments/product";

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
      metafields(
        identifiers: [
          { namespace: "custom", key: "custom_material" }
          { namespace: "custom", key: "custom_size" }
          { namespace: "custom", key: "custom_dimensions" }
          { namespace: "custom", key: "custom_made_in" }
          { namespace: "custom", key: "custom_care_instructions" }
          { namespace: "custom", key: "for_occasion" }
          { namespace: "custom", key: "custom_fold_styles" }
          { namespace: "custom", key: "custom_pair_with" }
          { namespace: "custom", key: "faq" }
        ]
      ) {
        key
        namespace
        value
        type
      }
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts(
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
  ) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;
