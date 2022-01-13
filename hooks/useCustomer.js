import { useCountState } from "../src/app-context";
import axios from "axios";
import useSWR from "swr";

function useCustomer(email) {
  const { username, session_token, shopify_token } = useCountState();

  const instance = axios.create({
    crossdomain: true,
    baseURL: "https://" + process.env.API_TUNNEL + "/api/v1/" + username,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session_token,
      "X-Shopify-Access-Token": shopify_token,
    },
  });

  const fetcher = (url) => instance.get(url).then(({ data }) => data);

  const { data, error, mutate } = useSWR(
    [shopify_token && username && `/shopify/customers?email=${email}`, email],
    fetcher
  );

  return {
    mutate,
    data: data?.[0]?.node ?? { id: false },
    isLoading: !error && !data,
    isError: error,
  };
}

export default useCustomer;
