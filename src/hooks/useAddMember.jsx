import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";
import useNotification from "./useNotification";
import { useRefreshToken } from "./useRefreshToken";

export function useAddMember() {
  const queryClient = useQueryClient();
  const { notifyLoading, notifySuccess, notifyError } = useNotification();
  const refreshTokenMutation = useRefreshToken();

  return useMutation(
    async ({ data }) => {
      const token = getToken(); // Get the token from the utility function
      const headers = {
        "auth-token": token,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}dashboard/user/register`,
        data,
        {
          headers,
        }
      );

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("members"); // to refetch members after mutation is success
        notifySuccess("Member successfully added");
      },
      onError: (error) => {
        if (error?.response?.status === 400) {
          refreshTokenMutation.mutate();
          notifyError("Process has been canceled, please try again");
        } else
          notifyError(error?.response?.data?.message || "Something went wrong");
      },
      onMutate: () => {
        notifyLoading("Adding member...");
      },
    }
  );
}
