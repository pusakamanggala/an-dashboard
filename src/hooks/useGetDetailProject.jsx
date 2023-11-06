import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";
import { useRefreshToken } from "./useRefreshToken";

async function fetchDetailProject(projectID) {
  const token = getToken(); // Get the token from the utility function
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${
      import.meta.env.VITE_API_ENDPOINT
    }dashboard/kube/admin/project/${projectID}`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetDetailProject(projectID) {
  const refreshTokenMutation = useRefreshToken();
  return useQuery(
    ["detailProject", projectID],
    () => fetchDetailProject(projectID),
    {
      enabled: !!getToken() && !!projectID,
      onError: (error) => {
        if (error?.response?.status === 400) {
          refreshTokenMutation.mutate();
        }
      },
    }
  );
}
