import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

async function login(data) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/v1/dashboard/user/login`,
    data
  );
  return response.data;
}

export function useLogin() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      const authToken = data.data.token;
      document.cookie = `auth-token=${authToken}`;
      queryClient.setQueryData("user", data);
      // window.location.reload();
    },
  });

  return loginMutation;
}
