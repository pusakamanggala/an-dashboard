import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";
import useNotification from "./useNotification";

export function useDeleteDeployment() {
  const queryClient = useQueryClient();
  const { notifyLoading, notifySuccess, notifyError } = useNotification();

  return useMutation(
    async ({ namespace, serviceName, projectOwner }) => {
      const token = getToken(); // Get the token from the utility function
      const headers = {
        "auth-token": token,
      };

      await axios.delete(
        `${
          import.meta.env.VITE_API_ENDPOINT
        }dashboard/kube/main/deploy?namespace=${namespace}&serviceName=${serviceName}&projectOwner=${projectOwner}`,
        {
          headers,
        }
      );
    },
    {
      onSuccess: () => {
        notifySuccess("Deletion process is in progress. Please wait a moment.");
        // to refetch deployments after mutation is successful
        queryClient.invalidateQueries("deployments");
      },
      onError: (error) => {
        notifyError(
          error?.response?.data?.message ||
            "Something went wrong with deleting deployment"
        );
      },
      onMutate: () => {
        notifyLoading("Deleting deployment...");
      },
    }
  );
}
