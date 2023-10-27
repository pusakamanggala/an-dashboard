import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";

async function fetchServices() {
  const token = getToken();
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/kube/main/service-page`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetServices() {
  return useQuery(["services"], () => fetchServices(), {
    enabled: !!getToken(),
  });
}
