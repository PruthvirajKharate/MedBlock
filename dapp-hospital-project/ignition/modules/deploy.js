//import statements
const ether = require("hardhat");

// main function
async function main() {
  let factoryContract = await ethers.getContractFactory("FactoryContract");
  let factoryContractDeployed = await factoryContract.deploy();
  await factoryContractDeployed.waitForDeployment();
  let address =await factoryContractDeployed.getAddress();
  console.log("Factory Contract deployed to: ", address);
}
// call
main()
  .then(() => {
    console.log("Deployment completed successfully");
  })
  .catch((error) => {
    console.error(error);
  });
