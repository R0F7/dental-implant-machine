import { GoTable } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaUser } from "react-icons/lia";
import { LuShieldCheck } from "react-icons/lu";
import { RiFileSettingsLine, RiTableLine } from "react-icons/ri";
import { BiClinic } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";

export const dashboardRoutes = [
  {
    label: "KPIs Report",
    icon: TbReportAnalytics,
    path: "/",
  },
  {
    label:"QC Report",
    icon:RiTableLine,
    path:"QC-report",
  },
  {
    label:"CDR Report",
    icon:GoTable,
    path:"CDR-report",
  },
  {
    label: "Admin",
    icon: IoSettingsOutline,
    path: "admin",
    children: [
      {
        label: "Users",
        icon: LiaUser,
        path: "users",
      },
      {
        label: "Roles",
        icon: LuShieldCheck,
        path: "roles",
      },
      {
        label: "Row Level Settings",
        icon: RiFileSettingsLine,
        path: "row-level-settings",
      },
      {
        label: "Add clinic",
        icon: BiClinic,
        path: "add-clinic",
      },
    ],
  },
];
