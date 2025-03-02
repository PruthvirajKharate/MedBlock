import Card from "./Card";
import { FaUserMd, FaFileMedical, FaShieldAlt } from "react-icons/fa";
import "./Dashboard.css"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Card title="Doctors" count={120} icon={<FaUserMd />} />
      <Card title="Patients" count={430} icon={<FaFileMedical />} />
      <Card title="Insurance Claims" count={87} icon={<FaShieldAlt />} />
    </div>
  );
};

export default Dashboard;
