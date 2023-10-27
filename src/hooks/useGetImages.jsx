import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";

async function fetchImages() {
  const token = getToken();
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/kube/main/images-page`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetImages() {
  return useQuery(["images"], () => fetchImages(), {
    enabled: !!getToken(),
  });
}
