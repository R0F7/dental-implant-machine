# Dental Implant
 This project is a role-based admin dashboard designed to manage users, clinics, and performance data efficiently. 
It provides secure authentication, detailed reports, and interactive analytics for better decision-making.

## Key Features

- Authentication & Authorization with role-based access control
- User and Role Management (create, update, assign roles)
- Clinic Management with clinic-based data filtering
- KPI, CDR, and QC Reports with analytics dashboard
- Interactive charts for data visualization (Line & Scatter charts)
- Performance metrics calculation (first response time, lead distribution)
- Reusable and customizable UI components
- Responsive dashboard layout with sidebar and header navigation
- Secure API integration using centralized Axios configuration
- Schema-based form validation and reusable utility functions


## 📂 Project Structure
```
project/
│
├─ public/
│
├─ src/
│  │
│  ├─ assets/
│  │
│  ├─ component/
│  │  ├─ CalendarRange/
│  │  ├─ ClientSelector/
│  │  ├─ CustomCheckbox/
│  │  ├─ CustomSelect/
│  │  ├─ Drawer/
│  │  ├─ GoalAchieve/
│  │  ├─ HeaderClientSelector/
│  │  ├─ Input/
│  │  ├─ KPI/
│  │  ├─ LineChart/
│  │  ├─ Notice/
│  │  ├─ PageLocation/
│  │  ├─ ProgressRow/
│  │  ├─ ScatterChart/
│  │  ├─ SingleSelectDropdown/
│  │  ├─ Table/
│  │  ├─ TableHeader/
│  │  ├─ Textarea/
│  │  ├─ UserCreateDrawer/
│  │
|  ├─ components/ui/
│  │  ├─ CalendarID/
│  │  ├─ button.jsx
│  │  ├─ calendar.jsx
│  │  ├─ checkbox.jsx
│  │  ├─ input.jsx
│  │  ├─ select.jsx
│  │  ├─ switch.jsx
│  │  └─ PipelineFieldArray.jsx
│  │
│  ├─ context/
│  │  └─ AuthContext.js
│  │
│  ├─ Dashboard/
│  │  ├─ Header/
│  │  ├─ Sidebar/
│  │  ├─ menuItem/
│  │  └─ page/
│  │     ├─ Admin/
│  │     │  ├─ AddClinic/
│  │     │  ├─ Roles/
│  │     │  ├─ RowSettings/
│  │     │  └─ Users/
│  │     │
│  │     ├─ CDRReport/
│  │     ├─ KPIsReport/
│  │     ├─ KPIsReportTableFull/
│  │     ├─ QCReport/
│  │     ├─ Loading/
│  │     └─ Profile/
│  │        ├─ ChangePassword/
│  │        ├─ UserDetails/
│  │        └─ Profile.jsx
│  │
│  ├─ data/
│  │  └─ state.js
│  │
│  ├─ firebase/
│  │
│  ├─ hooks/
│  │  ├─ useAllClinics.jsx
│  │  ├─ useAuth.jsx
│  │  ├─ useAxiosCommon.jsx
│  │  ├─ useAxiosSecure.jsx
│  │  └─ useGetSecureData.jsx
│  │
│  ├─ layout/
│  │  └─ DashboardLayout.jsx
│  │
│  ├─ lib/
│  │  └─ utils.js
│  │
│  ├─ Login/
│  │
│  ├─ providers/
│  │  └─ AuthProvider.jsx
│  │
│  ├─ routes/
│  │  ├─ AdminRoute.jsx
│  │  ├─ PrivateRoute.jsx
│  │  ├─ Route.jsx
│  │  └─ dashboardRoutes.js
│  │
│  ├─ schema/
│  │  ├─ clinic/
│  │  ├─ login/
│  │  ├─ role/
│  │  └─ user/
│  │
│  ├─ utility/
│  │  ├─ calculateAvgFirstResponseTime.js
│  │  ├─ countLeadsByFirstResponseTimeRange.js
│  │  ├─ countLeadsFirstResponseBetween0To15Min.js
│  │  ├─ hoursToDayTime.js
│  │  └─ percentage.js
│  │
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css

```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/R0F7/dental-implant-machine.git
   cd dental-implant-machine

2. **Install root dependencies**
    ```bash
    npm install

3. **Start the development server:**
    ```bash
    npm run dev