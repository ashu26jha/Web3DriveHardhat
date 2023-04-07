const { ethers, network } = require("hardhat");
const fs = require("fs")
const FRONT_END_CONTRACT_FILE = '../web3drivefrontend/constants/networkMapping.json'; 
const ABI_LOCATION = '../web3drivefrontend/constants/web3drive.json'
module.exports = async function ()  {
    if(process.env.UPDATE_FRONT_END){
        console.log("Updating front end....");
        await updateContractAddress();
        await updateAbi();
    }
}

async function updateAbi (){
    const Web3Drive = await ethers.getContract("Web3Drive");
    fs.writeFileSync(ABI_LOCATION, Web3Drive.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddress(){
    const Web3Drive = await ethers.getContract("Web3Drive");
    const chainId = network.config.chainId;
    const contractAddresses = JSON.parse(fs.readFileSync(FRONT_END_CONTRACT_FILE, "utf8"))
    // console.log(Web3Drive);
    if(chainId in contractAddresses){
        if(!contractAddresses[chainId].includes(Web3Drive.address)){
            contractAddresses[chainId].push(Web3Drive.address);
        }
    }
    else{
        contractAddresses[chainId]= [Web3Drive.address];
    }
    console.log(contractAddresses);
    fs.writeFileSync(FRONT_END_CONTRACT_FILE,JSON.stringify(contractAddresses),"utf-8");
}
module.exports.tags = ["all", "frontend"]
