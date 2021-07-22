import React, { useState } from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { mintToken } from "../../services/actions/connector"


const FreeMint = (props) => {

  const { user, minting } = props
  const [mintCount, setMintCount] = useState(0)

  console.log("helloe ", props.user)
  console.log("minting ", props.minting)


  const handleMintButton = () => {
    props.mintToken(user, mintCount);
  }
  return (
    <div className="card-login bg-white">
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Free IC Mint Now
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">IC Token Mint</label>
                <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter Number Of Token" value={mintCount} onChange={e => setMintCount(e.target.value)} />
                {minting.type == 'error' ? (
                  <>
                    <h6 className="text-danger text-center">Error</h6>
                    <p className="text-dark text-wrap">{minting.data.message}</p>
                  </>
                ) : ""}

                {minting.type == 'success' ? (
                  <>
                    <h6 className="text-dark text-center mt-3">Congratulations!</h6>
                    <p className="text-dark text-break text-center">{mintCount} IC Coin Minted</p>
                    <p className="text-dark text-break text-center">{minting.data.setToken.transactionHash}</p>
                  </>
                ) : ""}



              </div>
              <div className="mb-3">
                <button type="button " className="btn btn-primary" onClick={handleMintButton} >Mint Now</button>
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
  // readMsg: (state) => state.readMsg,
  // updateIcTransfer: (state) => state.updateIcTransfer
  minting: (state) => state.mintToken,
});
const mapDisactcProps = { mintToken };

export default connect(structuredSelector, mapDisactcProps)(FreeMint);