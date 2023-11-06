import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";
import { useRefreshToken } from "./useRefreshToken";

async function fetchNamespace() {
  const token = getToken(); // Get the token from the utility function
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/kube/admin/namespace`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetNamespace(role) {
  const refreshTokenMutation = useRefreshToken();
  return useQuery(["namespace"], () => fetchNamespace(), {
    enabled: role === "admin" && !!getToken(),
    onError: (error) => {
      if (error?.response?.status === 400) {
        refreshTokenMutation.mutate();
      }
    },
  });
}
