import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./hr.css";
import hospitalArtifact from "../../../dapp-hospital-project/artifacts/contracts/FactoryContract.sol/FactoryContract.json";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import {
  setDoctorRegistryAddress,
  setFactoryContractAddress,
  setPatientRegistryAddress,
  setUserAddress,
  setUserName,
  setHospitalAddress,
  setHospitalName,
  setEmail,
} from "../store/currentUserSlice";

function HospitalRegistration() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [userAccount, setUserAccount] = useState(null);
  const [userData, setUserData] = useState({
    adminName: "",
    email: "",
    hospitalName: "",
    address: "",
  });
  let m;

  //This will handle any changes in the account
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountChanged = (account) => {
        if (account.length > 0) {
          setUserAccount(account[0]);
          console.log("Account changed: " + account[0]);
        } else {
          setUserAccount(null);
          console.log("Please connect to metamsk");
        }
      };

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleAccountChanged)
        .catch((err) => {
          console.log("Error fetching accounts", err);
        });

      window.ethereum.on("accountsChanged", handleAccountChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountChanged);
      };
    } else {
      console.log("metamask is not present");
    }
  }, []);

  //This will connect the account
  async function handleConnect() {
    try {
      if (typeof window.ethereum != "undefined") {
        console.log("Metamask is present");
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAccount(account[0]);

        console.log("Connected to account :" + account[0]);
      } else {
        console.log("Metamask needs to be connected.");
      }
    } catch (error) {
      console.log("some error occurred");
    }
  }

  //This will handle changes in data
  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  //Submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!userAccount) {
      alert("!Please connect Metamask first");
      return;
    }

    let m; // Moved inside handleSubmit to avoid scope issues

    try {
      const { abi, bytecode } = hospitalArtifact;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const factory = new ethers.ContractFactory(abi, bytecode, signer);
      const hospitalContract = await factory.deploy();
      await hospitalContract.waitForDeployment();

      m = await hospitalContract.getAddress(); // Assign contract address

      const deployedContract = new ethers.Contract(m, abi, signer);
      const tx = await deployedContract.createContracts();
      await tx.wait();

      console.log("New hospital contract deployed at:", m);
      console.log("New doctor registry and patient registry created");

      const doctorRegistryAddress =
        await deployedContract.getDoctorRegistryAddress(userAccount);
      const patientRegistryAddress =
        await deployedContract.getPatientReportAddress(userAccount);

      dispatch(setDoctorRegistryAddress(doctorRegistryAddress)); // ✅ Corrected Dispatch
      dispatch(setPatientRegistryAddress(patientRegistryAddress)); // ✅ Corrected Dispatch

      console.log(`Doctor registry address: ${doctorRegistryAddress}`);
      console.log(`Patient report address: ${patientRegistryAddress}`);
    } catch (e) {
      console.log("Error deploying contract:", e);
    }

    try {
      const userInfo = {
        adminName: userData.adminName,
        email: userData.email,
        hospitalName: userData.hospitalName,
        address: userData.address,
        adminAddress: userAccount,
        contractAddress: m,
      };

      const response = await axios.post("http://localhost:8080/", userInfo, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Success:", response.data);
      navigate("/admin");
    } catch (e) {
      console.error("Error in API call:", e);
    }

    dispatch(setUserName(userData.adminName));
    dispatch(setUserAddress(userAccount));
    dispatch(setFactoryContractAddress(m));
    dispatch(setEmail(userData.email));
    dispatch(setHospitalName(userData.hospitalName));
    dispatch(setHospitalAddress(userData.address));
  }

  return (
    <div className="Register">
      <button id="connect" onClick={handleConnect}>
        {userAccount ? <p>Account connected</p> : <p>Connect with metamask</p>}
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="adminName"
          placeholder="Admin name"
          onChange={handleChange}
          value={userData.adminName}
          required
        ></input>
        <input
          type="email"
          name="email"
          placeholder="xyz@email.com"
          onChange={handleChange}
          value={userData.email}
          required
        ></input>
        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          onChange={handleChange}
          value={userData.hospitalName}
          required
        ></input>
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          value={userData.address}
          required
        ></input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default HospitalRegistration;
