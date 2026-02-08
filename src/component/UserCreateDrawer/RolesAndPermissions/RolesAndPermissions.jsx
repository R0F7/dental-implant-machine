import CustomSelect from "@/component/CustomSelect/CustomSelect";
import Notice from "@/component/Notice/Notice";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { PiAsterisk } from "react-icons/pi";
import PermissionGroup from "./PermissionGroup/PermissionGroup";
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
      },
      admin: isAdmin ? checked : false,
      adminSubs: isAdmin
        ? { users: checked, roles: checked, rowLevelSettings: checked }
        : { users: false, roles: false, rowLevelSettings: false },
      KPIsReport: checked,
      QCReport: checked,
      CDRReport: checked,
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
      },
      admin: false,
      adminSubs: { users: false, roles: false, rowLevelSettings: false },
      KPIsReport: false,
      QCReport: false,
      CDRReport: false,
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
              // "masterReportOverview",
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

          {/* KPIsReport */}
          <label className="text-[#111827] text-sm font-semibold flex items-center gap-2 border rounded-md shadow p-4">
            <Checkbox
              checked={permissions.KPIsReport}
              onCheckedChange={(val) => handlePermission("KPIsReport", val)}
            />
            KPIs Report
          </label>

          {/* QCReport */}
          <label className="text-[#111827] text-sm font-semibold flex items-center gap-2 border rounded-md shadow p-4">
            <Checkbox
              checked={permissions.QCReport}
              onCheckedChange={(val) => handlePermission("QCReport", val)}
            />
            QC Report
          </label>

          {/* CDRReport */}
          <label className="text-[#111827] text-sm font-semibold flex items-center gap-2 border rounded-md shadow p-4">
            <Checkbox
              checked={permissions.CDRReport}
              onCheckedChange={(val) => handlePermission("CDRReport", val)}
            />
            CDR Report
          </label>
        </div>
      </div>

      <div className="mt-7">
        {!permissions.selectAll &&
          !permissions.admin &&
          !permissions.KPIsReport &&
          !permissions.QCReport && 
          !permissions.CDRReport && (
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
