import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";

// This endpoint can be access by reqular users
async function fetchUserByID(id) {
  const token = getToken();
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/user/edit-profile/${id}`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetUserByIDAlt(id) {
  return useQuery(["user", id], () => fetchUserByID(id), {
    enabled: id !== undefined && getToken() !== undefined,
  });
}
