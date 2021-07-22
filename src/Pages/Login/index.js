import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { metamaskLogin, check_login } from "../../services/actions";


import * as contents from "../../services/constants"

const Login = (props) => {

  const { user } = props

  console.log("user", user)
  const handleClick = () => {
    if (typeof window.ethereum !== "undefined") {
      props.metamaskLogin();

    } else {
      window.open("https://metamask.app.link/dapp/" + contents.DOMAIN_NAME.replace("https://", "").replace("http://", "") + "/dashboard?login=metamask");
    }


  };

  // useEffect(()=>{
  //   console.log("user 0>",user)

  //   if(user.login){
  //     console.log('hih')

  //     props.history.push("/dashboard");
  //   }else{
  //     props.check_login();
  //   }
  // },[user.login]);


  return (
    <div>
      <div className="container">
        <div className="card card-login mx-auto text-center bg-dark">
          <div className="card-header mx-auto bg-dark">
            <span className="logo_title mt-5"> Login For Minting </span>
          </div>
          <div className="card-body">
            <form action="" method="post">
              <div className="form-group">
                <button
                  className=""
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Connect with metamask
                </button>
              </div>
              <h5 className="text-danger mt-4">{user.type == "error" ? user.data.message : ""}</h5>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const structuredSelector = createStructuredSelector({
  user: (state) => state.user,

  setBalance: (state) => state.setBalance
});
const mapDisactcProps = { metamaskLogin, check_login };
export default connect(structuredSelector, mapDisactcProps)(Login);
