const PageNotFound = () => {
  return (
    <main className="h-screen bg-sky-950 text-white flex flex-col gap-2 justify-center items-center">
      <h1 className="text-7xl md:text-8xl">404</h1>
      <h1 className="font-bold text-2xl md:text-3xl">Page Not Found</h1>
      <p className="w-11/12 md:w-96 text-center">
        The page you are looking for doesn&apos;t exist, or another error
        occurred. Go to{" "}
        <a href="/dashboard" className="underline">
          Dashboard
        </a>
      </p>
    </main>
  );
};

export default PageNotFound;
