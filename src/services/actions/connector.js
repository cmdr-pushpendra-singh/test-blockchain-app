import Web3 from 'web3';

import InitCoin from "../../abis/InitCoin"
import CmdCoin from "../../abis/CmdCoin"
import sendCoin from "../../abis/SendCoin"

import detectEthereumProvider from "@metamask/detect-provider";

import * as contents from "../constants"
const web3 = new Web3();

const ethereum = window.ethereum

const initCoinContract = new web3.eth.Contract(InitCoin, contents.INIT_TOKEN_ADDR);
const cmdCoinContract = new web3.eth.Contract(CmdCoin, contents.CMD_TOKEN_ADDR);
const sendCoinContract = new web3.eth.Contract(sendCoin, contents.SEND_COIN_ADDR);



var BigNumber = require('big-number');


let loggedUser = {};
let supply = BigNumber(1000).multiply(BigNumber(10).pow(18));
let oneCoin = BigNumber(1).multiply(BigNumber(10).pow(18));

var user_add = '';

// let loggedUser ='';
export function metamaskLogin() {
  return (dispatch) => {
    window.ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {

      metamask_login_chk(dispatch);

    }).catch((error) => dispatch({
      type: 'LOGIN_ERROR_CALL_REJECT',
      json: { type: 'error', data: error.message }
    }));
  };
}



function metamask_login_chk(dispatch) {

  ethereum.on('accountsChanged', function (accounts) {
    window.location.reload();
  });
  ethereum.on('chainChanged', function (accounts) {
    window.location.reload();
  });
  if (ethereum.isMetaMask && ethereum.selectedAddress != (null || undefined)) {
    detectEthereumProvider().then(async (provider) => {
      web3.setProvider(provider);
      web3.eth.net.getNetworkType().then(async (network_type) => {
        if ((contents.ETH_ENV == 'development' && network_type != 'main') || (contents.ETH_ENV != 'development' && network_type == 'main')) {

          user_add = ethereum.selectedAddress;

          await getBalance(user_add)

          dispatch({
            type: "LOGIN_SUCCESS",
            json: { data: loggedUser },
          });

        } else {
          dispatch({
            type: 'LOGIN_ERROR_CALL_NETWORK',
            json: {}
          })
        }
      })
    });
  }

}

export function mintToken(user, value = 0) {

  value = BigNumber(value).multiply(BigNumber(10).pow(18));
  return async (dispatch) => {

    try {

      const fromAddress = user.user.eth_address

      const setToken = await initCoinContract.methods.freeMinting(fromAddress, value).send({ from: fromAddress });

      loggedUser["balance"] = await web3.eth.getBalance(ethereum.selectedAddress);

      return dispatch({
        type: 'SET_MINT_SUCCESS',
        json: { type: "success", data: { setToken: setToken, bale: loggedUser } }
      })
    } catch (e) {
      return dispatch({
        type: 'SET_MINT_ERROR',
        json: { type: "error", data: e }
      })
    }

  }
}

export function paidMintToken(user, value = 0) {

  let transferAmount = BigNumber(value).multiply(BigNumber(10).pow(18));

  console.log("value-->", parseInt(value.toString()))


  const fromAddress = user.user.eth_address

  console.log("fromAddress,", fromAddress);
  return async (dispatch) => {

    try {


      let erc20TokenContractAddress = contents.INIT_TOKEN_ADDR;

      // const initCoinAllowSendContract = await initCoinContract.methods.allowance(erc20TokenContractAddress, fromAddress).call();

      // const approveInitContract = await initCoinContract.methods.approve(fromAddress, transferAmount).send({ from: fromAddress });

      window.initCoinContract = initCoinContract;
      const setToken = await initCoinContract.methods.paidMinting(transferAmount.toString()).send({ from: fromAddress, value: transferAmount.toString() });


      // const setToken = await sendCoinContract.methods.Buy(erc20TokenContractAddress,transferAmount).send({ from: fromAddress });

      loggedUser["balance"] = await web3.eth.getBalance(ethereum.selectedAddress);
      await getBalance(fromAddress)

      return dispatch({
        type: 'PAID_MINT_SUCCESS',
        json: { type: "success", data: { setToken: setToken, bale: loggedUser } }
      })
    } catch (e) {
      return dispatch({
        type: 'PAID_MINT_ERROR',
        json: { type: "error", data: e }
      })
    }

  }
}


export function transferIcToken(user, recipientsAddress = 0, transferIcToken = 0) {

  let transferIC = BigNumber(transferIcToken).multiply(BigNumber(10).pow(18));
  return async (dispatch) => {

    try {
      const fromAddress = user.user.eth_address

      // await getBalance(fromAddress)

      reset_user_data(user.user.eth_address, dispatch);
      //  readEvent(fromAddress, recipientsAddress, transferIC, dispatch)
      user_event[recipientsAddress] = readEvent(fromAddress, recipientsAddress, transferIC, dispatch)

      const setToken = await initCoinContract.methods.transfer(recipientsAddress, transferIC).send({ from: fromAddress });

      console.log("setToken---", setToken)
      console.log("setToken---", setToken.events.Transfer.returnValues.to);

      // unsubscribeUserEvent(user.user.eth_address);

      return dispatch({
        type: 'SET_IC_TRANSFER_SUCCESS',
        json: { type: "success", data: { setToken: setToken, bale: loggedUser } }
      })
    } catch (e) {
      // unsubscribeUserEvent(user.user.eth_address);
      return dispatch({
        type: 'SET_IC_TRANSFER_ERROR',
        json: { type: "error", data: e }
      })
    }

  }
}

window.addEventListener("load", () => readEvent("", "", "", ""), false);

let user_event = {};


function unsubscribeUserEvent(address) {
  // window.addEventListener("load", () => readEvent("","","",""), false);

  try {
    user_event[address].unsubscribe();
  } catch (e) {

  }

}


export function reset_user_data(token_address, dispatch) {
  // unsubscribeUserEvent(token_address);
  dispatch({
    type: 'RESET_USER_DATA',
    json: { payload: token_address }
  })
}





function readEvent(fromAddress, recipientsAddress, transferIC, dispatch) {
  alert("read event")
  let to = recipientsAddress.toLocaleLowerCase();
  let fromAddrss = fromAddress.toLocaleLowerCase()


  let contract = new web3.eth.Contract(InitCoin, contents.INIT_TOKEN_ADDR);

  console.log("contract --", contract)



  let event = contract.events['Transfer'](fromAddress, recipientsAddress, transferIC).on('data', async (ev) => {


    console.log("user address--", user_add)
    console.log("ev------", ev)
    let returnValues = ev.returnValues;



    if (returnValues['from'].toLocaleLowerCase() == fromAddrss || returnValues['to'].toLocaleLowerCase() == user_add.toLocaleLowerCase()) {
    
      dispatch({
        type: 'SET_USER_DATA',
        json: { data: returnValues, recipientsAddress: recipientsAddress, token_address: recipientsAddress }
      })

    }


  })


  return event

}

// export function checkCoinName
export function getMessage() {

  return async (dispatch) => {
    console.log("msgText", getNumberOfTokens)
    const contract = new web3.eth.Contract(InitCoin, contents.INIT_TOKEN_ADDR);

    window.contract = contract;

    let getNumberOfTokens = await contract.methods.balanceOf(user_add).send({ user_add });
    let msgText = await contract.methods.balanceOf(user_add).send({ user_add });


    // const msgText = await contract.methods.myText().call();
    console.log("msgText", getNumberOfTokens)

    return dispatch({
      type: 'GET_MESSAGE_SUCCESS',
      json: { data: msgText }
    })
  }
}



async function getBalance(user_add) {

  let icCount = await initCoinContract.methods.balanceOf(user_add).call();
  let ccCount = await cmdCoinContract.methods.balanceOf(user_add).call();

  loggedUser['eth_address'] = ethereum.selectedAddress;

  loggedUser["balance"] = await web3.eth.getBalance(user_add) / oneCoin;

  loggedUser["icCount"] = icCount / oneCoin;
  loggedUser["ccCount"] = ccCount / oneCoin;

}



export function SendSelectedCoin(user, tokenType, recipientsAddress, tokenAmount = 0) {

  let transferAmount = BigNumber(tokenAmount).multiply(BigNumber(10).pow(18));
  let erc20TokenContractAddress = '';


  let allowAmount = 0;
  return async (dispatch) => {

    try {
      const fromAddress = user.user.eth_address

      switch (tokenType) {
        case "InitCoin":
          erc20TokenContractAddress = contents.INIT_TOKEN_ADDR;

          const initCoinAllowSendContract = await initCoinContract.methods.allowance(fromAddress, contents.SEND_COIN_ADDR).call();

          window.initCoinContract = initCoinContract;

          console.log("initCoinAllowSendContract", initCoinAllowSendContract);
          console.log("transferAmount", transferAmount.toString());
          console.log("transferAmount", parseInt(transferAmount.toString()));
          if (parseInt(transferAmount.toString()) > initCoinAllowSendContract) {

            const approveInitContract = await initCoinContract.methods.approve(contents.SEND_COIN_ADDR, transferAmount).send({ from: fromAddress });

          }

          break;

        case "CMDCoin":

          erc20TokenContractAddress = contents.CMD_TOKEN_ADDR;

          const cmdCoinAllowSendContract = await cmdCoinContract.methods.allowance(fromAddress, contents.SEND_COIN_ADDR).call();

          if (transferAmount > cmdCoinAllowSendContract) {
            console.log("msgText", contents.CMD_TOKEN_ADDR)
            const approveCmdContract = await cmdCoinContract.methods.approve(contents.SEND_COIN_ADDR, transferAmount).send({ from: fromAddress });

          }
          break;

        default:
          break;
      }

      const setToken = await sendCoinContract.methods.swap(erc20TokenContractAddress, fromAddress, recipientsAddress, transferAmount).send({ from: fromAddress });


      await getBalance(fromAddress)

      return dispatch({
        type: 'COIN_TRANSFER_SUCCESS',
        json: { type: "success", data: { setToken: setToken, bale: loggedUser } }
      })
    } catch (e) {
      return dispatch({
        type: 'COIN_TRANSFER_ERROR',
        json: { type: "error", data: e }
      })
    }

  }
}




export function check_login() {
  return (dispatch) => {
    if (typeof window.ethereum !== "undefined") {
      return setTimeout(() => {
        metamask_login_chk(dispatch);
      }, 1000);
    }
  };
}

export function user_logout() {
  return (dispatch) => {
    if (typeof window.ethereum !== "undefined") {
      if (
        ethereum.isMetaMask &&
        ethereum.selectedAddress != (null || undefined)
      ) {
        return dispatch({
          type: "LOGOUT_SUCCESS",
          json: { data: {} },
        });
      }
    }
  };
}