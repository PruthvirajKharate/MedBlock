# Patient Health Monitor DApp

This project is a decentralized application (DApp) designed to securely manage and share patient health records using blockchain technology. The system ensures patient data ownership, controlled access, and supports workflows like doctor reassignment, fundraising, and insurance claims.

## Overview

The Patient Health Monitor DApp allows patients to store their medical reports on IPFS, manage access to them using Ethereum smart contracts, and interact with authorized doctors. It also includes support for fund-raising campaigns and automated insurance claim documentation.

## Key Features

### Patient and Doctor Management
- Register and onboard patients and verified doctors
- Assign doctors to patients and allow reassignment
- Maintain doctor-patient relationships on-chain

### Secure Health Report Storage
- Upload medical reports to IPFS for decentralized storage
- Store only metadata (e.g., IPFS hash, timestamp) in MongoDB
- Reports are accessible only to assigned doctors and the respective patients
- Patients can selectively share reports with others by granting access

### Blockchain Integration
- Smart contracts are deployed on the Ethereum Sepolia Testnet
- MetaMask is used for identity and transaction management
- Every action is logged on-chain to ensure transparency and auditability

### Fundraising Campaigns
- Patients can launch fund-me campaigns for financial support
- Reports must be verified by the doctor before the campaign is made public
- Campaigns automatically return funds if the goal is not reached

### Insurance Claim Automation
- Generates reports that are ready for insurance verification
- Includes supporting receipts and documents
- Patients sign reports using MetaMask to ensure authenticity

## Technology Stack

| Component      | Technology                     |
|----------------|-------------------------------|
| Blockchain     | Ethereum, Solidity             |
| Smart Contracts| Remix IDE, MetaMask            |
| Storage        | IPFS for files, MongoDB for metadata |
| Backend        | Java, Spring Boot              |
| Frontend       | React (work in progress)       |

To run the application you need to do first connect to the the localhost. This is a test project and is not fully developed. To run the node project first create the hardhat project and run the command.
`npx hardhat node`
`npx hardhat run script/test.js --network localhost`
Then run the react project dapp-frontend using given command.
`npx run dev`

