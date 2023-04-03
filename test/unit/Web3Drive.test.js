const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
!developmentChains.includes(network.name) ? describe.skip : describe ("Web3Drive Tests", function () {
    let web3contract, accounts ,testacc1, testacc2, testacc3;
    beforeEach(async function () {
        await deployments.fixture("all");
        web3contract = await ethers.getContract("Web3Drive");
        accounts = await ethers.getSigners();
        testacc1 = accounts[1];
        testacc2 = accounts[2];
        testacc3 = accounts[3];
    });

    describe ("Enter Web3Drive", async function (){
        it("Checks Constructor and owner ", async  function (){
            const owner = accounts[0].address;
            const ownerFromContract = (await web3contract.getOwner()).toString();
            assert.equal(owner,ownerFromContract);
        })
    })



})
