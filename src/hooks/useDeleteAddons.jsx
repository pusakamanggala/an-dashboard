import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";
import useNotification from "./useNotification";
import { useRefreshToken } from "./useRefreshToken";

export function useDeleteAddons() {
  const queryClient = useQueryClient();
  const { notifyLoading, notifySuccess, notifyError, notifyWarning } =
    useNotification();
  const refreshTokenMutation = useRefreshToken();

  return useMutation(
    async ({ namespace, addonsName, projectOwner }) => {
      const token = getToken(); // Get the token from the utility function
      const headers = {
        "auth-token": token,
      };

      await axios.delete(
        `${
          import.meta.env.VITE_API_ENDPOINT
        }dashboard/kube/main/addons?namespace=${namespace}&addonsName=${addonsName}&projectOwner=${projectOwner}`,
        {
          headers,
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("addons"); // to refetch addons after mutation is successful
        notifySuccess("Deletion process is in progress. Please wait a moment.");
      },
      onError: (error) => {
        if (error?.response?.status === 400) {
          refreshTokenMutation.mutate();
          notifyWarning("Process has been canceled, please try again");
        } else
          notifyError(
            error?.response?.data?.message ||
              "Something went wrong while deleting addon"
          );
      },
      onMutate: () => {
        notifyLoading("Deleting addon...");
      },
    }
  );
}
