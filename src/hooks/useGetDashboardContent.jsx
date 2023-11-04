import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";

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
  return useQuery(
    ["dashboardContent", content],
    () => fetchDashboardContent(content),
    {
      enabled: !!getToken(),
      cacheTime: content === "events" ? 1000 : 5000,
      staleTime: content === "events" ? 2000 : 7000,
    }
  );
}
