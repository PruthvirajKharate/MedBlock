import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', patients: 30 },
  { month: 'Feb', patients: 45 },
  { month: 'Mar', patients: 60 },
  { month: 'Apr', patients: 80 },
  { month: 'May', patients: 70 },
  { month: 'Jun', patients: 100 },
  { month: 'Jul', patients: 120 },
];

const PatientGrowthChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        
        {/* Define the Gradient inside JSX */}
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A90E2" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#4A90E2" stopOpacity={0.2} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* Apply the Gradient to the Line */}
        <Line
          type="monotone"
          dataKey="patients"
          stroke="url(#colorGradient)"
          strokeWidth={3}
          dot={{ fill: "#4A90E2", r: 5 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PatientGrowthChart;
