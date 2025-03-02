import React from "react";
import Dashboard from "../Dashboard";
import PatientGrowthChart from "../PatientGrowthChart";
import PieChartDistribution from "../PieChartDistribution";

function Default_page() {
  return (
    <div>
      <Dashboard />
      <PatientGrowthChart />
      <PieChartDistribution />
    </div>
  );
}

export default Default_page;
