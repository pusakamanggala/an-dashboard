import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Deployment from "../pages/Deployment";
import Images from "../pages/Images";
import AddonsService from "../pages/AddonsService";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
