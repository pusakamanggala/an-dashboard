import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import useNotification from "./useNotification";
import { getToken } from "../utils/helper";
import { useRefreshToken } from "./useRefreshToken";

export function useLogout() {
  const queryClient = useQueryClient();
  const { notifyError, notifyWarning, notifyLoading } = useNotification();
  const refreshTokenMutation = useRefreshToken();

  const headers = {
    "auth-token": getToken(),
  };

  return useMutation(
    async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}dashboard/user/logout`,
        null, // Pass null as data since this endpoint doesn't require data
        {
          headers,
        }
      );

      return response.data;
    },
    {
      onSuccess: () => {
        //  clear all cookies
        document.cookie =
          "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "remember-user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        window.location.reload(); // reload the page
      },
      onError: (error) => {
        if (error.response.status === 400) {
          refreshTokenMutation.mutate();
          notifyWarning("Process has been canceled, please try again");
        } else {
          notifyError(error.response.data.message);
        }
      },
      onMutate: () => {
        queryClient.cancelQueries(); // disable all query
        notifyLoading("Taking you out...");
      },
    }
  );
}
