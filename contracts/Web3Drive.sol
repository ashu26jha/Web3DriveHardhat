pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT
contract Web3Drive{
    mapping (address => mapping (string => string)) private s_ownfiles;
    mapping (address => mapping (address => string)) private s_nicknames;
    mapping (string => address [] ) private s_hasAccess;

}
