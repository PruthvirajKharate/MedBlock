//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DoctorRegistry.sol";
import "./PatientReport.sol";

contract FactoryContract {
    // Mapping to track created contracts by their owner
    mapping(address => address) public doctorRegistryMapping;
    mapping(address => address) public patientReportMapping;

    address public owner;

    // Set the owner during deployment
    constructor() {
        owner = msg.sender;
    }

    // Only allow the owner or authorized users to deploy contracts
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    // Create a new DoctorRegistry and PatientReport contract
    function createContracts() public onlyOwner returns (address, address) {
        // Deploy the DoctorRegistry contract
        DoctorRegistry doctorRegistry = new DoctorRegistry();
        address doctorRegistryAddress = address(doctorRegistry);

        // Deploy the PatientReport contract and link it to the DoctorRegistry contract
        PatientReport patientReport = new PatientReport(doctorRegistryAddress);
        address patientReportAddress = address(patientReport);

        // Store the contract addresses
        doctorRegistryMapping[msg.sender] = doctorRegistryAddress;
        patientReportMapping[msg.sender] = patientReportAddress;

        return (doctorRegistryAddress, patientReportAddress);
    }

    // Get the address of the DoctorRegistry contract for a user
    function getDoctorRegistryAddress(
        address user
    ) public view returns (address) {
        return doctorRegistryMapping[user];
    }

    // Get the address of the PatientReport contract for a user
    function getPatientReportAddress(
        address user
    ) public view returns (address) {
        return patientReportMapping[user];
    }

    // You can add additional functions here if needed (e.g., contract upgrades, etc.)
}
