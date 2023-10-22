import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";

export function useDeleteProject() {
  const queryClient = useQueryClient();

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
        // to refetch projectList after mutation is success
        queryClient.invalidateQueries("projectList");
      },
    }
  );
}
