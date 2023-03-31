pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT

//Errors

error fileNameExist (address acc, string name);

contract Web3Drive{

    // Storage variables : Mappings
    
    mapping (address => mapping (string => string)) private s_ownfiles;
    mapping (address => mapping (address => string)) private s_nicknames;
    mapping (string => address [] ) private s_hasAccess;
    
    // Immutable variables

    address immutable private ownerOfContract;

    // Events

    event fileAdded (
        address indexed owner,
        string indexed name,
        string indexed hash
    );


    constructor (){
        ownerOfContract = msg.sender;
    }

    function addFile(string memory name, string calldata ipfshash) public {
        
        if(bytes(s_ownfiles[msg.sender][name]).length < 1){
            revert fileNameExist(msg.sender,name);
        }

        s_ownfiles[msg.sender][name] = ipfshash;
        s_hasAccess[name].push(msg.sender);
        emit fileAdded (msg.sender,name,ipfshash);

    }

    function allowAccess(address account , string memory name) public{
        
    }

    function getIPFShash(string memory name) public view returns (string memory){
        return s_ownfiles[msg.sender][name];
    }
}
