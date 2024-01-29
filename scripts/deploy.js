// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy MockUSDC
  const MockUSDC = await hre.ethers.getContractFactory("MockUSDC");
  const mockUSDC = await MockUSDC.deploy(); // 1 million tokens
  await mockUSDC.waitForDeployment();
  console.log("MockUSDC deployed to:", mockUSDC.target);

  // Deploy MockDAI
  const MockDAI = await hre.ethers.getContractFactory("MockDAI");
  const mockDAI = await MockDAI.deploy(); // 1 million tokens
  await mockDAI.waitForDeployment();
  console.log("MockDAI deployed to:", mockDAI.target);

  // Deploy BettingGame
  const BettingGame = await hre.ethers.getContractFactory("Casino");
  const bettingGame = await BettingGame.deploy(mockUSDC.target, mockDAI.target);
  await bettingGame.waitForDeployment();
  console.log("BettingGame deployed to:", bettingGame.target);

  game(mockDAI.target, mockUSDC.target, bettingGame.target);
}

async function game(dai, usdc, casino){
  
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
