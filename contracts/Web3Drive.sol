pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT

//Errors

error fileNameAlreadyExist (address acc, string name);
error fileDoesNotExist (address acc, string name);

contract Web3Drive{

    // Storage variables : Mappings
    
    mapping (address => mapping (string => string)) private s_ownfiles;
    mapping (address => mapping (address => string)) private s_nicknames;
    mapping (string => address [] ) private s_hasAccess;
    
    // Immutable variables

    address immutable private ownerOfContract;
    address immutable private deadAddress = 0x000000000000000000000000000000000000dEaD;

    // Events

    event fileAdded (
        address indexed owner,
        string  name,
        string indexed hash
    );

    event accessGiven (
        address indexed owner,
        string name,
        string indexed hash
    );


    constructor (){
        ownerOfContract = msg.sender;
    }

    function addFile(string memory name, string calldata ipfshash) public {
        
        if(bytes(s_ownfiles[msg.sender][name]).length > 1){
            revert fileNameAlreadyExist(msg.sender,name);
        }

        s_ownfiles[msg.sender][name] = ipfshash;
        s_hasAccess[name].push(msg.sender);
        emit fileAdded (msg.sender,name,ipfshash);

    }

    function allowAccess(address account, string memory name, string calldata ipfshash) public {
        
        if(bytes(s_ownfiles[msg.sender][name]).length < 1){
            revert fileDoesNotExist(msg.sender,name);
        }
        
        s_hasAccess[name].push(account);
        s_ownfiles[account][name] = ipfshash;
        s_ownfiles[msg.sender][name] = ipfshash;

        emit accessGiven(msg.sender, name, ipfshash);
    }

    function addNickNames (address account, string memory nickname) public {
        s_nicknames[msg.sender][account] = nickname;
    }

    function showAccess (string memory name) public view returns (address [] memory) {
        return s_hasAccess[name];
    }

    function revokeAccess(address account, string memory ipfshash, string memory name) public {
        
        if(bytes(s_ownfiles[msg.sender][name]).length < 1){
            revert fileDoesNotExist(msg.sender,name);
        }

        for(uint256 i = 0 ; i < s_hasAccess[name].length; i++){
            if(s_hasAccess[name][i]==account){
                s_hasAccess[name][i] = deadAddress;
                s_ownfiles[account][name]="";
                break;
            }
        }
        
        s_ownfiles[msg.sender][name] = ipfshash;
    }

    function deleteFile(string memory name) public {
        if(bytes(s_ownfiles[msg.sender][name]).length < 1){
            revert fileDoesNotExist(msg.sender,name);
        }

        delete s_ownfiles[msg.sender][name];
        delete s_hasAccess[name];
    }

    function getIPFShash(string memory name) public view returns (string memory){
        // Check wheter file exist or not
        return s_ownfiles[msg.sender][name];
    }

    function getOwner() public view returns(address) {
        return ownerOfContract;
    }
}
