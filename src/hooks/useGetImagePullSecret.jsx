import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";
import { useRefreshToken } from "./useRefreshToken";

async function fetchImagesPullSecret() {
  const token = getToken();
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${
      import.meta.env.VITE_API_ENDPOINT
    }dashboard/kube/main/deploy/images/pull-secret`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetImagesPullSecret() {
  const refreshTokenMutation = useRefreshToken();
  return useQuery(["imagesPullSecret"], () => fetchImagesPullSecret(), {
    enabled: !!getToken(),
    onError: (error) => {
      if (error?.response?.status === 400) {
        refreshTokenMutation.mutate();
      }
    },
  });
}
