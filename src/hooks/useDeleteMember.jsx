import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";
import useNotification from "./useNotification";

export function useDeleteMember() {
  const queryClient = useQueryClient();
  const { notifyLoading, notifySuccess, notifyError } = useNotification();

  return useMutation(
    async (userID) => {
      const token = getToken(); // Get the token from the utility function
      const headers = {
        "auth-token": token,
      };

      await axios.delete(
        `${import.meta.env.VITE_API_ENDPOINT}dashboard/user/${userID}`,
        {
          headers,
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("members"); // to refetch projectList after mutation is success
        notifySuccess("User has been deleted");
      },
      onError: (error) => {
        // show error from response if available
        notifyError(
          error?.response?.data?.message ||
            "Something went wrong with deleting user"
        );
      },
      onMutate: () => {
        notifyLoading("Deleting user...");
      },
    }
  );
}
