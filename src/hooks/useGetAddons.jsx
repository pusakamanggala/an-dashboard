import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";

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
  return useQuery(["addons"], () => fetchAddons(), {
    enabled: !!getToken(),
  });
}
