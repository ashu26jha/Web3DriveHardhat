const { network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")


module.exports = async  ({getNamedAccounts,deployments})=>{
    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();
    const arguments = [];
    const chainId = network.config.chainId;
    const waitBlockConfirmations = (networkConfig[chainId]).waitConfirmations
    console.log(deployer);
    const Web3Drive = await deploy("Web3Drive",{
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations | 1 ,
    });

    if (network.name != "hardhat" && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(Web3Drive.address, arguments)
    }
}
module.exports.tags = ["all", "web3drive"]
