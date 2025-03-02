import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Ensure this CSS file is linked

const Sidebar = ({ role }) => {
  const menuItems = {
    doctor: [
      { name: "Dashboard", path: "/admin", icon: "fas fa-home" },
      { name: "Patients", path: "/admin/patient", icon: "fas fa-user-injured" },
      {
        name: "Appointments",
        path: "/admin/doctor",
        icon: "fas fa-calendar-check",
      },
      { name: "Reports", path: "/nowhere", icon: "fas fa-file-medical" },
    ],
    admin: [
      { name: "Dashboard", path: "/admin", icon: "fas fa-home" },
      { name: "Patient", path: "/admin/patient", icon: "fas fa-users" },
      { name: "Doctors", path: "/admin/doctor", icon: "fas fa-user-md" },
      { name: "Logs", path: "/nowhere", icon: "fas fa-history" },
      { name: "Settings", path: "/nowhere", icon: "fas fa-cog" },
    ],
    patient: [
      { name: "Dashboard", path: "/patient/dashboard", icon: "fas fa-home" },
      {
        name: "Medical Records",
        path: "/patient/records",
        icon: "fas fa-notes-medical",
      },
      {
        name: "Appointments",
        path: "/patient/appointments",
        icon: "fas fa-calendar-check",
      },
      { name: "Profile", path: "/patient/profile", icon: "fas fa-user" },
    ],
  };

  return (
    <div className="sidebar">
      <div className="logo">LOGO</div>
      <ul>
        {menuItems[role]?.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>
              <i className={item.icon}></i> <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
