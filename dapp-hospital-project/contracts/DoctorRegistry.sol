//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DoctorRegistry {
    address public immutable owner;
    mapping(address => bool) private authorizedDoctors;
    address[] private doctorList; // Keeps track of registered doctors

    constructor() {
        owner = msg.sender;
    }

    modifier onlyAdmin() {
        require(owner == msg.sender, "Not the admin");
        _;
    }

    function addDoctor(address doctor) public onlyAdmin {
        require(!authorizedDoctors[doctor], "Doctor already registered");
        authorizedDoctors[doctor] = true;
        doctorList.push(doctor); // Keep track of doctors
    }

    function removeDoctor(address doctor) public onlyAdmin {
        require(authorizedDoctors[doctor], "Doctor not found");
        authorizedDoctors[doctor] = false;

        // Remove doctor from list (costly but keeps a clean list)
        for (uint256 i = 0; i < doctorList.length; i++) {
            if (doctorList[i] == doctor) {
                doctorList[i] = doctorList[doctorList.length - 1]; // Swap with last element
                doctorList.pop(); // Remove last element
                break;
            }
        }
    }

    function isDoctor(address doctor) public view returns (bool) {
        return authorizedDoctors[doctor];
    }

    function getAllDoctors() public view returns (address[] memory) {
        return doctorList;
    }
}
