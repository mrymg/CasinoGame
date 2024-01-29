// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Casino {
    address public owner;
    IERC20 public mockUSDC;
    IERC20 public mockDAI;

    constructor(address _mockUSDC, address _mockDAI) {
        owner = msg.sender;
        mockUSDC = IERC20(_mockUSDC);
        mockDAI = IERC20(_mockDAI);
    }
    function bet(uint256 amount, address token) external {
        require(token == address(mockUSDC) || token == address(mockDAI), "Invalid token");
        
        IERC20 tokenContract = IERC20(token);
        require(tokenContract.balanceOf(address(this)) >= amount, "Insufficient funds in contract");
        require(tokenContract.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        if (random() == 1) {
            require(tokenContract.transfer(msg.sender, amount * 2), "Winning transfer failed");
        }
    }

    function withdrawFunds(uint256 amount, address token) external {
        require(msg.sender == owner, "Only owner can withdraw");
        IERC20 tokenContract = IERC20(token);
        require(tokenContract.transfer(msg.sender, amount), "Withdrawal failed");
    }

    function random() public view returns (uint) {
        uint256 blockNumber = block.number - 1; // Use the previous block's hash
        bytes32 blockHash = blockhash(blockNumber);
        return uint256(blockHash) % 2;
    }
}
