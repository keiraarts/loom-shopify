import axios from "axios";

function CreateInstance(state) {
  const { session_token, shopify_token } = state;

  const instance = axios.create({
    baseURL: `https://${process.env.API_TUNNEL}/api/v1/`,
    crossdomain: true,
    headers: {
      "X-Session-Tokens-Enabled": "true",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session_token,
      "X-Shopify-Access-Token": shopify_token,
    },
  });

  return instance;
}

export { CreateInstance };
