import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";

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
  return useQuery(["imagesPullSecret"], () => fetchImagesPullSecret(), {
    enabled: !!getToken(),
  });
}
