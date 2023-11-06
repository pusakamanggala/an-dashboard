import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";
import { useRefreshToken } from "./useRefreshToken";

async function fetchAddons() {
  const token = getToken();
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/kube/main/addons`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetAddons() {
  const refreshTokenMutation = useRefreshToken();

  return useQuery(["addons"], () => fetchAddons(), {
    enabled: !!getToken(),
    cacheTime: 3000,
    staleTime: 4000,
    onError: (error) => {
      if (error?.response?.status === 400) {
        refreshTokenMutation.mutate();
      }
    },
  });
}
