import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";

export function useAddMember() {
  const queryClient = useQueryClient();

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
        // to refetch projectList after mutation is success
        queryClient.invalidateQueries("members");
      },
    }
  );
}
