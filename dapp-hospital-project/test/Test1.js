const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test1", function () {
  let FactoryContract;
  let factoryContract;
  let owner;
  let address1;
  beforeEach(async function () {
    FactoryContract = await ethers.getContractFactory("FactoryContract");
    factoryContract = await FactoryContract.deploy();
    await factoryContract.waitForDeployment();
    [owner,address1] = await ethers.getSigners();
  });

  it("should deploy the contract", async function () {
    expect(await factoryContract.owner()).to.equal(owner.address);
  });
  
  it("only owner should be able to create the other contract", async function(){
    await expect(await factoryContract.createContracts()).to.not.be.reverted;
    await expect(factoryContract.connect(address1).createContracts()).to.be.reverted;
  })

  
});
