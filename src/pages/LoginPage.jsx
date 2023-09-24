import LoginSideBackground from "../img/sec-graphic.svg";
import HomeIcon from "../icons/home.svg";
import ANLogo from "../img/an-logo.svg";

const LoginPage = () => {
  return (
    <main className="h-[100dvh] flex">
      <section className="md:w-2/3 w-full flex justify-center items-center">
        <img src={HomeIcon} alt="Home Icon" className="absolute top-5 left-5" />
        <div className="flex flex-col justify-center items-center space-y-10">
          <div>
            <img
              src={ANLogo}
              alt="Adaptive Network Laboratory Logo"
              className="md:h-36 md:w-36 w-28 h-28"
            />
            <h1 className="font-medium md:text-2xl text-xl text-center">
              Admin Login
            </h1>
          </div>
          <form className="flex flex-col md:w-96 w-72">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              className="border-2 p-2 rounded-lg mb-3 focus:border-sky-700 focus:outline-none"
              placeholder="john@email.com"
            />
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border-2 p-2 rounded-lg mb-10 focus:border-sky-700 focus:outline-none"
              placeholder="Enter your password"
            />
            <button
              className="bg-sky-700 px-7 py-2 rounded-lg w-fit self-end text-white"
              type="submit"
            >
              Login
            </button>
          </form>
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
