import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";
import useNotification from "./useNotification";

export function useAddDeployment() {
  const queryClient = useQueryClient();
  const { notifyLoading, notifySuccess, notifyError } = useNotification();

  return useMutation(
    async ({ data }) => {
      const token = getToken(); // Get the token from the utility function
      const headers = {
        "auth-token": token,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}dashboard/kube/main/deploy`,
        data,
        {
          headers,
        }
      );

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("deployments"); // to refetch deployments after mutation is success
        notifySuccess("Deployment Added Successfully");
      },
      onError: (error) => {
        if (error?.response?.status === 400) {
          notifyError("Process has been canceled, please try again");
        } else
          notifyError(
            error?.response?.data?.message ||
              "Something went wrong when deploying"
          );
      },
      onMutate: () => {
        notifyLoading("Deploying...");
      },
    }
  );
}
