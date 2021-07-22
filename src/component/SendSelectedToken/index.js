import React, { useState } from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { SendSelectedCoin } from "../../services/actions/connector"


const SendSelectedToken = (props) => {

  const { user, coinTransfer } = props

  console.log("coinTransfer", coinTransfer)
  const [selectToken, setSelectToken] = useState(0)
  const [recipientAddress, setRecipientAddress] = useState(0)
  const [tokenCount, setTokenCount] = useState(0)

  const handleSendNowButton = () => {

    props.SendSelectedCoin(user, selectToken, recipientAddress, tokenCount);
  }
  return (
    <div className="card-login bg-white w-100">
      <div className="accordion" id="accordionSendToken">
        <div className="accordion-item">
          <h2 className="accordion-header" id="sendCoinS">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSendToken" aria-expanded="true" aria-controls="collapseSendToken">
              Send Token
            </button>
          </h2>
          <div id="collapseSendToken" className="accordion-collapse collapse " aria-labelledby="sendCoinS" data-bs-parent="#accordionSendToken">
            <div className="accordion-body">
              <div className="mb-3">

                <div>
                  <label htmlFor="sendInput1" className="form-label">Select Token</label>
                  <select className="form-control" name="tokens" onChange={e => setSelectToken(e.target.value)}>
                    <option value="0">Select Token</option>
                    <option value="InitCoin">InitCoin</option>
                    <option value="CMDCoin">CMDCoin</option>
                  </select>

                </div>
                <div>
                  <label htmlFor="sendInput1" className="form-label">Recipient Address</label>
                  <input type="text" className="form-control" id="sendInput1" placeholder="Enter Recipient Address" value={recipientAddress} onChange={e => setRecipientAddress(e.target.value)} />

                </div>
                <div>
                  <label htmlFor="sendInput1" className="form-label">No. Of Tokens</label>
                  <input type="number" className="form-control" id="sendInput1" placeholder="Enter Number Of Token" value={tokenCount} onChange={e => setTokenCount(e.target.value)} min="0" />

                </div>


                {coinTransfer.type == 'error' ? (
                  <>
                    <h6 className="text-danger text-center">Error</h6>
                    <p className="text-dark text-wrap">{coinTransfer.data.message}</p>
                  </>
                ) : ""}

                {coinTransfer.type == 'success' ? (
                  <>
                    <h6 className="text-dark text-center mt-3">Congratulations!</h6>
                    {/* <p className="text-dark text-break text-center">{mintCount} IC Coin Minted</p> */}
                    <p className="text-dark text-break text-center">{coinTransfer.data.setToken.transactionHash}</p>
                  </>
                ) : ""}



              </div>
              <div className="mb-3">
                <button type="button " className="btn btn-primary" onClick={handleSendNowButton} >Send Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const structuredSelector = createStructuredSelector({
  user: (state) => state.user,
  coinTransfer: (state) => state.coinTransfer
});
const mapDisactcProps = { SendSelectedCoin };

export default connect(structuredSelector, mapDisactcProps)(SendSelectedToken);