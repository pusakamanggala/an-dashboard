import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";
import { useRefreshToken } from "./useRefreshToken";

async function fetchDeployments() {
  const token = getToken(); // Get the token from the utility function
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/kube/main/deploy`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetDeployments() {
  const refreshTokenMutation = useRefreshToken();

  return useQuery(["deployments"], () => fetchDeployments(), {
    enabled: !!getToken(),
    cacheTime: 1000,
    staleTime: 2000,
    onError: (error) => {
      if (error?.response?.status === 400) {
        refreshTokenMutation.mutate();
      }
    },
  });
}
