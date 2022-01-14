import { useCountState } from "../src/app-context";
import axios from "axios";
import useSWR from "swr";

function useVideo(id) {
  const { username, session_token } = useCountState();

  const instance = axios.create({
    crossdomain: true,
    baseURL: "https://" + process.env.API_TUNNEL + "/api/v1/" + username,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session_token,
      "X-App-Function": "useVideo",
    },
  });

  const fetcher = (url) => instance.get(url).then(({ data }) => data);
  const { data, error, mutate } = useSWR(
    session_token ? [`/storefront/videos/${id}`, id] : null,
    fetcher
  );

  return {
    data,
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useVideo;
