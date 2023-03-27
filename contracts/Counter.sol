//SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract Counter{
    uint public count;

    function inc() public{
        count++;
    }

    function dec() public{
        count--;
    }
    function get() public view returns (uint){
        return count;
    }
}