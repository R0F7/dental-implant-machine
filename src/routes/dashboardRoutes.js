import { AiOutlineDashboard } from "react-icons/ai";
import { CiBellOn, CiSettings } from "react-icons/ci";
import { FaRegFileAlt } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaUser } from "react-icons/lia";
import { LuLayoutDashboard, LuShieldCheck } from "react-icons/lu";
import { RiFileSettingsLine } from "react-icons/ri";
import { BiClinic } from "react-icons/bi";
import { MdOutlineAddLink } from "react-icons/md";

export const dashboardRoutes = [
  {
    label: "Dashboard",
    icon: AiOutlineDashboard,
    path: "/",
  },
  {
    label: "Master Report",
    icon: FaRegFileAlt,
    path: "master-report",
  },
  {
    label: "Master Dashboard",
    icon: LuLayoutDashboard,
    path: "master-dashboard",
  },
  // {
  //   label: "Amber Alerts",
  //   icon: GoBell,
  //   path: "amber-alerts",
  // },
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
      {
        label: "Add url",
        icon: MdOutlineAddLink,
        path: "add-url",
      },
    ],
  },
];
