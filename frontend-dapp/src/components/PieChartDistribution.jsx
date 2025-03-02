import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Patients Treated", value: 400 },
  { name: "Insurance Claims", value: 150 },
  { name: "Fund-Me Campaigns", value: 80 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const PieChartDistribution = () => {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h2>Hospital Data Distribution</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={130}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartDistribution;
