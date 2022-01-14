import { useCountState } from "../src/app-context";
import axios from "axios";
import useSWR from "swr";

function useTheme() {
  const { username, session_token, shopify_token } = useCountState();

  const instance = axios.create({
    crossdomain: true,
    baseURL: "https://" + process.env.API_TUNNEL + "/api/v1/" + username,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session_token,
      "X-Shopify-Access-Token": shopify_token,
      "X-App-Function": "useTheme",
    },
  });

  const fetcher = (url) => instance.get(url).then(({ data }) => data);
  const { data, error, mutate } = useSWR(
    // Requirement is a username
    session_token ? [`/shopify/themes`] : null,
    fetcher
  );

  return {
    mutate,
    data: data || [],
    isLoading: !error && !data,
    isError: error,
  };
}

export default useTheme;
