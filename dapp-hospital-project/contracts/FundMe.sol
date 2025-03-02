//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DoctorRegistry.sol";  // Import the DoctorRegistry interface

contract FundMe {
    address public owner;
    DoctorRegistry doctorRegistry;
    uint256 public campaignCount;

    enum CampaignState { Pending, Active, Closed }

    struct Campaign {
        address patient;
        address doctor;
        string reportIpfsHash;
        uint256 fundingGoal;
        uint256 amountRaised;
        uint256 deadline;
        bool isApproved;
        CampaignState state;
        mapping(address => uint256) contributions; // Contributions for each funder
    }

    mapping(uint256 => Campaign) public campaigns; // Mapping campaign ID to campaign details

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can execute this");
        _;
    }

    modifier onlyPatient(uint256 campaignId) {
        require(msg.sender == campaigns[campaignId].patient, "Only the patient can execute this");
        _;
    }

    modifier onlyDoctor(uint256 campaignId) {
        require(msg.sender == campaigns[campaignId].doctor, "Only the assigned doctor can approve the campaign");
        _;
    }

    modifier inState(uint256 campaignId, CampaignState _state) {
        require(campaigns[campaignId].state == _state, "Invalid campaign state");
        _;
    }

    event CampaignCreated(uint256 campaignId, address patient, uint256 fundingGoal);
    event CampaignApproved(uint256 campaignId, address doctor);
    event Funded(uint256 campaignId, address contributor, uint256 amount);
    event FundsWithdrawn(uint256 campaignId, address patient, uint256 amount);

    constructor(address _doctorRegistryAddress) {
        owner = msg.sender;
        doctorRegistry = DoctorRegistry(_doctorRegistryAddress);
    }

    // Function to create a new campaign
    function createCampaign(address _doctor, string memory _reportIpfsHash, uint256 _fundingGoal, uint256 _duration) public {
        require(doctorRegistry.isDoctor(_doctor), "Doctor is not authorized");

        campaignCount++;
        uint256 campaignId = campaignCount;

        Campaign storage newCampaign = campaigns[campaignId];
        newCampaign.patient = msg.sender;
        newCampaign.doctor = _doctor;
        newCampaign.reportIpfsHash = _reportIpfsHash;
        newCampaign.fundingGoal = _fundingGoal;
        newCampaign.amountRaised = 0;
        newCampaign.deadline = block.timestamp + _duration;
        newCampaign.state = CampaignState.Pending;

        emit CampaignCreated(campaignId, msg.sender, _fundingGoal);
    }

    // Function for doctor to approve a campaign
    function approveCampaign(uint256 campaignId) public onlyDoctor(campaignId) inState(campaignId, CampaignState.Pending) {
        Campaign storage campaign = campaigns[campaignId];
        campaign.isApproved = true;
        campaign.state = CampaignState.Active;

        emit CampaignApproved(campaignId, msg.sender);
    }

    // Function to fund a campaign
    function fundCampaign(uint256 campaignId) public payable inState(campaignId, CampaignState.Active) {
        require(msg.value > 0, "You must send some ether to fund the campaign");
        Campaign storage campaign = campaigns[campaignId];

        campaign.contributions[msg.sender] += msg.value;
        campaign.amountRaised += msg.value;

        emit Funded(campaignId, msg.sender, msg.value);
    }

    // Function to withdraw funds (only patient can withdraw)
    function withdrawFunds(uint256 campaignId) public onlyPatient(campaignId) inState(campaignId, CampaignState.Closed) {
        Campaign storage campaign = campaigns[campaignId];

        require(campaign.amountRaised >= campaign.fundingGoal, "Campaign did not reach funding goal");
        
        uint256 amountToWithdraw = campaign.amountRaised;
        campaign.amountRaised = 0;
        
        payable(campaign.patient).transfer(amountToWithdraw);
        emit FundsWithdrawn(campaignId, campaign.patient, amountToWithdraw);
    }

    // Function to close the campaign after deadline or goal
    function closeCampaign(uint256 campaignId) public onlyOwner inState(campaignId, CampaignState.Active) {
        Campaign storage campaign = campaigns[campaignId];

        require(block.timestamp >= campaign.deadline, "Campaign duration has not ended");

        if (campaign.amountRaised < campaign.fundingGoal) {
            campaign.state = CampaignState.Closed;  // Fail the campaign if not enough funds raised
            payable(owner).transfer(campaign.amountRaised);  // Refund to the owner (or could refund to funders)
        } else {
            campaign.state = CampaignState.Closed;  // Success if funding goal reached
        }
    }

    // Get the campaign state
    function getCampaignState(uint256 campaignId) public view returns (string memory) {
        CampaignState state = campaigns[campaignId].state;
        if (state == CampaignState.Pending) {
            return "Pending";
        } else if (state == CampaignState.Active) {
            return "Active";
        } else {
            return "Closed";
        }
    }
}
