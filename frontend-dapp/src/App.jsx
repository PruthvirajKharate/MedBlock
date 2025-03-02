import { useState } from "react";
import AdminPatientDetails from "./components/AdminPatientsDetail";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HospitalRegistration from "./components/HospitalRegistration";
import AdminPage from "./components/AdminPage";
import Temp from "./components/temp";
import Default_page from "./components/Admin_components/Default_page";
import Doctor_page from "./components/Admin_components/Doctor_page";
import Patient_page from "./components/Admin_components/Patient_page";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HospitalRegistration />}></Route>
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<Default_page />}></Route>
            <Route path="doctor" element={<Doctor_page />} />
            <Route path="patient" element={<Patient_page />} />
            <Route path="patient/:id" element={<AdminPatientDetails />}></Route>
          </Route>
          <Route path="/nowhere" element={<Temp />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
