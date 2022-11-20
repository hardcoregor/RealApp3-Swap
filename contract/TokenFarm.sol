//SPDX-License-Identifier: Unlicense

pragma solidity ^0.6.6;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;
    address public owner;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken)public payable {
        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    //1. Stakes tokens (DEP)
    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, "ammount cannot be 0");
        daiToken.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    //2. Unstaking tokens (WITHDR)

    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];

        require(balance > 0, "astaking balance cannot be 0");

        if (isStaking[msg.sender]) {
            daiToken.transfer(msg.sender, balance);

            isStaking[msg.sender] = false;

            stakingBalance[msg.sender] = 0;
        }
    }

    //3. Issuing Tokens

    function issueToken() public {
        require(msg.sender == owner, "caller must be owner");
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];

            if (balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }
    }
}
