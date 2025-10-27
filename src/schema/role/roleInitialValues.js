export const roleInitialValues = {
  name: "",
  description: "",
  permissions: {
    selectAll: false,
    dashboard: false,
    dashboardSubs: {
      leadsOverTime: false,
      goalAchievement: false,
      masterReportOverview: false,
    },
    amberAlerts: false,
    masterReport: false,
  },
};
