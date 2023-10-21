import axios from "axios";
import { useMutation } from "react-query";
import { getToken } from "../utils/helper";

async function updateProfile({ userID, data }) {
  const token = getToken(); // Get the token from the utility function
  const headers = {
    "auth-token": token,
    "Content-Type": "multipart/form-data",
  };
  const response = await axios.put(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/user/edit-profile/${userID}`,
    data,
    {
      headers,
    }
  );
  return response.data;
}

export function useUpdateUserProfile() {
  return useMutation((updateData) => updateProfile(updateData));
}
