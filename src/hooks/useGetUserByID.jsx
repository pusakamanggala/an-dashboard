import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";
import { useRefreshToken } from "./useRefreshToken";

async function fetchUserByID(id) {
  const token = getToken(); // Get the token from the utility function
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/user/${id}`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetUserByID(id) {
  const refreshTokenMutation = useRefreshToken();
  return useQuery(["user", id], () => fetchUserByID(id), {
    enabled: id !== undefined && getToken() !== undefined,
    onError: (error) => {
      if (error?.response?.status === 400) {
        refreshTokenMutation.mutate();
      }
    },
  });
}
