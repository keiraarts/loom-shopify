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
  const { data, error } = useSWR(session_token && `/storefront`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useStorefront;
