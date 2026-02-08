import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Users from "../Dashboard/page/Admin/Users/Users";
import Roles from "../Dashboard/page/Admin/Roles/Roles";
import RowSettings from "../Dashboard/page/Admin/RowSettings/RowSettings";
import Login from "@/Login/Login";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Profile from "@/Dashboard/page/Profile/Profile";
import AddClinic from "@/Dashboard/page/Admin/AddClinic/AddClinic";
import KPIsReport from "@/Dashboard/page/KPIsReport/KPIsReport";
import KPIsReportTableFull from "@/Dashboard/page/KPIsReportTableFull/KPIsReportTableFull";
import QCReport from "@/Dashboard/page/QCReport/QCReport";
import CDRReport from "@/Dashboard/page/CDRReport/CDRReport";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <KPIsReport></KPIsReport> },
      {
        path: "QC-report",
        element: <QCReport></QCReport>,
      },
      {
        path: "CDR-report",
        element: <CDRReport></CDRReport>,
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
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "KPIs-full-report",
        element: <KPIsReportTableFull></KPIsReportTableFull>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);
