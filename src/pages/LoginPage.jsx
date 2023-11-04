import LoginSideBackground from "../img/sec-graphic.svg";
import HomeIcon from "../icons/home.svg";
import ANLogo from "../img/an-logo.svg";
import { useRef, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import useNotification from "../hooks/useNotification";

const LoginPage = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [rememberUser, setRememberUser] = useState(false);

  const loginMutation = useLogin(rememberUser);
  const { notifyWarning } = useNotification();

  const handleLogin = (event) => {
    event.preventDefault();

    if (!usernameRef.current.value || !passwordRef.current.value) {
      notifyWarning("Enter username and password");
      return;
    }

    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    loginMutation.mutate(data);
  };

  return (
    <main className="h-[100dvh] flex">
      <section className="md:w-2/3 w-full flex justify-center items-center">
        <img src={HomeIcon} alt="Home Icon" className="absolute top-5 left-5" />
        <div className="flex flex-col justify-center items-center">
          <div className="mb-10 flex items-center flex-col gap-2">
            <img
              src={ANLogo}
              alt="Adaptive Network Laboratory Logo"
              className="md:h-36 md:w-36 w-28 h-28"
            />
            {!loginMutation.isSuccess && (
              <h1 className="font-medium md:text-2xl text-xl text-center text-sky-700">
                Log in to your account
              </h1>
            )}
          </div>
          {loginMutation.isSuccess && (
            <h1 className="font-medium md:text-2xl text-xl text-center text-sky-700 uppercase">
              welcome {loginMutation.data.data.username}
            </h1>
          )}
          {!loginMutation.isSuccess && (
            <form
              className="flex flex-col md:w-96 w-72 mt-5"
              onSubmit={loginMutation.isLoading ? null : handleLogin}
            >
              <label htmlFor="username" className="mb-1">
                Username
              </label>
              <input
                ref={usernameRef}
                type="text"
                id="username"
                autoComplete="username"
                className="border-2 p-2 rounded-lg mb-3 focus:border-sky-700 focus:outline-none"
                placeholder="username"
                disabled={loginMutation.isLoading}
              />
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                autoComplete="current-password"
                className="border-2 p-2 rounded-lg mb-2 focus:border-sky-700 focus:outline-none"
                placeholder="password"
                disabled={loginMutation.isLoading}
              />
              <div className="flex items-center gap-2 mb-10">
                <input
                  type="checkbox"
                  id="remember_me"
                  onChange={(e) => setRememberUser(e.target.checked)}
                  value={rememberUser}
                  disabled={loginMutation.isLoading}
                />
                <label className="text-sm" htmlFor="remember_me">
                  Remember me
                </label>
              </div>
              <button
                className={`${
                  loginMutation.isLoading ? "bg-sky-500" : "bg-sky-700"
                } px-7 py-2 rounded-lg w-fit self-end text-white`}
                type="submit"
                disabled={loginMutation.isLoading}
              >
                Login
              </button>
            </form>
          )}
        </div>
      </section>
      <aside className="w-1/3 hidden md:block">
        <img
          src={LoginSideBackground}
          alt="Side Background"
          className="object-cover h-full w-full object-top"
        />
      </aside>
    </main>
  );
};

export default LoginPage;
