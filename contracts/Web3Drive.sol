pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT

// Errors

error doesNotHavePrivilege () ;

contract Web3Drive{

    // Events 
    event fileAdded (
        address indexed Owner,
        uint256 indexed token,
        string ipfsHash
    );

    event accessLevel (
        address indexed gotAccess,
        uint256 indexed token,
        uint8 AdminPrivilege,
        string ipfsHash
    );

    event fileDeleted(
        address indexed whoDeleted,
        uint256 indexed token
    );

    event IPFSchanged(
        address indexed account,
        uint256 indexed token,
        string ipfsHash
    );

    struct Hello{
        mapping(uint256 => uint8) Access;
        // Mapping from tokenID to access level
    }
    // Immutable variables
    address immutable private ownerOfContract;

    // Storage Variables
    uint256 public tokenID;

    // Mapping from address to this struct
    mapping(uint256 => string)  tokenToIPFS;
    mapping(address => Hello)  accessList;

    // Modifier
    modifier requiredAccess3(uint256 tokenId) {
        if(getAccessList(tokenId)<3){
            revert doesNotHavePrivilege();
        }
        _;
    }

    modifier requiredAccess2(uint256 tokenId) {
        if(getAccessList(tokenId)<2){
            revert doesNotHavePrivilege();
        }
        _;
    }

    constructor (){
        ownerOfContract = msg.sender;
    }

    function addFile (string memory ipfsHash) public {
        tokenToIPFS[tokenID] = ipfsHash;
        ((accessList[msg.sender]).Access[tokenID]) = 3;
        tokenID = tokenID+1;

        emit fileAdded(msg.sender,tokenID-1,ipfsHash);
    }

    function updateIPFS (uint256 tokenId, string memory ipfsHash)  requiredAccess2(tokenId) public {
        tokenToIPFS[tokenId] = ipfsHash;
        emit IPFSchanged(msg.sender,tokenId,ipfsHash);
    }

    function deleteFile (uint256 tokenId) requiredAccess3(tokenId) public {
        tokenToIPFS[tokenId] = "Deleted";
        emit fileDeleted(msg.sender,tokenId);
    }

    function changeAccessLevel (address account,uint256 tokenId,uint8 level) requiredAccess3(tokenId) public {
        ((accessList[account]).Access[tokenId]) = level;
        string memory ipfsHash = tokenIDtoIPFS(tokenId);
        emit accessLevel(account,tokenId,level,ipfsHash);
    }

    function getOwner () public view returns(address) {
        return ownerOfContract;
    }

    function tokenIDtoIPFS (uint256 tokenId) public view returns(string memory){
        return tokenToIPFS[tokenId];
    }

    function getAccessList (uint256 tokenId) public view returns(uint8){
        return (accessList[msg.sender]).Access[tokenId];
    }
}
