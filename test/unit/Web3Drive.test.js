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
        testacc2 = accounts[2].address;
        testacc3 = accounts[3].address;
    });

    describe ("Enter Web3Drive", async function (){
        it("Checks Constructor and owner ", async  function (){
            const owner = accounts[0].address;
            const ownerFromContract = (await web3contract.getOwner()).toString();
            assert.equal(owner,ownerFromContract);
            
        });
    });

    describe("Uploads file, and retrieves back", async function (){
        it("Uploads file", async function (){
            await web3contract.addFile("0x1234567891");
            //Check tokenID increments or not
            assert.equal( (await web3contract.tokenID()).toString(),1 )
            const filehashfromcontract = await web3contract.tokenIDtoIPFS(0);
            assert.equal("0x1234567891",filehashfromcontract);
        });

    

        it("Checks event emitted when file added",async function (){
            const txResponse = await web3contract.addFile("0x1234567891");
            const txReciept = await txResponse.wait(1);
            const emittedEvent = txReciept.events[0].args[0];
            assert.equal(emittedEvent,accounts[0].address);
        })
        
    });
    

    describe("Allow access to another user", async function (){
        
        it("Only accounts with admin access can modify access", async function (){
            await web3contract.addFile("0x1234567891");
            await expect ((web3contract.connect(testacc1)).changeAccessLevel(testacc2,0,3)).to.be.revertedWith('doesNotHavePrivilege');
        });
        
    });

    describe("Other account changes IPFS Hash", async function () {
        it("Adds a file, allows access to other account that account changes IPFS Hash",async function () {
            await web3contract.addFile("0x1234567891");
            await (web3contract.connect(accounts[0])).changeAccessLevel(testacc1.address ,0,3)
            await (web3contract.connect(accounts[0])).updateIPFS(0,"0x987654321");
            assert.equal("0x987654321", await web3contract.tokenIDtoIPFS(0));

        })
    });

    describe("Deletes the file", async function (){
        it("Adds a file and deletes it", async function (){
            await web3contract.addFile("1");
            await web3contract.deleteFile(0);
            const resContract = await web3contract.tokenIDtoIPFS(0);
            assert.equal("Deleted",resContract);
        })
    });


})
