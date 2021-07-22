import React, { useState } from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { paidMintToken } from "../../services/actions/connector"


const MintWithEth = (props) => {

  const { user, paidMint } = props


  const [tokenMint, setTokenMint] = useState(0);


  const handleTokenMint = () => {
    alert(tokenMint)
    props.paidMintToken(user, tokenMint)
  }


  return (
    <div className="card-login bg-white w-100">
      <div className="accordion" id="accordionMintWithEth">
        <div className="accordion-item">
          <h2 className="accordion-header" id="mintWithEth">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMintWithEth" aria-expanded="true" aria-controls="collapseMintWithEth">
              Mint With Eth
            </button>
          </h2>
          <div id="collapseMintWithEth" className="accordion-collapse collapse " aria-labelledby="mintWithEth" data-bs-parent="#accordionMintWithEth">
            <div className="accordion-body">
              <div className="mb-3">

                <div>
                </div>
                <div>
                  <label htmlFor="sendInput1" className="form-label">No. Of Tokens</label>
                  <input type="number" className="form-control" id="sendInput1" placeholder="Enter Number Of Token" value={tokenMint} min="0" onChange={e => setTokenMint(e.target.value)} />

                </div>

              </div>
              <div className="mb-3">
                <button type="button " className="btn btn-primary" onClick={handleTokenMint} >Mint Now</button>
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
  paidMint: (state) => state.paidMint
});
const mapDisactcProps = { paidMintToken };

export default connect(structuredSelector, mapDisactcProps)(MintWithEth);
