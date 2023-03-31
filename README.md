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
