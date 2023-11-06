import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";
import { useRefreshToken } from "./useRefreshToken";

async function fetchDashboardContent(content) {
  const token = getToken(); // Get the token from the utility function

  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/kube/main/${content}`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetDashboardContent(content) {
  const refreshTokenMutation = useRefreshToken();
  return useQuery(
    ["dashboardContent", content],
    () => fetchDashboardContent(content),
    {
      enabled: !!getToken(),
      cacheTime: content === "events" ? 1000 : 5000,
      staleTime: content === "events" ? 2000 : 7000,
      onError: (error) => {
        if (error?.response?.status === 400) {
          refreshTokenMutation.mutate();
        }
      },
    }
  );
}
