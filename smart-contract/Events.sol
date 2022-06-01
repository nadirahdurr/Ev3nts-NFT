// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import './AbstractERC1155Factory.sol';

/*
* @title ERC1155 token for Events NFT
* @author nadirahlinaa
*/

contract Events is AbstractERC1155Factory, VRFConsumerBase {
    bool public mintActive = false; 
    uint public maxPerWallet = 1; 
    mapping(address => uint) public walletBalance; 
    bytes32 public merkleRoot;
    uint256[] public collectionSize; 
    uint256[] public collectionSupply; 
    string public baseMetadataURI; //the token metadata URI
    uint256 public newResult;

    // chainlink 
    bytes32 internal keyHash; // identifies which chainlink oracle to use 
    uint internal fee; // fee to get random number 
    uint256 public randomResult; // random number chainlink provides

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        uint256[] memory _collectionSize, 
        uint256[] memory _collectionSupply, 
        bytes32 _merkleRoot) 
        ERC1155(_uri) 
        VRFConsumerBase(
            // vrf coodinator - address of smart contract thats vefiys the number returned by chainlink
            0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B, 
            // link token address 
            0x01BE23585060835E02B77ef475b0Cc51aA1e0709
        ) {
            keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311; 
            // 0.1 LINK
            fee = 0.1 * 10 ** 18;
            merkleRoot = _merkleRoot;

            name_ = _name;
            symbol_ = _symbol;
            collectionSize = _collectionSize; 
            collectionSupply = _collectionSupply; 
            baseMetadataURI = _uri;
        }

    function setMerkleRoot(bytes32 _passedRoot) public onlyOwner {
        merkleRoot = _passedRoot;
    }

    // sets our URI and makes the ERC1155 OpenSea compatible
    function uri(uint256 _tokenid) override public view returns (string memory) {
        return string(
            abi.encodePacked(
                baseMetadataURI,
                Strings.toString(_tokenid),".json"
            )
        );
    }

    function toggleMint() public onlyOwner {
        mintActive = !mintActive;
        getRandomNumber();
    }

    function getRandomNumber() private returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK in contract");
        return requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32 requestId, uint randomness) internal override {
        randomResult = (randomness % 4) + 1; 
    } 

    function findAvaliableId(uint256[] memory collection, uint256[] memory supply, uint256 amount) private view returns (uint256 newId) {
        uint256 id = randomResult;
        uint256 index = id - 1;

        if (supply[index] + amount > collection[index] && randomResult < supply.length) {
            return randomResult + 1; 
        } 

        if (supply[index] + amount > collection[index] && randomResult == supply.length) {
            return randomResult - 1;
        }

        if (supply[index] + amount <= collection[index]) {
            return randomResult; 
        }

    }


    function mint(uint256 amount, bytes32[] calldata _merkleProof) public {
        // checks if mint is active also makes sure the randomresult isnt 0 since chain link takes time to set random number
        require(mintActive || randomResult > 0, "Mint is not active");
        // checks leaf of sender
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        // verfifies if leaf of sender and proof are apart of the root
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "invalid merkle proof");
        require(amount == maxPerWallet, "You can only mint 1 PHISH at a time");
        require(walletBalance[msg.sender] != maxPerWallet, "Only 1 PHISH per wallet");

        //checks collection to see if sold out for specific id then finds the next avaliable one
        uint256 id = findAvaliableId(collectionSize, collectionSupply, amount); 
        require(collectionSupply[id - 1] + amount <= collectionSize[id - 1] , "The are no more mints");

        _mint(msg.sender, id, amount, "");
        getRandomNumber();

        // mapping to keep track of who minted from the entire collection 
        walletBalance[msg.sender] += amount; 
        collectionSupply[id - 1] += amount; 
    }
}