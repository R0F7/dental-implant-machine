import React from "react";
import { useLocation } from "react-router-dom";
import KPIsReportTable from "../KPIsReportTable/KPIsReportTable";

const KPIsReportTableFull = () => {
  const { state } = useLocation();
  const rows = state?.rows || [];

  return (
    <div>
      <KPIsReportTable data={rows} />
    </div>
  );
};

export default KPIsReportTableFull;
