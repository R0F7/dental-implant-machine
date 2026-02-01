import PermissionGroup from "@/component/UserCreateDrawer/RolesAndPermissions/PermissionGroup/PermissionGroup";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import React from "react";

const CreateRoleDrawer = ({ form }) => {
  const { values, setFieldValue } = form;
  const permissions = values.permissions || {};

  const handleSelectAll = (checked) => {
    const basePermissions = {
      selectAll: checked,
      dashboard: checked,
      dashboardSubs: {
        leadsOverTime: checked,
        goalAchievement: checked,
        masterReportOverview: checked,
      },
      // amberAlerts: checked,
      // masterReport: checked,
      KPIsReport: checked,
      QCReport: checked,
    };
    setFieldValue("permissions", basePermissions);
  };

  const handlePermission = (name, checked) => {
    setFieldValue(`permissions.${name}`, checked);
  };

  return (
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

        {/* Amber Alerts */}
        {/* <label className="h-[54px] text-[#111827] text-sm font-semibold flex items-center gap-2 border rounded-md shadow p-4">
          <Checkbox
            checked={permissions.amberAlerts}
            onCheckedChange={(val) => handlePermission("amberAlerts", val)}
          />
          Amber Alerts
        </label> */}

        {/* Master Report */}
        {/* <label className="text-[#111827] text-sm font-semibold flex items-center gap-2 border rounded-md shadow p-4">
          <Checkbox
            checked={permissions.masterReport}
            onCheckedChange={(val) => handlePermission("masterReport", val)}
          />
          Master Report
        </label> */}

        {/* KPIs Report */}
        <label className="text-[#111827] text-sm font-semibold flex items-center gap-2 border rounded-md shadow p-4">
          <Checkbox
            checked={permissions.KPIsReport}
            onCheckedChange={(val) => handlePermission("KPIsReport", val)}
          />
          KPIs Report
        </label>

        {/* QC Report */}
        <label className="text-[#111827] text-sm font-semibold flex items-center gap-2 border rounded-md shadow p-4">
          <Checkbox
            checked={permissions.QCReport}
            onCheckedChange={(val) => handlePermission("QCReport", val)}
          />
          QC Report 
        </label>
      </div>
    </div>
  );
};

export default CreateRoleDrawer;
