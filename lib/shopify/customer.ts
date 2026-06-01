// Storefront-API customer accounts (classic). Handles registration, login
// (access-token issue/revoke), the account query (profile + order history) and
// associating the active cart with the signed-in customer so checkout — and
// every repeat purchase — is tied to their account.
import { shopifyFetch } from "./index";

export type CustomerUserError = { code?: string; field?: string[]; message: string };

export type CustomerAccessToken = {
  accessToken: string;
  expiresAt: string;
};

export type CustomerOrder = {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string | null;
  fulfillmentStatus: string | null;
  statusUrl: string;
  currentTotalPrice: { amount: string; currencyCode: string };
  lineItems: { title: string; quantity: number }[];
};

export type Customer = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string;
  email: string | null;
  phone: string | null;
  defaultAddress: { formatted: string[] } | null;
  orders: CustomerOrder[];
};

type Result<T> = { data: T; errors: CustomerUserError[] };

const CUSTOMER_CREATE = /* GraphQL */ `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email }
      customerUserErrors { code field message }
    }
  }
`;

const ACCESS_TOKEN_CREATE = /* GraphQL */ `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code field message }
    }
  }
`;

const ACCESS_TOKEN_DELETE = /* GraphQL */ `
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      userErrors { field message }
    }
  }
`;

const CUSTOMER_RECOVER = /* GraphQL */ `
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors { code field message }
    }
  }
`;

const CUSTOMER_QUERY = /* GraphQL */ `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      displayName
      email
      phone
      defaultAddress { formatted }
      orders(first: 25, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            statusUrl
            currentTotalPrice { amount currencyCode }
            lineItems(first: 50) {
              edges { node { title quantity } }
            }
          }
        }
      }
    }
  }
`;

const CART_BUYER_IDENTITY_UPDATE = /* GraphQL */ `
  mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export async function createCustomer(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<Result<{ id: string } | null>> {
  const res = await shopifyFetch<{
    data: {
      customerCreate: {
        customer: { id: string; email: string } | null;
        customerUserErrors: CustomerUserError[];
      };
    };
    variables: { input: typeof input };
  }>({ query: CUSTOMER_CREATE, variables: { input } });
  const payload = res.body.data.customerCreate;
  return { data: payload.customer, errors: payload.customerUserErrors };
}

export async function createCustomerAccessToken(input: {
  email: string;
  password: string;
}): Promise<Result<CustomerAccessToken | null>> {
  const res = await shopifyFetch<{
    data: {
      customerAccessTokenCreate: {
        customerAccessToken: CustomerAccessToken | null;
        customerUserErrors: CustomerUserError[];
      };
    };
    variables: { input: typeof input };
  }>({ query: ACCESS_TOKEN_CREATE, variables: { input } });
  const payload = res.body.data.customerAccessTokenCreate;
  return { data: payload.customerAccessToken, errors: payload.customerUserErrors };
}

export async function deleteCustomerAccessToken(token: string): Promise<void> {
  try {
    await shopifyFetch<{ data: unknown; variables: { customerAccessToken: string } }>({
      query: ACCESS_TOKEN_DELETE,
      variables: { customerAccessToken: token },
    });
  } catch {
    // best-effort; the cookie is cleared regardless
  }
}

export async function recoverCustomer(
  email: string,
): Promise<{ errors: CustomerUserError[] }> {
  const res = await shopifyFetch<{
    data: { customerRecover: { customerUserErrors: CustomerUserError[] } };
    variables: { email: string };
  }>({ query: CUSTOMER_RECOVER, variables: { email } });
  return { errors: res.body.data.customerRecover.customerUserErrors };
}

export async function getCustomerByToken(
  token: string,
): Promise<Customer | null> {
  try {
    const res = await shopifyFetch<{
      data: {
        customer:
          | (Omit<Customer, "orders"> & {
              orders: {
                edges: {
                  node: Omit<CustomerOrder, "lineItems"> & {
                    lineItems: { edges: { node: { title: string; quantity: number } }[] };
                  };
                }[];
              };
            })
          | null;
      };
      variables: { customerAccessToken: string };
    }>({ query: CUSTOMER_QUERY, variables: { customerAccessToken: token } });

    const c = res.body.data.customer;
    if (!c) return null;
    return {
      ...c,
      orders: c.orders.edges.map((e) => ({
        ...e.node,
        lineItems: e.node.lineItems.edges.map((l) => l.node),
      })),
    };
  } catch {
    return null;
  }
}

// Tie the active cart to the signed-in customer so checkout is pre-filled and
// the resulting order is recorded against their account.
export async function associateCartWithCustomer(
  cartId: string,
  customerAccessToken: string,
): Promise<void> {
  try {
    await shopifyFetch<{
      data: unknown;
      variables: { cartId: string; buyerIdentity: { customerAccessToken: string } };
    }>({
      query: CART_BUYER_IDENTITY_UPDATE,
      variables: { cartId, buyerIdentity: { customerAccessToken } },
    });
  } catch {
    // non-fatal — the customer can still complete checkout
  }
}
