import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";

async function fetchProjectList() {
  const token = getToken(); // Get the token from the utility function
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/kube/admin/project`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetProjectList() {
  return useQuery(["projectList"], () => fetchProjectList(), {
    enabled: !!getToken(),
    cacheTime: 3000,
    staleTime: 5000,
  });
}
