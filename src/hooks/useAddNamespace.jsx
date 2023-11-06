import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";
import useNotification from "./useNotification";
import { useRefreshToken } from "./useRefreshToken";

export function useAddNamespace() {
  const queryClient = useQueryClient();
  const { notifyLoading, notifySuccess, notifyError, notifyWarning } =
    useNotification();
  const refreshTokenMutation = useRefreshToken();

  return useMutation(
    async ({ data }) => {
      const token = getToken(); // Get the token from the utility function
      const headers = {
        "auth-token": token,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}dashboard/kube/admin/namespace`,
        data,
        {
          headers,
        }
      );

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("namespace"); // to refetch namespace after mutation is success
        notifySuccess("Namespace added successfully");
      },
      onError: (error) => {
        if (error?.response?.status === 400) {
          refreshTokenMutation.mutate();
          notifyWarning("Process has been canceled, please try again");
        } else
          notifyError(error?.response?.data?.message || "Something went wrong");
      },
      onMutate: () => {
        notifyLoading("Adding namespace...");
      },
    }
  );
}
