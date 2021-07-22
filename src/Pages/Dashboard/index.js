import React,{useState,useEffect} from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { metamaskLogin } from '../../services/actions';
import Login from '../Login';
import MainArea from './MainArea';




const Dashboard = (props) => {

  const {user} = props;

  // useEffect(()=>{
  //   props.metamaskLogin();
  // })


  return (
    
    <>

{user.login ? <MainArea /> : <Login />}
    </>
  )
}

const structuredSelector = createStructuredSelector({
  user: (state) => state.user,
});
const mapDisactcProps = { metamaskLogin };
export default connect(structuredSelector, mapDisactcProps)(Dashboard);
