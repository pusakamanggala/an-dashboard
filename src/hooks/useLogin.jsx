import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

async function login(data) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}dashboard/user/login`,
    data
  );
  return response.data;
}

export function useLogin(rememberUser) {
  const queryClient = useQueryClient();

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

      queryClient.setQueryData("user", data);
    },
  });

  return loginMutation;
}
