// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol';

abstract contract AbstractERC1155Factory is ERC1155Supply, Ownable {

    string name_;
    string symbol_;      

    function setURI(string memory baseURI) external onlyOwner {
        _setURI(baseURI);
    }    

    function name() public view returns (string memory) {
        return name_;
    }

    function symbol() public view returns (string memory) {
        return symbol_;
    }           

}