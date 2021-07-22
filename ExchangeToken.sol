pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract ExchangeToken is ERC20 {

 
    constructor()  ERC20("CmdCoin", "CC")  {
        

    }


    uint256 public payableAmount = 10000;
    function swap(IERC20 _token1, IERC20 _token2, address _sender, address _reciver) public {
        
        //   require(_token1.approve( _sender, payableAmount),"Not Approved");
       
        require(
            _token1.allowance(_sender, address(this)) >= payableAmount,
            "Token 1 allowance too low"
        );
        require(
            _token2.allowance(_reciver, address(this)) >= payableAmount,
            "Token 2 allowance too low"
        );
        
         
        _safeTransferFrom(_token1, _sender, _reciver, payableAmount);
        _safeTransferFrom(_token2, _reciver, _sender, payableAmount);
    }
    
    function checkBalance(address _sender) public view returns(uint){
        // return address(_sender);
    }

    function _safeTransferFrom(
        IERC20 token,
        address sender,
        address recipient,
        uint amount
    ) private {
       
        // bool sent = token.transferFrom(sender, recipient, amount);
  
    }
    
    // function isAllowable(address _owner) public view returns(bool){
    //     return _owner.approve(_owner, payableAmount);
    // }
}
