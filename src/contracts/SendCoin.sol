pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SendCoin {
    function swap(
        IERC20 _token1,
        address _sender,
        address _reciver,
        uint256 payableAmount
    ) public {
        require(
            _token1.allowance(_sender, address(this)) >= payableAmount,
            "Token 1 allowance too low"
        );
        _safeTransferFrom(_token1, _sender, _reciver, payableAmount);
    }

    function _safeTransferFrom(
        IERC20 token,
        address sender,
        address recipient,
        uint256 amount
    ) private {
        token.transferFrom(sender, recipient, amount);
    }

    event Bought(uint256 amount);

    function Buy(IERC20 _token, uint256 amount) public payable {
        // uint256 amountTobuy = amount;
        uint256 amountTobuy = msg.value;
        uint256 tokenBalance = _token.balanceOf(address(this));
        require(amountTobuy > 0, "You need to send some ether");
        // require(amountTobuy <= tokenBalance, "Not enough tokens in the reserve");
        _token.transfer(msg.sender, amountTobuy);
    }
}
