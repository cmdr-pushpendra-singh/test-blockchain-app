import React, { useState } from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { transferIcToken } from "../../services/actions/connector"

const TransferInitCoin = (props) => {
  const [recipientsAddress, setRecipientsAddress] = useState('0x0000000');
  const [tokenCount, setTokenCount] = useState(0);
  const { user, updateIcTransfer } = props



  let balance = user.user.balance;
  console.log("update message", updateIcTransfer)

  const handleTransfer = () => {
    props.transferIcToken(user, recipientsAddress,tokenCount);
  }
  return (
    <div >

      <div className="card-login bg-white">
        <div className="accordion" id="transfer">
          <div className="accordion-item">
            <h2 className="accordion-header" id="transferOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTransfer" aria-expanded="true" aria-controls="collapseTransfer">
                Transfer InitCoin
              </button>
            </h2>
            <div id="collapseTransfer" className="accordion-collapse collapse " aria-labelledby="transferOne" data-bs-parent="#transfer">
              <div className="accordion-body">
               
                <div className="card-body">
                  <form action="" method="post">
                    <div className="form-group">

                    <label htmlFor="exampleFormControlInput1" className="form-label">Recipient</label>
                      <input type="text" name="set_eth_value" className="form-control" id="exampleFormControlInput1" value={recipientsAddress} onChange={e => setRecipientsAddress(e.target.value)} />
                    </div>
                    <div className="form-group my-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">IC Token </label>
                  

                      <input  className="form-control" placeholder="" id="exampleFormControlInput1" type="text" name="set_eth_value" value={tokenCount} onChange={e => setTokenCount(e.target.value)} />
                    </div>
                    <div className="form-group mt-2">


                      <button className="btn btn-primary" type="button" onClick={() => { handleTransfer() }}>
                        Send Now
                      </button>
                    </div>
                    {updateIcTransfer.type == 'error' ? (
                      <>
                        <h6 className="text-danger text-center">Error</h6>
                        <p className="text-dark text-wrap">{updateIcTransfer.data.message}</p>
                      </>
                    ) : ""}

                    {updateIcTransfer.type == 'success' ? (
                      <>
                        <h6 className="text-dark text-center mt-3">Congratulations!</h6>
                        <p className="text-dark text-break">{updateIcTransfer.data.setToken.transactionHash}</p>
                      </>
                    ) : ""}



                  </form>
                </div>
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
  updateIcTransfer: (state) => state.updateIcTransfer
});
const mapDisactcProps = { transferIcToken };

export default connect(structuredSelector, mapDisactcProps)(TransferInitCoin);