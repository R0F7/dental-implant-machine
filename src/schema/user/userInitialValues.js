export const userInitialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  date_of_birth: null,
  status: true,

  address_line_1: "",
  address_line_2: "",
  city: "",
  province: "",
  postal_code: "",

  role: "",

  permissions: {
    selectAll: false,
    dashboard: false,
    dashboardSubs: {
      leadsOverTime: false,
      goalAchievement: false,
      masterReportOverview: false,
    },
    admin: false,
    adminSubs: { users: false, roles: false, rowLevelSettings: false },
    // amberAlerts: false,
    // masterReport: false,
    KPIsReport:false,
    QCReport:false,
  },
  selectedClients: [],
};
