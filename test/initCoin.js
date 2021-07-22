const InitCoin = artifacts.require('InitCoin');

var BigNumber = require('big-number');
const toBN = web3.utils.toBN;
var Chance = require('chance')
contract('InitCoin', async (accounts) => {




  let initCoinContract = null;
  before(async () => {
    initCoinContract = await InitCoin.deployed('10000');

  })

  describe("initial state", () => {

    it('should return contract address', async () => {
      const address = await initCoinContract.address
      // console.log(address);
      assert.notEqual(address, '', 'Contract Not Deployed Properly');

    })

    it('should return Contract Name', async () => {
      const name = await initCoinContract.name.call()


      assert.equal(name, 'InitCoin', 'Contract Name not matched')

    })


    it('should return total supply', async () => {

      let result = await initCoinContract.totalSupply.call()
      // console.log(result.toString())
      assert.equal(result.toString(), '1000000000000000000000', 'Total Supply is Wrong')
    })


    it('should return owner Address', async () => {
      let address = accounts[0];

      // console.log("accounts[0]", accounts[0])

      assert.notEqual(accounts[0], '', "Contract not deployed")

    })

    it('should get owner balance', async () => {
      let result = await initCoinContract.balanceOf.call(accounts[0])

      let bal = result.toString()

      assert.notEqual(result.toString(), 0, "Owner balance is 0")


    })


  })



  describe("Transfer", () => {

    it('should send transaction', async () => {
      const transaction = await initCoinContract.allowAbleTransfer.sendTransaction()
      // console.log(transaction.tx.length);

      assert.notEqual(transaction.tx.length, 0, 'Transaction Hash is blank');
    })

    it('should check allowance', async () => {
      // const chance = new Chance();
      let result = await initCoinContract.allowance.call(accounts[0], accounts[1])

      // console.log(result.toString())

      assert.equal(result.toString(), 0, "Owner balance is 0")


    })

    it('should show the transfer event', async () => {

      let result = await initCoinContract.transfer(accounts[1], 100000)

      // console.log(result.logs[0].event)
      assert.equal(result.logs[0].event, 'Transfer', "Invalid event")


    })
  })


  describe("Mint", () => {

    it('should perform free minting', async () => {
      const address = await initCoinContract.address

      const mint = await initCoinContract.freeMinting(address, '10')
      assert(mint.tx != '');

    })
  })


  describe("Work with Chance", () => {

    it("mint random test account of truffle / ganache and check balance is increment or not", async () => {

      const chance = new Chance()
      const account_address = chance.pickone(accounts)
      mint_balance = toBN(1E19).muln(chance.natural({min: 1, max: 100}));

      let result_1 = await initCoinContract.balanceOf.call(account_address)

      let initialBalance = result_1 //.toString()


      const mint = await initCoinContract.freeMinting(account_address,mint_balance);

      let result_2 = await initCoinContract.balanceOf.call(account_address)

      let afterMintBalance = result_2 //.toString()



      // assert(afterMintBalance == initialBalance + mint_balance)
      assert.isTrue(afterMintBalance.eq(mint_balance.add(initialBalance)))

      // console.log("result",afterMintBalance.eq(mint_balance.add(initialBalance)))
      // console.log("afterMintBalance =",afterMintBalance.toString())
      console.log("initialBalance   =",initialBalance.toString())
      console.log("mint_balance     =",mint_balance.toString())
      console.log("incremented_balance     =",mint_balance.add(initialBalance).toString())





    })

  })


})