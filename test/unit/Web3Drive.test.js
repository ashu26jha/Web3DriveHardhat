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
    

    // describe("Allow access to another user", async function (){
        
    //     it("Only owner can allow access", async function (){
    //         await web3contract.addFile("Test.png","0x1234567891");
    //         await expect ((web3contract.connect(testacc1)).allowAccess(testacc2,"Test.png","0x1234567891")).to.be.revertedWith('fileDoesNotExist');
    //     });
        
    //     it("Checks whether it has access by retrieving it's hash", async function (){
    //         await web3contract.addFile("Test.png","0x1234567891");
    //         await web3contract.allowAccess(testacc1.address,"Test.png","0x1234567892");
    //         const IPFShash = await ((web3contract.connect(testacc1)).getIPFShash("Test.png"));
    //         assert.equal("0x1234567892",IPFShash)

    //     })
    // });

    // describe("Revokes the access", async function () {
    //     it("Adds a file, allows access then revokes",async function () {
    //         await web3contract.addFile("Test.png","0x1234567891");
    //         await web3contract.allowAccess(testacc1.address,"Test.png","0x1234567892");
    //         await web3contract.revokeAccess(testacc1.address,"0x1234567893","Test.png");
    //         const IPFShash = await ((web3contract.connect(testacc1)).getIPFShash("Test.png"));
    //         assert.equal("",IPFShash.toString());
    //         const access = await web3contract.showAccess("Test.png");
    //         let flag = 1 ;
    //         if(access.includes(testacc1.address)){
    //             flag = 0 ;
    //         }
    //         assert.equal(flag,1);

    //     })
    // });

    // describe("Deletes the file", async function (){
    //     it("Adds a file and deletes it", async function (){
    //         await web3contract.addFile("Test.png","0x1234567891");
    //         await web3contract.deleteFile("Test.png");
    //         const resContract = await web3contract.getIPFShash("Test.png");
    //         assert.equal("",resContract);
    //     })
    // })





})
