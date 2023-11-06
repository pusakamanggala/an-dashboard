import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";
import useNotification from "./useNotification";
import { useRefreshToken } from "./useRefreshToken";

export function useUpdateUserProfileFromAdmin() {
  const queryClient = useQueryClient();
  const { notifyLoading, notifySuccess, notifyError, notifyWarning } =
    useNotification();
  const refreshTokenMutation = useRefreshToken();

  return useMutation(
    async ({ userID, data }) => {
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
    },
    {
      onSuccess: () => {
        // Invalidate and refetch relevant queries after a successful update
        queryClient.invalidateQueries("members");
        queryClient.invalidateQueries("user");

        notifySuccess("User profile has been updated");
      },
      onError: (error) => {
        if (error?.response?.status === 400) {
          refreshTokenMutation.mutate();
          notifyWarning("Process has been canceled, please try again");
        } else
          notifyError(error?.response?.data?.message || "Something went wrong");
      },
      onMutate: () => {
        notifyLoading("Updating profile...");
      },
    }
  );
}
