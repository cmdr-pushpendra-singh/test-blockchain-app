pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract CmdCoin is ERC20 {

     constructor(uint256 _initalsupply) ERC20("CmdCoin", "CC") {
       
        _mint(msg.sender, _initalsupply);

    }

}
