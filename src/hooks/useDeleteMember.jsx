import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";

export function useDeleteMember() {
  const queryClient = useQueryClient();

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
        // to refetch projectList after mutation is success
        queryClient.invalidateQueries("members");
      },
    }
  );
}
