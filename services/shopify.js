"use strict";

const axios = require("axios");
const auth = require("jsonwebtoken");
const get = require("lodash/get");

const SERVICE_NAME = "magicsoaps";
const { GraphQLClient, gql } = require("graphql-request");

function createShopifyInstance(username, shopifyAccessToken) {
  const domain = username && username.replace(".myshopify.com", "");

  const shopifyInstance = axios.create({
    baseURL:
      "https://" +
      domain +
      ".myshopify.com/admin/api/" +
      process.env.SHOPIFY_API_VERSION +
      "/",
    headers: {
      "X-Shopify-Access-Token": shopifyAccessToken,
      "Content-Type": "application/json",
    },
  });

  return shopifyInstance;
}

class Shopify {
  constructor(username = false, token = "false") {
    this.username = username;
    this.shopifyAccessToken = token;
    this.shopifyInstance = createShopifyInstance(username, token);
    this.livemode = process.env.LIVEMODE === "TRUE" ? true : false;

    const endpoint = `https://${username}.myshopify.com/admin/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`;
    this.graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        "X-Shopify-Access-Token": token,
        "X-Shopify-Shop-Domain": username + `.myshopify.com`,
      },
    });
  }

  SetCredentials(username = false, token = "false") {
    this.username = username;
    this.shopifyAccessToken = token;
    this.shopifyInstance = createShopifyInstance(username, token);
    this.livemode = process.env.LIVEMODE === "TRUE" ? true : false;

    const endpoint = `https://${username}.myshopify.com/admin/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`;
    this.graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        "X-Shopify-Access-Token": token.trim(),
        "X-Shopify-Shop-Domain": username + `.myshopify.com`,
      },
    });
  }

  CreateInstance() {
    return this.shopifyInstance;
  }

  async GetShopDetails() {
    const shop = await this.shopifyInstance
      .get(`/shop.json`)
      .then((res) => res.data.shop)
      .catch((err) => console.error("shop err", err.message));

    return shop;
  }

  async GetThemes() {
    const themes = await this.shopifyInstance
      .get(`/themes.json`)
      .then((res) => res.data.themes)
      .catch((err) => console.error("theme err", err));

    return themes;
  }

  async GetAssets(theme) {
    const themes = await this.shopifyInstance
      .get(`/themes/${theme.id}/assets.json`)
      .then((res) => res.data.assets)
      .catch((err) => console.error("theme err", err));

    return themes;
  }

  async GetShopPolicies() {
    const policies = await this.shopifyInstance
      .get(`/policies.json`)
      .then((res) => res.data.policies)
      .catch((err) => {
        console.error("shop err", err.message);
        return [];
      });

    return policies;
  }

  async GetDispute(id) {
    const dispute = await this.shopifyInstance
      .get(`/shopify_payments/disputes/${id}.json`)
      .then((res) => res.data.dispute)
      .catch((err) => console.error("shop err", err.message));

    return dispute;
  }

  async GetWebhooks() {
    const webhooks = await this.shopifyInstance
      .get(`/webhooks.json`)
      .then((res) => res.data.webhooks)
      .catch((err) => console.error("shop err", err.message));

    return webhooks;
  }

  async CreateProduct(product) {
    const response = await this.shopifyInstance
      .post(`products.json`, { product })
      .then((res) => res.data.product)
      .catch((err) => console.error("product err", err));

    // Set tax ids & product costs
    if (get(response, ["variants", [0], "id"])) {
      await this.shopifyInstance
        .put(`inventory_items/${response.variants[0].inventory_item_id}.json`, {
          inventory_item: {
            country_code_of_origin: "CA",
            province_code_of_origin: "ON",
            harmonized_system_code: 340111,
            id: response.variants[0].inventory_item_id,
            cost: parseFloat(process.env.SOAP_COST) / 100,
          },
        })
        .catch((err) => console.error(err.message));
    }

    // Link variant to the previous image
    if (get(response, ["images", [0], "id"])) {
      await this.shopifyInstance
        .put(`variants/${response.variants[0].id}.json`, {
          variant: {
            id: response.variants[0].id,
            image_id: response.images[0].id,
            metafields: [
              {
                key: "sku",
                value: product.sku,
                value_type: "string",
                namespace: "magicsoaps",
              },
            ],
          },
        })
        .catch((err) => console.error(err.message));
    }

    return response;
  }

  async CreateFulfillmentService() {
    const newFulfillmentService = await this.shopifyInstance
      .post(`fulfillment_services.json`, {
        fulfillment_service: {
          format: "json",
          name: SERVICE_NAME,
          tracking_support: true,
          inventory_management: true,
          requires_shipping_method: true,
          callback_url: `https://${process.env.API_TUNNEL}/api/v1/shopify`,
        },
      })
      .then((response) => response.data.fulfillment_service)
      .catch((err) => {
        console.error("Fulfillment service not created", err);
        return {};
      });

    return newFulfillmentService;
  }

  async CreateSubscriptionWebhook() {
    // Create
    const webhook_creation = gql`
      mutation webhookSubscriptionCreate(
        $topic: WebhookSubscriptionTopic!
        $webhookSubscription: WebhookSubscriptionInput!
      ) {
        webhookSubscriptionCreate(
          topic: $topic
          webhookSubscription: $webhookSubscription
        ) {
          userErrors {
            field
            message
          }
          webhookSubscription {
            id
          }
        }
      }
    `;

    const callback_url = `https://${process.env.API_TUNNEL}/api/v1/webhooks/app_subscriptions_update`;

    const subscription_create = {
      topic: "APP_SUBSCRIPTIONS_UPDATE",
      webhookSubscription: {
        format: "JSON",
        callbackUrl: callback_url,
      },
    };

    const res = await this.graphQLClient
      .request(webhook_creation, subscription_create)
      .then((res) => res.webhookSubscriptionCreate)
      .catch((err) => err);

    return res;
  }

  async CreateRecurringCharge(recurring_application_charge) {
    this.CreateSubscriptionWebhook();

    // charge the customer
    const variables = {
      lineItems: [
        {
          plan: {
            appRecurringPricingDetails: {
              price: {
                amount: recurring_application_charge.price,
                currencyCode: "USD",
              },
              interval:
                recurring_application_charge.price > 50
                  ? "ANNUAL"
                  : "EVERY_30_DAYS",
            },
          },
        },
      ],
      returnUrl: recurring_application_charge.return_url,
      name: recurring_application_charge.name,
      test: process.env.LIVEMODE === "FALSE",
    };

    const mutation = gql`
      mutation(
        $test: Boolean
        $name: String!
        $lineItems: [AppSubscriptionLineItemInput!]!
        $returnUrl: URL!
      ) {
        appSubscriptionCreate(
          test: $test
          name: $name
          returnUrl: $returnUrl
          lineItems: $lineItems
        ) {
          appSubscription {
            id
          }
          confirmationUrl
          userErrors {
            field
            message
          }
        }
      }
    `;

    const recurringCharge = await this.graphQLClient
      .request(mutation, variables)
      .then((res) => res.appSubscriptionCreate)
      .catch((err) => console.error(err));

    return recurringCharge;
  }

  async CancelRecurringCharge(charge) {
    if (get(charge, "id")) {
      const response = await this.shopifyInstance
        .delete(`recurring_application_charges/${charge.id}.json`)
        .catch((err) => console.error(err.message));

      return response;
    }
  }

  async GetFulfillmentService() {
    const query = gql`
      {
        shop {
          name
          id
          fulfillmentServices {
            id
            handle
            location {
              id
            }
            fulfillmentOrdersOptIn
          }
        }
      }
    `;

    const response = await this.graphQLClient
      .request(query)
      .then((res) => res.shop.fulfillmentServices)
      .catch((err) => {
        console.log("err", err);
        return [];
      });

    let fulfillmentService = response.find(
      (el) => el.handle.toLowerCase() === SERVICE_NAME.toLowerCase()
    );

    if (!fulfillmentService)
      fulfillmentService = await this.CreateFulfillmentService();

    return fulfillmentService;
  }

  async GetCustomerByEmail(email) {
    const query = gql`
      query GetCustomers($email: String!) {
        customers(first: 10, query: $email) {
          edges {
            node {
              id
              note
              email
              displayName
              ordersCount
              acceptsMarketing
            }
          }
        }
      }
    `;

    const response = await this.graphQLClient
      .request(query, { email })
      .then((res) => res.customers.edges)
      .catch((err) => {
        return [];
      });

    return response;
  }

  async GetAssignedFulfillmentRequests({ location }) {
    const variables = {
      first: 3,
      assignmentStatus: `FULFILLMENT_REQUESTED`, // FULFILLMENT_REQUESTED or CANCELLATION_REQUESTED
      locationIds: location,
    };

    const mutation = gql`
      query(
        $first: Int
        $assignmentStatus: FulfillmentOrderAssignmentStatus
        $locationIds: [ID!]
      ) {
        shop {
          assignedFulfillmentOrders(
            first: $first
            assignmentStatus: $assignmentStatus
            locationIds: $locationIds
          ) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              cursor
              node {
                id
                status
                order {
                  id
                  name
                  email
                }
                destination {
                  firstName
                  lastName
                  countryCode
                  address1
                  address2
                  city
                  email
                  phone
                  zip
                  province
                }
                lineItems(first: 20) {
                  edges {
                    node {
                      lineItem {
                        id
                        sku
                        title
                        quantity
                        product {
                          id
                          title
                          status
                        }
                        variant {
                          id
                          sku
                          price
                        }
                        image {
                          originalSrc
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
    `;

    const data = await this.graphQLClient
      .request(mutation, variables)
      .then((res) => res.shop.assignedFulfillmentOrders.edges)
      .catch((err) => console.error(err));

    console.log(`assignedFulfillmentOrders`, data);
    return data;
  }

  async GetAssignedCancellationsRequests({ location }) {
    const variables = {
      first: 1,
      assignmentStatus: `CANCELLATION_REQUESTED`,
      locationIds: location,
    };

    const mutation = gql`
      query(
        $first: Int
        $assignmentStatus: FulfillmentOrderAssignmentStatus
        $locationIds: [ID!]
      ) {
        shop {
          assignedFulfillmentOrders(
            first: $first
            assignmentStatus: $assignmentStatus
            locationIds: $locationIds
          ) {
            edges {
              cursor
              node {
                id
                order {
                  id
                  name
                }
                status
                destination {
                  countryCode
                  address1
                  address2
                  city
                  email
                  firstName
                  lastName
                  phone
                  zip
                  province
                }
                fulfillments(first: 3) {
                  edges {
                    node {
                      id
                    }
                  }
                }
                lineItems(first: 10) {
                  edges {
                    node {
                      lineItem {
                        id
                        image {
                          originalSrc
                        }
                        sku
                        title
                        quantity
                        product {
                          id
                          title
                        }
                        variant {
                          id
                          sku
                          price
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
    `;

    const data = await this.graphQLClient
      .request(mutation, variables)
      .then((res) => res.shop.assignedFulfillmentOrders.edges)
      .catch((err) => console.error(err));

    return data;
  }

  async EnableFulfillmentRequests() {
    const service = await this.GetFulfillmentService();
    const identifier = get(service, "id", "").toString();
    const id = identifier.replace("gid://shopify/FulfillmentService/", "");

    const variables = {
      fulfillmentOrdersOptIn: true,
      id: "gid://shopify/FulfillmentService/" + id,
      callbackUrl: "https://" + process.env.API_TUNNEL + "/api/v1/shopify",
    };

    const mutation = gql`
      mutation fulfillmentServiceUpdate(
        $id: ID!
        $fulfillmentOrdersOptIn: Boolean
        $callbackUrl: URL!
      ) {
        fulfillmentServiceUpdate(
          id: $id
          fulfillmentOrdersOptIn: $fulfillmentOrdersOptIn
          callbackUrl: $callbackUrl
        ) {
          fulfillmentService {
            fulfillmentOrdersOptIn
          }
          userErrors {
            message
          }
          fulfillmentService {
            id
          }
        }
      }
    `;

    this.graphQLClient
      .request(mutation, variables)
      .then((res) => res.fulfillmentServiceUpdate)
      .catch((err) => console.error(err));
  }

  async GetRecurringCharges() {
    const charges = await this.shopifyInstance
      .get(`/recurring_application_charges.json`)
      .then((res) => {
        return res.data.recurring_application_charges;
      })
      .catch((err) => {
        console.log("create fulfullment err", err.message);
        return [];
      });

    return charges;
  }

  async RejectFulfillment({ id, message }) {
    const mutation = gql`
      mutation fulfillmentOrderRejectFulfillmentRequest(
        $id: ID!
        $message: String
      ) {
        fulfillmentOrderRejectFulfillmentRequest(id: $id, message: $message) {
          fulfillmentOrder {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    await this.graphQLClient
      .request(mutation, { id, message })
      .then(({ fulfillmentOrderRejectFulfillmentRequest: data }) => {})
      .catch((err) => console.error("err", err));

    return;
  }

  async AcceptFulfillmentRequest({ id, message }) {
    const variables = {
      id,
      message,
    };

    const mutation = gql`
      mutation fulfillmentOrderAcceptFulfillmentRequest(
        $id: ID!
        $message: String
      ) {
        fulfillmentOrderAcceptFulfillmentRequest(id: $id, message: $message) {
          fulfillmentOrder {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    await this.graphQLClient
      .request(mutation, variables)
      .then(({ fulfillmentOrderAcceptFulfillmentRequest: data }) =>
        console.log("Accepted fulfillment for", id, data)
      )
      .catch((err) => console.error(`AcceptFulfillmentRequest()`, err));

    return;
  }

  async AcceptCancellationRequest({ id, message }) {
    const variables = {
      id,
      message,
    };

    const mutation = gql`
      mutation fulfillmentOrderAcceptCancellationRequest(
        $id: ID!
        $message: String
      ) {
        fulfillmentOrderAcceptCancellationRequest(id: $id, message: $message) {
          fulfillmentOrder {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    await this.graphQLClient
      .request(mutation, variables)
      .then((res) => console.log("accepted cancellation", res.data))
      .catch((err) => console.error(err));

    return;
  }

  async RejectCancellationRequest({ id, message }) {
    const variables = {
      id,
      message,
    };

    const mutation = gql`
      mutation fulfillmentOrderRejectCancellationRequest(
        $id: ID!
        $message: String
      ) {
        fulfillmentOrderRejectCancellationRequest(id: $id, message: $message) {
          fulfillmentOrder {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    await this.graphQLClient
      .request(mutation, variables)
      .then((res) => console.log("rejected", res.data))
      .catch((err) => console.error(err));

    return;
  }

  async GetOrder(id) {
    const response = await this.shopifyInstance
      .get(`orders/${id}.json`)
      .then((res) => res.data.order)
      .catch((err) => console.error("product err", err.message));

    return response;
  }

  async CreateOrder(data) {
    const order = await this.shopifyInstance
      .post(`/orders.json`, data)
      .then((res) => res.data.order)
      .catch((err) => {
        console.log({ err });
        return [];
      });

    return order;
  }

  // https://shopify.dev/docs/admin-api/rest/reference/orders/order-risk
  async CreateOrderRisk(order_id, data) {
    const risk = await this.shopifyInstance
      .post(`/orders/${order_id}/risks.json`, {
        risk: {
          message: data.message,
          recommendation: get(data, "recommendation", "cancel"),

          score: 1.0,
          source: "DisputeCore",
          cause_cancel: false,
          display: true,
        },
      })
      .then((res) => res.data.order)
      .catch((err) => {
        console.log({ err });
        return [];
      });

    return risk;
  }

  async AddOrderMeta(order_id, meta) {
    const metafields = await Promise.all(
      Object.entries(meta).map(async ([key, value]) => {
        return await this.shopifyInstance
          .post(`orders/${order_id}/metafields.json`, {
            metafield: {
              namespace: "magicsoaps",
              key: key,
              value: value.toString(),
              value_type: "string",
            },
          })
          .then((res) => res.data.metafield)
          .catch((err) => console.error(err));
      })
    );

    return metafields;
  }

  async GetOrderMeta(order_id) {
    const deleteStatus = await this.shopifyInstance
      .get(`orders/${order_id}/metafields.json`)
      .then((res) => res.data.metafields)
      .catch((err) => {
        console.error(err);
        return [];
      });

    return deleteStatus;
  }

  GetShippingMeta(country) {
    let shippingMethod;
    switch (country) {
      case "US":
        shippingMethod = {
          id: "18",
          method_title: "USPS",
          method_id: "SHOPIFY_USPS",
          total: 425,
          meta_data: [{ timeline: "4-5 days" }],
          rates: {
            1: 470,
            2: 566,
            3: 986,
            4: 1130,
            5: 1200,
          },
        };
        break;

      case "CA":
        shippingMethod = {
          id: "19",
          method_title: "Canada Post",
          method_id: "SHOPIFY_CANADA_POST",
          total: 700,
          meta_data: [{ timeline: "3-10 days" }],
          rates: {
            1: 640,
            2: 640,
            3: 640,
            4: 650,
            5: 1000,
          },
        };

        break;

      default:
        shippingMethod = {
          id: "20",
          method_title: "International Shipping",
          method_id: "SHOPIFY_ASCENDIA",
          total: 1000,
          meta_data: [{ timeline: "3-4 weeks" }],
          rates: {
            1: 921,
            2: 1102,
            3: 1326,
            4: 1398,
            5: 1410,
          },
        };
        break;
    }

    return shippingMethod;
  }

  async verifyToken(token) {
    // For edge-cases where the token doesn't exist
    if (!token || token === undefined || token === "false") {
      return { isVerified: false };
    }

    // Both the token needs to be valid
    // and the token's username needs to match request username

    const res = await auth.verify(
      token,
      process.env.SHOPIFY_API_SECRET,
      { ignoreNotBefore: true, ignoreExpiration: true },
      function (err, decoded) {
        if (err) {
          console.error("verify", token, err);
          return { isVerified: false };
        }

        const username = decoded.dest
          .replace("https://", "")
          .replace(".myshopify.com", "");

        return { isVerified: true, username };
      }
    );

    return res;
  }

  async verifyShopifyHash(ctx) {
    const hmac = get(ctx.request.headers, `x-shopify-hmac-sha256`);
    if (!hmac) return false;

    const hash = require("crypto")
      .createHmac("sha256", process.env.SHOPIFY_API_KEY)
      .update(ctx.request.rawBody, "utf8", "hex")
      .digest("base64");

    const hashVerification = hash === hmac;
    return hashVerification;
  }

  async getCredentials(ctx) {
    let isVerified = false;

    let {
      "x-username": username,
      "x-shopify-access-token": shopifyAccessToken,
      "x-shopify-shop-domain": shop_domain,
      "x-shopify-hmac-sha256": shopifyHmac,
      "authorization": auth,
    } = ctx.request.headers;

    // Prevent cookies valued called 'undefined' from getting through
    if (username === "undefined") username = undefined;
    if (shopifyAccessToken === "undefined") shopifyAccessToken = undefined;
    if (shop_domain === "undefined") shop_domain = undefined;
    if (shopifyHmac === "undefined") shopifyHmac = false;

    // Fall back to Shopify store name is no username
    if (!username && shop_domain) {
      username = shop_domain.replace(".myshopify.com", "");
    }

    auth = auth && auth.replace("Bearer ", "").replace(/ /g, "");
    const verifiedData = await this.verifyToken(auth);
    isVerified = get(verifiedData, "isVerified", false);

    // If the enviroment is false, verify all requests to avoid gettings jwts
    if (this.livemode === false) isVerified = true;

    if (isVerified) {
      // Extract token data
      // Username & header matches at this point unless this is a webhook
      username = get(verifiedData, "username", username);
      username = username.replace("https://", "").replace(".myshopify.com", "");
    }

    // Additional verification for incoming Shopify webhooks
    // May as well group it here for convenience
    // Either verification must succeed
    if (shopifyHmac && !isVerified) {
      isVerified = this.verifyShopifyHash(ctx);
    }

    return {
      username,
      isVerified,
      shopifyAccessToken,
      authorization: auth,
    };
  }

  async Uninstall() {
    const response = await this.shopifyInstance
      .delete(`api_permissions/current.json`)
      .then((response) => console.log("uninstall event", response.data))
      .catch((err) => console.error("uninstall error", err, this.username));

    return response;
  }
}

module.exports = Shopify;
