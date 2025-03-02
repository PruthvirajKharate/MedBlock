import React, { useEffect } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PatientTable.css";

function PatientTable() {
  const [searchQuery, setSearchQuery] = useState(" ");
  const [isClicked, setIsClicked] = useState(true);
  const [patientData, setPatientData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    try {
      axios.get("http://localhost:8080/patients").then((response) => {
        setPatientData(response.data);
        setFilteredData(response.data);
      });
    } catch (e) {
      console.log("Unable to access patient Data");
    }
  }, []);

  useEffect(() => {
    setFilteredData(
      patientData.filter((patient) => {
        return patient.name.toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [searchQuery, patientData]);

  return (
    <div>
      <div
        className="searchbar"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          border: "1px solid #ccc",
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          width: "100%", // Ensure it stretches
          minHeight: "40px", // Give it some height
          borderRadius: "5px",
        }}
      >
        <input
          type="text"
          placeholder="Search patient"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <motion.div
          animate={{ scale: isClicked ? 2 : 1.5 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsClicked(!isClicked)}
          style={{ cursor: "pointer", marginLeft: "20px", marginRight: "10px" }}
        >
          <FaSearch style={{ color: "black" }} />
        </motion.div>
      </div>
      <div className="patientTable">
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((patient) => (
              <tr key={patient.pid}>
                <td>{patient.pid}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.patientAddress}</td>
                <td>
                  <Link to={`/admin/patient/${patient.pid}`}>
                    <button>View Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientTable;
