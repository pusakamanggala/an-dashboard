import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";
import { useRefreshToken } from "./useRefreshToken";

async function fetchMembers() {
  const token = getToken(); // Get the token from the utility function
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/user/`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetMembers(role) {
  const refreshTokenMutation = useRefreshToken();
  return useQuery(["members"], () => fetchMembers(), {
    enabled: role === "admin" && !!getToken(),
    cacheTime: 2000,
    staleTime: 4000,
    onError: (error) => {
      if (error?.response?.status === 400) {
        refreshTokenMutation.mutate();
      }
    },
  });
}
