import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";

async function fetchDetailAddons(podName, namespace) {
  const token = getToken(); // Get the token from the utility function
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${
      import.meta.env.VITE_API_ENDPOINT
    }dashboard/kube/main/addons/info?namespace=${namespace}&podName=${podName}`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetDetailAddons(podName, namespace) {
  return useQuery(
    ["detailAddons", podName, namespace],
    () => fetchDetailAddons(podName, namespace),
    {
      enabled: !!getToken() && !!podName && !!namespace,
    }
  );
}
