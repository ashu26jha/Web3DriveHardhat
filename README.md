# Web3Drive
## Structure of smart contract

### 1.  Data structures needed 
    
    a.  It will store address of uploader and it will mapped to its name and metadata of that file 

    b.  Storing the metadata will save on gas 
    
    c.  MetaData will have users with access, name and comments by users 
    
    d.  Mapping of known accounts and it's nickname 
    
    e.  Mapping of file name and accesses 

### 2.  Functions needed
    
    a. addFile(string name, string hash) 
    
    b. allowAccess(string name, address accountToBeAdded) (Must check only owner could add the file) 
    
    c. addKnowAccount(address accountToBeAdded, string nickname) 
    
    d. showAccess(string name) 
    
    e. revokeAccess(string name, address accountToBeRevoked) 

    f. deleteFile(string name) (Only owner can delete the files) 

    g. changeName(string name) (Only owner can) (Later need to check piniata)

    h. getIPFShash(string name) 

### 3.  Deploy

    a. Write a deploy script

### 4.  Testing
    
    1.  a. Check the constructor
    
    2.  a. GetNamedAccounts connect to the contract 
    
        b. upload to pinata get hash and put
    
    3.  a. Allow access to another account
        
    4.  a. Revoke an access

    5.  a. Delete a files
