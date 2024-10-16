const hre = require("hardhat");
const { ethers } = require("hardhat");


async function main() {
 
  const bookRecordContract = await ethers.deployContract("BookStore");

  console.log(" Contract Address: ", await bookRecordContract.getAddress());
}

// Using this pattern to catch any error
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
