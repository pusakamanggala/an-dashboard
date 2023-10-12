import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Deployment from "../pages/Deployment";
import Images from "../pages/Images";
import AddonsService from "../pages/AddonsService";
import Members from "../pages/Members";
import Services from "../pages/Services";

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
        <Route
          path="/members"
          element={
            <DashboardLayout>
              <Members />
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
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
