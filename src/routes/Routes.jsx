import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../Dashboard/page/Home/Home";
import MasterReport from "../Dashboard/page/MasterReport/MasterReport";
import AmberAlerts from "../Dashboard/page/AmberAlerts/AmberAlerts";
import Users from "../Dashboard/page/Admin/Users/Users";
import Roles from "../Dashboard/page/Admin/Roles/Roles";
import RowSettings from "../Dashboard/page/Admin/RowSettings/RowSettings";
import Login from "@/Login/Login";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Profile from "@/Dashboard/page/Profile/Profile";
import AddClinic from "@/Dashboard/page/Admin/AddClinic/AddClinic";
import AddUrl from "@/Dashboard/page/Admin/AddUrl/AddUrl";
import MasterDashboard from "@/Dashboard/page/MasterDashboard/MasterDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Home></Home> },
      {
        path: "master-report",
        element: <MasterReport></MasterReport>,
      },
      {
        path: "master-dashboard",
        element: <MasterDashboard></MasterDashboard>,
      },
      {
        path: "amber-alerts",
        element: <AmberAlerts></AmberAlerts>,
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users></Users>
          </AdminRoute>
        ),
      },
      {
        path: "roles",
        element: (
          <AdminRoute>
            <Roles></Roles>
          </AdminRoute>
        ),
      },
      {
        path: "row-level-settings",
        element: (
          <AdminRoute>
            <RowSettings></RowSettings>
          </AdminRoute>
        ),
      },
      {
        path: "add-clinic",
        element: (
          <AdminRoute>
            <AddClinic></AddClinic>
          </AdminRoute>
        ),
      },
      {
        path: "add-url",
        element: (
          <AdminRoute>
            <AddUrl></AddUrl>
          </AdminRoute>
        ),
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);
