import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";
import useNotification from "./useNotification";

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const { notifyLoading, notifySuccess, notifyError } = useNotification();

  return useMutation(
    async ({ userID, data }) => {
      const token = getToken(); // Get the token from the utility function
      const headers = {
        "auth-token": token,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.put(
        `${
          import.meta.env.VITE_API_ENDPOINT
        }dashboard/user/edit-profile/${userID}`,
        data,
        {
          headers,
        }
      );

      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch relevant queries after a successful update
        queryClient.invalidateQueries("members");
        queryClient.invalidateQueries("user");

        notifySuccess("User profile has been updated");
      },
      onError: (error) => {
        // Show error from response if available
        notifyError(error?.response?.data?.message || "Something went wrong");
      },
      onMutate: () => {
        notifyLoading("Updating profile...");
      },
    }
  );
}
