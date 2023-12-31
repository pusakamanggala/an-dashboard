import axios from "axios";
import { useQuery } from "react-query";
import { getToken } from "../utils/helper";
import { useRefreshToken } from "./useRefreshToken";

async function fetchDeploymentImagesTag(gitlabProjectId, gitlabRegistryId) {
  const token = getToken(); // Get the token from the utility function
  const headers = {
    "auth-token": token,
  };
  const response = await axios.get(
    `${
      import.meta.env.VITE_API_ENDPOINT
    }dashboard/kube/main/deploy/images/tag?gitlabProjectId=${gitlabProjectId}&gitlabRegistryId=${gitlabRegistryId}`,
    {
      headers,
    }
  );
  return response.data;
}

export function useGetDeploymentImagesTag(gitlabProjectId, gitlabRegistryId) {
  const refreshTokenMutation = useRefreshToken();
  return useQuery(
    ["deploymentImagesTag", gitlabProjectId, gitlabRegistryId],
    () => fetchDeploymentImagesTag(gitlabProjectId, gitlabRegistryId),
    {
      enabled: !!getToken() && !!gitlabProjectId && !!gitlabRegistryId,
      onError: (error) => {
        if (error?.response?.status === 400) {
          refreshTokenMutation.mutate();
        }
      },
    }
  );
}
