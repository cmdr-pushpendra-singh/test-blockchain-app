pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract InitCoin is ERC20 {
    
    uint256 initialSupply ;

    constructor(uint256 _initalsupply) ERC20("InitCoin", "IC") {
        initialSupply = _initalsupply;
        _mint(msg.sender, _initalsupply);

    }

    uint256 public allowAbleTransfer = initialSupply / 100;

    mapping(address => uint256) public balances;

    // function sendInitCoin(address _recipient) public payable {

    //     require(balanceOf(msg.sender) >= allowAbleTransfer,"You Dont Have Sufficient balance");
    //     transfer(_recipient, allowAbleTransfer);
    // }

    function freeMinting(address _minter, uint256 _tokenMint) public {
         _mint(_minter, _tokenMint);
    }



    function paidMinting(uint256 _amount) public payable {
        uint256 amountTobuy = _amount;
        // uint256 tokenBalance = balanceOf(address(this));
        uint256 tokenBalance = totalSupply();
        
        // return tokenBalance;
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= tokenBalance, "Not enough tokens in the reserve");
        _mint(msg.sender, amountTobuy);
        // transfer(msg.sender, amountTobuy);
            
    }
       

    receive() external payable{

    }

    

}
