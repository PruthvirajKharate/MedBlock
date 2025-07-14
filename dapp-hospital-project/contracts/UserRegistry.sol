//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    address private admin;
    struct User {
        address wallet;
        bool isVerifier;
        bool isCandidate;
        bool isOrganization;
        string ipfsCid;
        uint256 reputation;
        bool isRegistered;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed wallet, string ipfsCid);

    constructor() {
        admin = msg.sender;
    }

    function registerUser(string memory ipfsCid) external {
        require(!users[msg.sender].isRegistered, "User already registered");
        users[msg.sender] = User(
            msg.sender,
            false,
            true,
            false,
            ipfsCid,
            0,
            true
        );
        emit UserRegistered(msg.sender, ipfsCid);
    }

    function getUser(address user) external view returns (User memory) {
        return users[user];
    }

    function updateReputation(address user, uint256 value) internal {
        require(users[user].isRegistered, "User is not registered");
        uint256 currValue = users[user].reputation;
        users[user].reputation = value + currValue;
    }

    function requestCredentials(string memory _ipfsCid, address user) external {
        updateReputation(user, 1);
        mergeData(_ipfsCid);
    }

    function mergeData(string memory _ipfsCid) internal {
        users[msg.sender].ipfsCid = _ipfsCid;
    }
}
