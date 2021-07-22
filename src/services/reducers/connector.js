var BigNumber = require('big-number');
export function userReducer(state = { login: false, user: false, network: true, error: '' }, action) {

  console.log("action", action.type)
  switch (action.type) {
    case "LOGIN_SUCCESS":
      let obj = { login: true, user: action.json.data, network: true }
      return obj
      break;
    case "LOGIN_ERROR_CALL_NETWORK":
      return { login: false, user: false, network: false }
      break;
    case "LOGIN_ERROR_CALL_REJECT":

      return { login: false, user: false, network: true, error: action.json.data }
      break;
    case "LOGOUT_SUCCESS":
      return { login: false, user: false, network: true }
  }
  return state;
}


export function getMsgReducer(state = { type: "", data: false, msg: { text: "" } }, action) {
  console.log("fdfndfj", action.type)
  switch (action.type) {
    case "GET_MESSAGE_SUCCESS":
      return action.json;
  }
  return state;

}

// export function transferTokenReducer(state = { type: "", data: false, msg: { text: "" } }, action) {

//   switch (action.type) {
//     case "SEND_TOKEN_SUCCESS":
//       return action.json;
//       break;
//     case "SEND_TOKEN_FAIL":
//       return action.json;
//       break;


//   }

// }
export function setIcTransferReducer(state = { type: "", data: false, msg: { text: "" } }, action) {

  switch (action.type) {
    case "SET_IC_TRANSFER_SUCCESS":
      return action.json;
      break;

    case "SET_IC_TRANSFER_ERROR":
      return action.json;
      break;

  }
  return state;

}


export function coinTransferReducer(state = { type: "", data: false, msg: { text: "" } }, action) {
  console.log("action", action)
  switch (action.type) {
    case "COIN_TRANSFER_SUCCESS":
      return action.json;
      break;

    case "COIN_TRANSFER_ERROR":

      console.log("action message", action.json.data)
      return action.json;
      break;

  }
  return state;

}
export function setMintReducer(state = { type: "", data: false, msg: { text: "" } }, action) {

  switch (action.type) {
    case "SET_MINT_SUCCESS":
      return action.json;
      break;

    case "SET_MINT_ERROR":
      return action.json;
      break;

  }
  return state;

}
export function paidMintReducer(state = { type: "", data: false, msg: { text: "" } }, action) {

  switch (action.type) {
    case "PAID_MINT_SUCCESS":
      return action.json;
      break;

    case "PAID_MINT_ERROR":
      return action.json;
      break;

  }
  return state;

}


export function setBalance(state = { from: null, to: null, amount: new BigNumber(0) }, action) {
  let data = {};
  switch (action.type) {
    case "RESET_USER_DATA":

      data = { ...state }
      data["payload"] = { from: null, to: null, amount: new BigNumber(0) }
      return data;
      break;
    case "SET_USER_DATA":
      data = { ...state };
      console.log("data ->", action.json)
      let amount = new BigNumber(action.json.data.value.toString());
      data["payload"] = { from: action.json.data.from, to: action.json.data.to, amount: amount }
      return data
      break;


  }
  return state;
}

