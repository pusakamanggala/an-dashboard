import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";
import { useRefreshToken } from "./useRefreshToken";

async function fetchDetailDeployment(podName, namespace) {
  const token = getToken(); // Get the token from the utility function
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${
      import.meta.env.VITE_API_ENDPOINT
    }dashboard/kube/main/deploy/info?namespace=${namespace}&podName=${podName}`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetDetailDeployment(podName, namespace) {
  const refreshTokenMutation = useRefreshToken();
  return useQuery(
    ["detailDeployment", podName, namespace],
    () => fetchDetailDeployment(podName, namespace),
    {
      enabled: !!getToken() && !!podName && !!namespace,
      onError: (error) => {
        if (error?.response?.status === 400) {
          refreshTokenMutation.mutate();
        }
      },
    }
  );
}
