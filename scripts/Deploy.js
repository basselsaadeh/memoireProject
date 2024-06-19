const { ethers } = require("ethers");

async function main() {
  // Connect to the Ethereum network using ethers.js
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  ); // Replace with your provider URL if not using a local network

  // Get the deployment account
  const accounts = await provider.listAccounts();
  const deployer = accounts[0]; // Assuming you use the first account for deployment

  console.log("Deploying contracts with the account:", deployer);

  // Load the contract's bytecode and ABI
  const contractName = "Coffee"; // Update with your contract name
  const contractFactory = await ethers.getContractFactory(contractName);

  // Deploy the contract
  const contract = await contractFactory.deploy();

  // Wait for the contract to be deployed
  await contract.deployed();

  // Log deployment information
  console.log(`${contractName} contract deployed to:`, contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
