const InitCoin = artifacts.require('InitCoin');
const CmdCoin = artifacts.require('CmdCoin');
const SendCoin = artifacts.require('SendCoin');
var BigNumber = require('big-number');


module.exports =async function (deployer, network, accounts) {

  let supply = BigNumber(1000).multiply(BigNumber(10).pow(18));

  await deployer.deploy(SendCoin);
  await deployer.deploy(CmdCoin  ,supply.toString());
  await deployer.deploy(InitCoin ,supply.toString());

  
};
