// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20("Mock USDC", "mUSDC"){

    function collect() public {
        _mint(msg.sender, 1000);
    }
}