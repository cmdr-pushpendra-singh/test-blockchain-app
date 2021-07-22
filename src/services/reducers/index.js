import { combineReducers } from 'redux';

import { userReducer,getMsgReducer,setIcTransferReducer,transferTokenReducer,setMintReducer, coinTransferReducer ,paidMintReducer,setBalance} from './connector';

const rootReducer = combineReducers({
  user: userReducer,
  readMsg: getMsgReducer,
  updateIcTransfer: setIcTransferReducer,
  // transferTokens: transferTokenReducer
  mintToken: setMintReducer,
  coinTransfer: coinTransferReducer,
  paidMint: paidMintReducer,
  setBalance: setBalance
});

export default rootReducer;