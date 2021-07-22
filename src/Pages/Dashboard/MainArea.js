import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { transferIcToken, getMessage } from "../../services/actions/connector"

import FreeMint from '../../component/FreeMint';
import TransferInitCoin from "../../component/TransferToken/TransferInitCoin"
import SendSelectedToken from "../../component/SendSelectedToken"
import MintWithEth from '../../component/MintWithEth';


const MainArea = (props) => {

  const { user, setBalance } = props

  console.log("user-----------", user)
  console.log("setBalance-----------", setBalance.payload)

  return (
    <div className="pt-5">
      <div className="container">
        {/* {setBalance.data ==undefined ? 'hi' : 'hello'} */}
        <h5>Eth Address : {user.user.eth_address}  </h5>
        <h5>Eth Balance : {user.user.balance}       </h5>
        <h5>InitCoins:    {user.user.icCount}       </h5>
        <h5>CmdCoins:     {user.user.ccCount}       </h5>
        <div className="row">
          <div className="col-lg-4">
            <FreeMint />
          </div>
          <div className="col-lg-4">
            <TransferInitCoin />

          </div>
          <div className="col-lg-4">
            ``
            <SendSelectedToken />
          </div>

          <div className="col-lg-4">

            <MintWithEth />
          </div>

        </div>
      </div>
    </div>
  )
}

const structuredSelector = createStructuredSelector({
  user: (state) => state.user,

  readMsg: (state) => state.readMsg,
  updateIcTransfer: (state) => state.updateIcTransfer,

  minting: (state) => state.mintToken,
  coinTransfer: (state) => state.coinTransfer,
  paidMint: (state) => state.paidMint,
  setBalance: (state) => state.setBalance,

});
const mapDisactcProps = { transferIcToken, getMessage, transferIcToken };
export default connect(structuredSelector, mapDisactcProps)(MainArea);
