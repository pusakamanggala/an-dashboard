import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";

async function updateUserProfile({ userID, data }) {
  const token = getToken(); // Get the token from the utility function
  const headers = {
    "auth-token": token,
  };
  const response = await axios.put(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/user/${userID}`,
    data,
    {
      headers,
    }
  );
  return response.data;
}

export function useUpdateUserProfileFromAdmin() {
  const queryClient = useQueryClient();

  return useMutation((updateData) => updateUserProfile(updateData), {
    onSuccess: () => {
      // Invalidate and refetch relevant queries after successful update
      queryClient.invalidateQueries("members");
      queryClient.invalidateQueries("user");
    },
  });
}
