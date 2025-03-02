import React from "react";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import factoryArtifact from "../../../dapp-hospital-project/artifacts/contracts/FactoryContract.sol/FactoryContract.json";
import DoctorArtifact from "../../../dapp-hospital-project/artifacts/contracts/DoctorRegistry.sol/DoctorRegistry.json";
import PatientArtifact from "../../../dapp-hospital-project/artifacts/contracts/PatientReport.sol/PatientReport.json";
import "./AdminPage.css";
import Dashboard from "./Dashboard";
import PatientGrowthChart from "./PatientGrowthChart";
import PieChartDistribution from "./PieChartDistribution";
import { Outlet } from "react-router-dom";
import Default_page from "./Admin_components/Default_page";
import Doctor_page from "./Admin_components/Doctor_page";
import Patient_page from "./Admin_components/Patient_page";

function AdminPage() {
  const dispatch = useDispatch();
  const doctorRegistryAddress = useSelector(
    (state) => state.currentUser.doctorRegistryAddress
  );
  const patientRegistryAddress = useSelector(
    (state) => state.currentUser.patientRegistryAddress
  );
  const factoryContractAddress = useSelector(
    (state) => state.currentUser.factoryContractAddress
  );
  const factoryAbi = factoryArtifact.abi;
  const doctorAbi = DoctorArtifact.abi;
  const patientAbi = PatientArtifact.abi;
  let provider;
  //functions
  useEffect(() => {
    console.log("This is happening");
    console.log("The factory contract address is " + factoryContractAddress);
    console.log("The doctor directory address is " + doctorRegistryAddress);
    console.log("The patient directory address is " + patientRegistryAddress);
    provider = new ethers.BrowserProvider(window.ethereum);
  });

  async function handleCreateRegistry() {
    try {
      alert("You are creating a new registry Prior one will be destroyed.");
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        factoryContractAddress,
        factoryAbi,
        signer
      );

      const tx = await contract.createContracts();
      await tx.wait();
      console.log("New registry created successfully!");
    } catch (e) {
      console.log("Failed to create a new registry");
    }
  }

  async function handleAddDoctor() {}

  return (
    <div className="adminPage">
      <Sidebar role={"admin"} />
      <div className="mainPage">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPage;
