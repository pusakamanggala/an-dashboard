import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";

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
  return useQuery(["members"], () => fetchMembers(), {
    enabled: role === "admin" && !!getToken(),
  });
}
