import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "@mui/material";

function AdminPatientsDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/patients/pid/${id}`
        );
        setPatient(response.data);
        console.log(patient);
      } catch (e) {
        console.log("Unable to access patient data");
      }
    };
    fetchUserData();
  }, []);
  return (
    <div className="container mt-4 p-4 bg-light shadow-lg rounded">
      <h2 className="mb-4">Patient Details</h2>
      <div className="border p-3 rounded">
        <p><strong>ID:</strong> {patient.pid}</p>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Digital Address:</strong> {patient.digitalAddress}</p>
        <p><strong>Last Updated:</strong> {patient.lastUpdated}</p>
        <p><strong>Visits:</strong> {patient.visits}</p>
        <p><strong>Address:</strong> {patient.address}</p>
      </div>
      
      <h3 className="mt-4 mb-3">Appointment History</h3>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Doctor</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.date}</td>
              <td>{appointment.doctor}</td>
              <td>{appointment.reason}</td>
              <td className={appointment.status === "Pending" ? "text-danger" : "text-success"}>
                {appointment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPatientsDetail;
