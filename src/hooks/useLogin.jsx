import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import useNotification from "./useNotification";
import jwtDecode from "jwt-decode";

async function login(data) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/user/login`,
    data
  );
  return response.data;
}

export function useLogin(rememberUser) {
  const queryClient = useQueryClient();
  const { notifyLoading, notifySuccess, notifyError } = useNotification();

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      const authToken = data.data.token;
      const refreshToken = data.data.refreshToken;
      document.cookie = `auth-token=${authToken}`;
      document.cookie = `refresh-token=${refreshToken}`;

      if (rememberUser) {
        // get refresh token from cookie
        const getRefreshToken = () => {
          const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("refresh-token="));

          return cookie ? cookie.split("=")[1] : null;
        };

        const refreshToken = getRefreshToken();
        const decodedRefreshToken = jwtDecode(refreshToken);
        const tokenExpireTime = decodedRefreshToken.exp * 1000;

        document.cookie = `auth-token=${authToken}; expires=${new Date(
          tokenExpireTime
        ).toUTCString()}`;
        document.cookie = `refresh-token=${refreshToken}; expires=${new Date(
          tokenExpireTime
        ).toUTCString()}`;
        document.cookie = `remember-user=${rememberUser}; expires=${new Date(
          tokenExpireTime
        ).toUTCString()}`;
      }

      queryClient.setQueryData("userLogin", data);
      notifySuccess("Login successful");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (error) => {
      notifyError(
        error?.response?.data?.message ||
          "Something went wrong while logging in"
      );
    },
    onMutate: () => {
      notifyLoading("Logging in...");
    },
  });

  return loginMutation;
}
