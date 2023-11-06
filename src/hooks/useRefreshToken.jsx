import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import useNotification from "./useNotification";
import jwtDecode from "jwt-decode";

export function useRefreshToken() {
  const queryClient = useQueryClient();
  const { notifyError } = useNotification();

  // get refresh token from cookie
  const getRefreshToken = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refresh-token="));

    return cookie ? cookie.split("=")[1] : null;
  };

  const headers = {
    "refresh-token": getRefreshToken(),
  };

  return useMutation(
    async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}dashboard/user/refresh`,
        null, // Pass null as data since the refresh token doesn't require data
        {
          headers,
        }
      );

      return response.data;
    },
    {
      onSuccess: (data) => {
        // get remember user from cookie, if true, set remember user to true else false
        const getRememberUser = () => {
          const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("remember-user="));

          return cookie ? cookie.split("=")[1] : null;
        };

        if (getRememberUser() === "true") {
          // Decode the refresh-token to get its expiration time
          const refreshToken = getRefreshToken();
          const decodedRefreshToken = jwtDecode(refreshToken);
          const tokenExpireTime = decodedRefreshToken.exp * 1000;

          // Set the `auth-token` with the new token and the expiration time from the refresh-token
          document.cookie = `auth-token=${data.data.token}; expires=${new Date(
            tokenExpireTime
          ).toUTCString()}`;
        } else {
          document.cookie = `auth-token=${data.data.token}`;
        }

        // Refetch all queries
        queryClient.invalidateQueries();
      },
      onError: () => {
        notifyError(
          "Session expired, please login again to continue using the application"
        );

        // remove auth-token and refresh-token value and userRole
        document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie =
          "refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      onMutate: () => {
        // disable all query
        queryClient.cancelQueries();
      },
    }
  );
}
