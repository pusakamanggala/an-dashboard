import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import useNotification from "./useNotification";

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
      document.cookie = `auth-token=${authToken}`;

      // Check if rememberUser is true to set a cookie for 7 days
      if (rememberUser) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // 7 days from now
        document.cookie = `auth-token=${authToken}; expires=${expirationDate.toUTCString()}`;
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
