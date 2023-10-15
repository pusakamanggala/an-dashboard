export const getToken = () => {
  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth-token="));

  if (tokenCookie) {
    return tokenCookie.split("=")[1];
  } else {
    // Handle the case when the token cookie is not present.
    return null; // You can return null or any other suitable value.
  }
};
