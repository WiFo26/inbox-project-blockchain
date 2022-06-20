// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Inbox {
    string public message;

    constructor(string memory initMessage) {
        message = initMessage;
    }

    function setMessage(string memory newMessage) public{
       message = newMessage;
    }
}