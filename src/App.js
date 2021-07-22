
import './App.css';
import React, { 
  Suspense,
  StrictMode,
  Component,
  useEffect,
  useState } from "react";

import {
  Route,
  BrowserRouter,
  useLocation,
  withRouter,
  Switch,
} from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

import { Provider } from "react-redux";

import configureStore from "./services/configureStore";

import "./App.css"


const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={null}>
        <BrowserRouter>
        
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
          
        </BrowserRouter>
      </Suspense>
    </Provider>
  );
}

export default App;
