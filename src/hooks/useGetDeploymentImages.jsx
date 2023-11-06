import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";
import { useRefreshToken } from "./useRefreshToken";

async function fetchDeploymentImages() {
  const token = getToken();
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/kube/main/deploy/images`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetDeploymentImages() {
  const refreshTokenMutation = useRefreshToken();
  return useQuery(["deploymentImages"], () => fetchDeploymentImages(), {
    enabled: !!getToken(),
    onError: (error) => {
      if (error?.response?.status === 400) {
        refreshTokenMutation.mutate();
      }
    },
  });
}
