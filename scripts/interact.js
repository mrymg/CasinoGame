const { log } = require("console");
const hre = require("hardhat");

async function main() {
    
    // Adresses
    const casinoAdress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    const USDCAdress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const DAIAdress ="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    // contractVariables
    const casino = await hre.ethers.getContractAt("Casino", casinoAdress);
    const dai = await hre.ethers.getContractAt("MockDAI", DAIAdress);
    const usdc = await hre.ethers.getContractAt("MockUSDC", USDCAdress);
    
    


    // Casino Setup
    // owner adress is 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266

    const owner = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";

    const mintUSDC = await usdc.collect();
    console.log("usdc tx hash:", mintUSDC.hash);
    const mintDAI = await dai.collect();
    console.log("dai tx hash:", mintDAI.hash);

    console.log("USDC AMOUNT: ");
    console.log(await usdc.balanceOf(owner));
    console.log("DAI AMOUNT: ");
    console.log(await dai.balanceOf(owner));

   const casinoUSDCBalanceTransferred = await usdc.transfer(casinoAdress, 500);
   const asinoDAIBalanceTransferred = await dai.transfer(casinoAdress, 500);

    console.log("CASINO AMOUNT: ");

    console.log(await usdc.balanceOf(casinoAdress));
    console.log(await dai.balanceOf(casinoAdress));

    console.log("AFTER TRANSFER OWNER AMOUNT: ");
    console.log(await usdc.balanceOf(owner));
    console.log(await dai.balanceOf(owner));
    




    // AS A ok, lets  get into casino https://youtu.be/dibUEtVdRlQ?t=15

    // At the ENTRANCE let's give an authorization to casino employees to take my money.

    const casinoApprovalUSDC = await usdc.approve(casinoAdress, 1000);
    const casinoApprovalDAI = await dai.approve(casinoAdress, 1000);
    console.log(await dai.balanceOf(casinoAdress));

    // I'm feeling lucky, lets play...
    
    const betUSDC = await casino.bet(200, dai);

    //let's see if im winning
    console.log(await casino.random());
    if(await casino.random() == 1){
        console.log("YOU WON");
        console.log("Your new balance is: \n\tDAI: ", await dai.balanceOf(owner), "USDC: ", await usdc.balanceOf(owner));
    } else{
        console.log("YOU LOST");
        console.log("Your new balance is: \n\tDAI: ", await dai.balanceOf(owner), "USDC: ", await usdc.balanceOf(owner));
        
    }

    console.log(await dai.balanceOf(casinoAdress));
    




}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });