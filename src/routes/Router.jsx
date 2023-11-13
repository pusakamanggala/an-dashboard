import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { lazy, useContext } from "react";

// lazy load
const LoginPage = lazy(() => import("../pages/LoginPage"));
const DashboardLayout = lazy(() => import("../layout/DashboardLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Deployment = lazy(() => import("../pages/Deployment"));
const Images = lazy(() => import("../pages/Images"));
const AddonsService = lazy(() => import("../pages/AddonsService"));
const Members = lazy(() => import("../pages/Members"));
const Services = lazy(() => import("../pages/Services"));
const ProjectConfig = lazy(() => import("../pages/ProjectConfig"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

const Router = () => {
  const { userRole } = useContext(UserContext);

  const role = ["viewer", "praktikum", "asisten", "admin"];

  const getToken = () => {
    const authTokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth-token"));

    if (authTokenCookie) {
      return authTokenCookie.split("=")[1];
    } else {
      return false;
    }
  };

  const isLogin = getToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLogin ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        {isLogin && role.includes(userRole) && (
          <>
            <Route
              path="/dashboard"
              element={
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/deploy"
              element={
                <DashboardLayout>
                  <Deployment />
                </DashboardLayout>
              }
            />
            <Route
              path="/images"
              element={
                <DashboardLayout>
                  <Images />
                </DashboardLayout>
              }
            />
            <Route
              path="/addons"
              element={
                <DashboardLayout>
                  <AddonsService />
                </DashboardLayout>
              }
            />
            <Route
              path="/service"
              element={
                <DashboardLayout>
                  <Services />
                </DashboardLayout>
              }
            />
            <Route
              path="/project-config"
              element={
                <DashboardLayout>
                  <ProjectConfig />
                </DashboardLayout>
              }
            />
          </>
        )}
        {isLogin && userRole === "admin" && (
          <Route
            path="/members"
            element={
              <DashboardLayout>
                <Members />
              </DashboardLayout>
            }
          />
        )}
        <Route
          path="*"
          element={isLogin ? <PageNotFound /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
