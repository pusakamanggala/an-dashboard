import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";
import useNotification from "./useNotification";

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { notifyLoading, notifySuccess, notifyError } = useNotification();

  return useMutation(
    async (projectID) => {
      const token = getToken(); // Get the token from the utility function
      const headers = {
        "auth-token": token,
      };

      await axios.delete(
        `${
          import.meta.env.VITE_API_ENDPOINT
        }dashboard/kube/admin/project/${projectID}`,
        {
          headers,
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projectList"); // to refetch projectList after mutation is success
        notifySuccess("Project has been deleted");
      },
      onError: (error) => {
        // show error from response if available
        notifyError(
          error?.response?.data?.message ||
            "Something went wrong while deleting project"
        );
      },
      onMutate: () => {
        notifyLoading("Deleting project...");
      },
    }
  );
}
