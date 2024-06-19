// File: contracts/coffee.sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract coffee { // Contract name matches the reference in scripts
    struct Memo {
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memos;
    address payable owner; // This owner will receive the funds (messages)

    event NewMemo(
        string name,
        string message,
        uint timestamp,
        address from
    );

    constructor() {
        owner = payable(msg.sender);
    }

    // Function to buy coffee
    function buyCoffee(string calldata name, string calldata message) external payable {
        // Create a new Memo struct and push it to the array
        memos.push(Memo(name, message, block.timestamp, msg.sender));

        // Emit an event for the new memo
        emit NewMemo(name, message, block.timestamp, msg.sender);
    }

    // Function to get all memos
    function getMemos() external view returns (Memo[] memory) {
        return memos;
    }
}
