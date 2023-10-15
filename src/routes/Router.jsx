import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Deployment from "../pages/Deployment";
import Images from "../pages/Images";
import AddonsService from "../pages/AddonsService";
import Members from "../pages/Members";
import Services from "../pages/Services";
import ProjectConfig from "../pages/ProjectConfig";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import PageNotFound from "../pages/PageNotFound";

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
