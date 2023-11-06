import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";
import { useRefreshToken } from "./useRefreshToken";

async function fetchImages() {
  const token = getToken();
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/kube/main/images-page`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetImages() {
  const refreshTokenMutation = useRefreshToken();

  return useQuery(["images"], () => fetchImages(), {
    enabled: !!getToken(),
    cacheTime: 3000,
    staleTime: 5000,
    onError: (error) => {
      if (error?.response?.status === 400) {
        refreshTokenMutation.mutate();
      }
    },
  });
}
