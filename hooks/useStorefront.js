import { useCountState } from "../src/app-context";
import axios from "axios";
import useSWR from "swr";

function useStorefront() {
  const { username, session_token } = useCountState();

  const instance = axios.create({
    crossdomain: true,
    baseURL: "https://" + process.env.API_TUNNEL + "/api/v1/" + username,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session_token,
    },
  });

  const fetcher = (url) => instance.get(url).then(({ data }) => data);
  const { data, error, mutate } = useSWR(
    session_token && `/storefront`,
    fetcher,
    {
      // This is useful for testing msw in test functions
      initialData: process.env.JEST_WORKER_ID
        ? { username: "demo" }
        : undefined,
    }
  );

  return {
    data: data || { id: false, is_compatible: false },
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
}

export default useStorefront;
