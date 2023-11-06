import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";
import useNotification from "./useNotification";
import { useRefreshToken } from "./useRefreshToken";

export function useAddAddons() {
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
        `${import.meta.env.VITE_API_ENDPOINT}dashboard/kube/main/addons`,
        data,
        {
          headers,
        }
      );

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("addons"); // to refetch addons after mutation is success
        notifySuccess("Addons successfully added");
      },
      onError: (error) => {
        if (error?.response?.status === 400) {
          refreshTokenMutation.mutate();
          notifyWarning("Process has been canceled, please try again");
        } else
          notifyError(error?.response?.data?.message || "Something went wrong");
      },
      onMutate: () => {
        notifyLoading("Adding addons...");
      },
    }
  );
}
