import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";
import { useRefreshToken } from "./useRefreshToken";

async function fetchServices() {
  const token = getToken();
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/kube/main/service-page`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetServices() {
  const refreshTokenMutation = useRefreshToken();
  return useQuery(["services"], () => fetchServices(), {
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
