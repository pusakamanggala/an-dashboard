import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { getToken } from "../utils/helper";

export function useDeleteAddons() {
  const queryClient = useQueryClient();

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
        // to refetch addons after mutation is successful
        queryClient.invalidateQueries("addons");
      },
    }
  );
}
