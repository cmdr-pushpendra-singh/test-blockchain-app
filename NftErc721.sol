pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Newtest is ERC721 {

    uint256 public _tokenIds =0 ;
    
    string public baseTokenURI;
    
    constructor(string memory _tokenUrl) ERC721("firstNft","FN"){
        
        baseTokenURI = _tokenUrl;
    }



   function mintNft(address receiver) public {
        _tokenIds +=1;
       
        _mint(receiver, _tokenIds);
        
    }
    
    
    function updateTokenUri(string memory _newTokenUri) public {
        
         baseTokenURI = _newTokenUri;
    
        baseTokenURI =  _newTokenUri;
        
    }
    
    
    function tokenURI()public view returns(string memory){
        return baseTokenURI;
    }
    
  
}