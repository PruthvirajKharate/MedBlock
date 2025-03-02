//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDoctorRegistry {
    function isDoctor(address doctor) external view returns (bool);
}

contract PatientReport {
    address public doctorRegistryAddress;
    IDoctorRegistry doctorRegistry;

    constructor(address _doctorRegistryAddress) {
        doctorRegistryAddress = _doctorRegistryAddress;
        doctorRegistry = IDoctorRegistry(doctorRegistryAddress);
    }

    struct Report {
        string ipfsHash;
        address assignedDoctor;
        mapping(address => bool) sharedWith;  // Efficient access control
    }

    mapping(address => Report[]) public patientReportMapping;
    mapping(address => address[]) public doctorReportMapping;

    modifier onlyDoctor() {
        require(doctorRegistry.isDoctor(msg.sender), "Not an authorized doctor");
        _;
    }

    modifier onlyPatient(address _patient) {
        require(msg.sender == _patient, "Only the patient can access their report");
        _;
    }

    modifier reportExists(address _patient, uint256 _reportIndex) {
        require(_reportIndex < patientReportMapping[_patient].length, "Report does not exist");
        _;
    }

    // Create a new report for a patient
    function createReport(string memory _ipfs, address _patient) public onlyDoctor {
        Report storage report = patientReportMapping[_patient].push();
        report.ipfsHash = _ipfs;
        report.assignedDoctor = msg.sender;

        doctorReportMapping[msg.sender].push(_patient);
    }

    // View a report by patient or assigned doctor
    function viewReport(address _patient, uint256 _reportIndex) public view onlyPatient(_patient) reportExists(_patient, _reportIndex) returns (string memory) {
        Report storage report = patientReportMapping[_patient][_reportIndex];
        require(report.assignedDoctor == msg.sender || report.sharedWith[msg.sender], "Not authorized to view this report");
        return report.ipfsHash;
    }

    // Share a report with another address
    function shareReport(address _patient, uint256 _reportIndex, address _otherAddress) public onlyPatient(_patient) reportExists(_patient, _reportIndex) {
        Report storage report = patientReportMapping[_patient][_reportIndex];
        report.sharedWith[_otherAddress] = true;
    }

    // Reassign a doctor to a patient
    function reassignDoctor(address _patient, address _newDoctor, uint256 _reportIndex) public onlyDoctor reportExists(_patient, _reportIndex) {
        require(doctorRegistry.isDoctor(_newDoctor), "New doctor is not authorized");
        Report storage report = patientReportMapping[_patient][_reportIndex];
        report.assignedDoctor = _newDoctor;
    }

    // Get all reports for a patient (can be optimized)
    function getPatientReports(address _patient) public view returns (string[] memory) {
        string[] memory reports = new string[](patientReportMapping[_patient].length);
        for (uint i = 0; i < patientReportMapping[_patient].length; i++) {
            reports[i] = patientReportMapping[_patient][i].ipfsHash;
        }
        return reports;
    }

    // Get all reports for a doctor
    function getDoctorReports(address _doctor) public view returns (address[] memory) {
        return doctorReportMapping[_doctor];
    }
}
