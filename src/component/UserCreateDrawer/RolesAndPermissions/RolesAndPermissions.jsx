// import CustomSelect from "@/component/CustomSelect/CustomSelect";
// import Notice from "@/component/Notice/Notice";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Switch } from "@/components/ui/switch";
// import { useState, useEffect } from "react";
// import { PiAsterisk } from "react-icons/pi";
// import PermissionGroup from "./PermissionGroup/PermissionGroup";
// import { rolePermissions } from "./rolePermissions";

// const RolesAndPermissions = ({ form }) => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [permissions, setPermissions] = useState({
//     selectAll: false,
//     dashboard: false,
//     dashboardSubs: {
//       leadsOverTime: false,
//       goalAchievement: false,
//       masterReportOverview: false,
//     },
//     admin: false,
//     adminSubs: {
//       users: false,
//       roles: false,
//       rowLevelSettings: false,
//     },
//     amberAlerts: false,
//     masterReport: false,
//   });

//   const role = [
//     "Manager",
//     "Customer",
//     "Employee",
//     "Growth Specialist",
//     "Department Manager",
//     "Admin",
//   ];

//   const handleSelectAll = (checked) => {
//     const basePermissions = {
//       selectAll: checked,
//       dashboard: checked,
//       dashboardSubs: {
//         leadsOverTime: checked,
//         goalAchievement: checked,
//         masterReportOverview: checked,
//       },
//       admin: false,
//       adminSubs: { users: false, roles: false, rowLevelSettings: false },
//       amberAlerts: checked,
//       masterReport: checked,
//     };

//     if (isAdmin) {
//       basePermissions.admin = checked;
//       basePermissions.adminSubs = {
//         users: checked,
//         roles: checked,
//         rowLevelSettings: checked,
//       };
//     }

//     setPermissions(basePermissions);
//   };

//   const handlePermission = (name, checked) => {
//     setPermissions((prev) => ({
//       ...prev,
//       [name]: checked,
//     }));
//   };

//   useEffect(() => {
//     let allChecked = false;

//     if (isAdmin) {
//       allChecked =
//         permissions.dashboard &&
//         Object.values(permissions.dashboardSubs).every(Boolean) &&
//         permissions.admin &&
//         Object.values(permissions.adminSubs).every(Boolean) &&
//         permissions.amberAlerts &&
//         permissions.masterReport;
//     } else {
//       allChecked =
//         permissions.dashboard &&
//         Object.values(permissions.dashboardSubs).every(Boolean) &&
//         permissions.amberAlerts &&
//         permissions.masterReport;
//     }

//     if (permissions.selectAll !== allChecked) {
//       setPermissions((prev) => ({
//         ...prev,
//         selectAll: allChecked,
//       }));
//     }
//   }, [
//     permissions.dashboard,
//     permissions.dashboardSubs,
//     permissions.amberAlerts,
//     permissions.masterReport,
//     permissions.selectAll,
//     permissions.admin,
//     permissions.adminSubs,
//     isAdmin,
//   ]);

//   const handleRoleChange = (selectedRole) => {
//     if (selectedRole === "Admin") {
//       setIsAdmin(true);
//     } else {
//       setIsAdmin(false);
//     }

//     const basePermissions = {
//       selectAll: false,
//       dashboard: false,
//       dashboardSubs: {
//         leadsOverTime: false,
//         goalAchievement: false,
//         masterReportOverview: false,
//       },
//       admin: false,
//       adminSubs: { users: false, roles: false, rowLevelSettings: false },
//       amberAlerts: false,
//       masterReport: false,
//     };

//     const updatedPermissions = {
//       ...basePermissions,
//       ...rolePermissions[selectedRole],
//     };

//     setPermissions(updatedPermissions);
//   };

//   return (
//     <div>
//       {/* Role Assign */}
//       <div className="bg-[#FAFAFA] p-4 border rounded-md">
//         <label htmlFor="role" className="label-inline pb-1.5">
//           <span className="text-red-500">
//             <PiAsterisk size={10} />
//           </span>
//           Assign Role
//         </label>

//         <CustomSelect
//           id={"role"}
//           placeholder={"Select a role for this user"}
//           data={role}
//           form={form}
//           setPermissions={setPermissions}
//           handleRoleChange={handleRoleChange}
//         ></CustomSelect>

//         <div className="mt-5">
//           <Notice>
//             Only one role can be assigned per user. Additional permissions can
//             be assigned below.
//           </Notice>
//         </div>
//       </div>

//       {/* Permissions */}
//       <div className="mt-7">
//         <div className="flex items-center justify-between mb-5">
//           <div>
//             <h4 className="text-[#111827] text-lg font-medium">Permissions</h4>
//             <p className="text-sm text-[#4B5563]">
//               Role permissions are automatically pre-selected. You can modify
//               these or add additional permissions as needed.
//             </p>
//           </div>

//           <div className="flex items-center gap-2 text-black/80">
//             <label htmlFor="permissions" className="text-sm">
//               Select All Permissions
//             </label>
//             <Switch
//               id="permissions"
//               checked={permissions.selectAll}
//               onCheckedChange={handleSelectAll}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 items-start">
//           {/* Dashboard dropdown */}
//           <PermissionGroup
//             title="dashboard"
//             permissions={permissions}
//             onPermissionChange={(updated) =>
//               setPermissions((prev) => ({ ...prev, ...updated }))
//             }
//             subPermissions={[
//               "leadsOverTime",
//               "goalAchievement",
//               "masterReportOverview",
//             ]}
//           />

//           {/* Admin dropdown */}
//           {isAdmin && (
//             <PermissionGroup
//               title="admin"
//               permissions={permissions}
//               onPermissionChange={(updated) =>
//                 setPermissions((prev) => ({ ...prev, ...updated }))
//               }
//               subPermissions={["users", "roles", "rowLevelSettings"]}
//             />
//           )}

//           {/* Amber Alerts */}
//           <label className="h-[54px] text-[#111827] text-sm font-semibold flex items-center gap-2 border rounded-md shadow p-4">
//             <Checkbox
//               checked={permissions.amberAlerts}
//               onCheckedChange={(val) => handlePermission("amberAlerts", val)}
//             />
//             Amber Alerts
//           </label>

//           {/* Master Report */}
//           <label className="text-[#111827] text-sm font-semibold flex items-center gap-2 border rounded-md shadow p-4">
//             <Checkbox
//               checked={permissions.masterReport}
//               onCheckedChange={(val) => handlePermission("masterReport", val)}
//             />
//             Master Report
//           </label>
//         </div>
//       </div>

//       <div className="mt-7">
//         <Notice bg={"#FEFCE8"} type={"Warning"} color={"#854D0E"}>
//           No permissions are currently selected. At least one permission must be
//           assigned to create/update the user.
//         </Notice>
//       </div>
//     </div>
//   );
// };

// export default RolesAndPermissions;

// import CustomSelect from "@/component/CustomSelect/CustomSelect";
// import Notice from "@/component/Notice/Notice";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Switch } from "@/components/ui/switch";
// import { useState, useEffect } from "react";
// import { PiAsterisk } from "react-icons/pi";
// import PermissionGroup from "./PermissionGroup/PermissionGroup";
// import { rolePermissions } from "./rolePermissions";

// const RolesAndPermissions = ({ form }) => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [permissions, setPermissions] = useState({
//     selectAll: false,
//     dashboard: false,
//     dashboardSubs: {
//       leadsOverTime: false,
//       goalAchievement: false,
//       masterReportOverview: false,
//     },
//     admin: false,
//     adminSubs: {
//       users: false,
//       roles: false,
//       rowLevelSettings: false,
//     },
//     amberAlerts: false,
//     masterReport: false,
//   });

//   const roleOptions = [
//     "Manager",
//     "Customer",
//     "Employee",
//     "Growth Specialist",
//     "Department Manager",
//     "Admin",
//   ];

//   // ===== Sync Formik on permission update =====
//   const updatePermissions = (updated) => {
//     setPermissions(updated);
//     form.setFieldValue("permissions", updated);
//   };

//   const handleSelectAll = (checked) => {
//     const basePermissions = {
//       selectAll: checked,
//       dashboard: checked,
//       dashboardSubs: {
//         leadsOverTime: checked,
//         goalAchievement: checked,
//         masterReportOverview: checked,
//       },
//       admin: isAdmin ? checked : false,
//       adminSubs: isAdmin
//         ? { users: checked, roles: checked, rowLevelSettings: checked }
//         : { users: false, roles: false, rowLevelSettings: false },
//       amberAlerts: checked,
//       masterReport: checked,
//     };
//     updatePermissions(basePermissions);
//   };

//   const handlePermission = (name, checked) => {
//     const updated = { ...permissions, [name]: checked };
//     updatePermissions(updated);
//   };

//   const handleSubPermission = (group, name, checked) => {
//     const updated = {
//       ...permissions,
//       [group]: {
//         ...permissions[group],
//         [name]: checked,
//       },
//     };
//     updatePermissions(updated);
//   };

//   useEffect(() => {
//     // Auto-check selectAll based on other permissions
//     let allChecked = false;
//     if (isAdmin) {
//       allChecked =
//         permissions.dashboard &&
//         Object.values(permissions.dashboardSubs).every(Boolean) &&
//         permissions.admin &&
//         Object.values(permissions.adminSubs).every(Boolean) &&
//         permissions.amberAlerts &&
//         permissions.masterReport;
//     } else {
//       allChecked =
//         permissions.dashboard &&
//         Object.values(permissions.dashboardSubs).every(Boolean) &&
//         permissions.amberAlerts &&
//         permissions.masterReport;
//     }

//     if (permissions.selectAll !== allChecked) {
//       updatePermissions({ ...permissions, selectAll: allChecked });
//     }
//   }, [
//     permissions.dashboard,
//     permissions.dashboardSubs,
//     permissions.amberAlerts,
//     permissions.masterReport,
//     permissions.admin,
//     permissions.adminSubs,
//     isAdmin,
//   ]);

//   const handleRoleChange = (selectedRole) => {
//     const adminRole = selectedRole === "Admin";
//     setIsAdmin(adminRole);

//     const basePermissions = {
//       selectAll: false,
//       dashboard: false,
//       dashboardSubs: {
//         leadsOverTime: false,
//         goalAchievement: false,
//         masterReportOverview: false,
//       },
//       admin: false,
//       adminSubs: { users: false, roles: false, rowLevelSettings: false },
//       amberAlerts: false,
//       masterReport: false,
//     };

//     const updatedPermissions = {
//       ...basePermissions,
//       ...rolePermissions[selectedRole],
//     };
//     updatePermissions(updatedPermissions);
//   };

//   return (
//     <div>
//       {/* Role Assign */}
//       <div className="bg-[#FAFAFA] p-4 border rounded-md">
//         <label htmlFor="role" className="label-inline pb-1.5">
//           <span className="text-red-500">
//             <PiAsterisk size={10} />
//           </span>
//           Assign Role
//         </label>

//         <CustomSelect
//           id="role"
//           placeholder="Select a role for this user"
//           data={roleOptions}
//           form={form}
//           setPermissions={setPermissions}
//           handleRoleChange={handleRoleChange}
//         />

//         <div className="mt-5">
//           <Notice>
//             Only one role can be assigned per user. Additional permissions can
//             be assigned below.
//           </Notice>
//         </div>
//       </div>

//       {/* Permissions */}
//       <div className="mt-7">
//         <div className="flex items-center justify-between mb-5">
//           <div>
//             <h4 className="text-[#111827] text-lg font-medium">Permissions</h4>
//             <p className="text-sm text-[#4B5563]">
//               Role permissions are automatically pre-selected. You can modify
//               these or add additional permissions as needed.
//             </p>
//           </div>

//           <div className="flex items-center gap-2 text-black/80">
//             <label htmlFor="permissions" className="text-sm">
//               Select All Permissions
//             </label>
//             <Switch
//               id="permissions"
//               checked={permissions.selectAll}
//               onCheckedChange={handleSelectAll}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 items-start">
//           {/* Dashboard dropdown */}
//           <PermissionGroup
//             title="dashboard"
//             permissions={permissions}
//             onPermissionChange={handleSubPermission}
//             subPermissions={[
//               "leadsOverTime",
//               "goalAchievement",
//               "masterReportOverview",
//             ]}
//           />

//           {/* Admin dropdown */}
//           {isAdmin && (
//             <PermissionGroup
//               title="admin"
//               permissions={permissions}
//               onPermissionChange={handleSubPermission}
//               subPermissions={["users", "roles", "rowLevelSettings"]}
//             />
//           )}

//           {/* Amber Alerts */}
//           <label className="h-[54px] text-[#111827] text-sm font-semibold flex items-center gap-2 border rounded-md shadow p-4">
//             <Checkbox
//               checked={permissions.amberAlerts}
//               onCheckedChange={(val) => handlePermission("amberAlerts", val)}
//             />
//             Amber Alerts
//           </label>

//           {/* Master Report */}
//           <label className="text-[#111827] text-sm font-semibold flex items-center gap-2 border rounded-md shadow p-4">
//             <Checkbox
//               checked={permissions.masterReport}
//               onCheckedChange={(val) => handlePermission("masterReport", val)}
//             />
//             Master Report
//           </label>
//         </div>
//       </div>

//       <div className="mt-7">
//         <Notice bg="#FEFCE8" type="Warning" color="#854D0E">
//           No permissions are currently selected. At least one permission must be
//           assigned to create/update the user.
//         </Notice>
//       </div>
//     </div>
//   );
// };

// export default RolesAndPermissions;

import CustomSelect from "@/component/CustomSelect/CustomSelect";
import Notice from "@/component/Notice/Notice";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { PiAsterisk } from "react-icons/pi";
import PermissionGroup from "./PermissionGroup/PermissionGroup";
// import { rolePermissions } from "./rolePermissions";
import useGetSecureData from "@/hooks/useGetSecureData";

const RolesAndPermissions = ({ form }) => {
  const { values, setFieldValue } = form;
  const permissions = values.permissions || {};
  const isAdmin = values.role === "Admin";

  // const role = [
  //   "Manager",
  //   "Customer",
  //   "Employee",
  //   "Growth Specialist",
  //   "Department Manager",
  //   "Admin",
  // ];

  const { data: role_info } = useGetSecureData("role_info", "/roles");

  const rolePermissions = {};
  const role = role_info.map((role) => {
    rolePermissions[role.name] = role.permissions;
    return role.name;
  });
  // console.log(rolePermissions);

  const handleSelectAll = (checked) => {
    const basePermissions = {
      selectAll: checked,
      dashboard: checked,
      dashboardSubs: {
        leadsOverTime: checked,
        goalAchievement: checked,
        masterReportOverview: checked,
      },
      admin: isAdmin ? checked : false,
      adminSubs: isAdmin
        ? { users: checked, roles: checked, rowLevelSettings: checked }
        : { users: false, roles: false, rowLevelSettings: false },
      amberAlerts: checked,
      masterReport: checked,
      masterDashboard: checked,
    };
    setFieldValue("permissions", basePermissions);
  };

  const handlePermission = (name, checked) => {
    setFieldValue(`permissions.${name}`, checked);
  };

  const handleRoleChange = (selectedRole) => {
    setFieldValue("role", selectedRole);

    const basePermissions = {
      selectAll: false,
      dashboard: false,
      dashboardSubs: {
        leadsOverTime: false,
        goalAchievement: false,
        masterReportOverview: false,
      },
      admin: false,
      adminSubs: { users: false, roles: false, rowLevelSettings: false },
      amberAlerts: false,
      masterReport: false,
      masterDashboard: false,
    };

    const updatedPermissions = {
      ...basePermissions,
      ...rolePermissions[selectedRole],
    };

    setFieldValue("permissions", updatedPermissions);
  };

  return (
    <div>
      {/* Role Assign */}
      <div className="bg-[#FAFAFA] p-4 border rounded-md h-fit">
        <label htmlFor="role" className="label-inline pb-1.5">
          <span className="text-red-500">
            <PiAsterisk size={10} />
          </span>
          Assign Role
        </label>

        <CustomSelect
          id={"role"}
          placeholder={"Select a role for this user"}
          data={role}
          form={form}
          handleRoleChange={handleRoleChange}
        />

        <div className="mt-5">
          <Notice>
            Only one role can be assigned per user. Additional permissions can
            be assigned below.
          </Notice>
        </div>
      </div>

      {/* Permissions */}
      <div className="mt-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-[#111827] text-lg font-medium">Permissions</h4>
            <p className="text-sm text-[#4B5563]">
              Role permissions are automatically pre-selected. You can modify
              these or add additional permissions as needed.
            </p>
          </div>

          <div className="flex items-center gap-2 text-black/80">
            <label htmlFor="permissions" className="text-sm">
              Select All Permissions
            </label>
            <Switch
              id="permissions"
              checked={permissions.selectAll}
              onCheckedChange={handleSelectAll}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 items-start">
          {/* Dashboard dropdown */}
          <PermissionGroup
            title="dashboard"
            permissions={permissions}
            onPermissionChange={(updated) =>
              setFieldValue("permissions", { ...permissions, ...updated })
            }
            subPermissions={[
              "leadsOverTime",
              "goalAchievement",
              "masterReportOverview",
            ]}
          />

          {/* Admin dropdown */}
          {isAdmin && (
            <PermissionGroup
              title="admin"
              permissions={permissions}
              onPermissionChange={(updated) =>
                setFieldValue("permissions", { ...permissions, ...updated })
              }
              subPermissions={["users", "roles", "rowLevelSettings"]}
            />
          )}

          {/* Amber Alerts */}
          <label className="h-[54px] text-[#111827] text-sm font-semibold flex items-center gap-2 border rounded-md shadow p-4">
            <Checkbox
              checked={permissions.amberAlerts}
              onCheckedChange={(val) => handlePermission("amberAlerts", val)}
            />
            Amber Alerts
          </label>

          {/* Master Report */}
          <label className="text-[#111827] text-sm font-semibold flex items-center gap-2 border rounded-md shadow p-4">
            <Checkbox
              checked={permissions.masterReport}
              onCheckedChange={(val) => handlePermission("masterReport", val)}
            />
            Master Report
          </label>

          {/* Master Dashboard */}
          <label className="text-[#111827] text-sm font-semibold flex items-center gap-2 border rounded-md shadow p-4">
            <Checkbox
              checked={permissions.masterDashboard}
              onCheckedChange={(val) => handlePermission("masterDashboard", val)}
            />
            Master Dashboard
          </label>
        </div>
      </div>

      <div className="mt-7">
        {!permissions.selectAll &&
          !permissions.dashboard &&
          !permissions.admin &&
          !permissions.amberAlerts &&
          !permissions.masterReport && (
            <Notice bg={"#FEFCE8"} type={"Warning"} color={"#854D0E"}>
              No permissions are currently selected. At least one permission
              must be assigned to create/update the user.
            </Notice>
          )}
      </div>
    </div>
  );
};

export default RolesAndPermissions;
