import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";

import thunk from 'redux-thunk';


const initialState = { };


export default function configureStore() {
  const store = createStore(
    rootReducer,
    initialState,
    (
      applyMiddleware(
        thunk,
      )
    )
  );
  return store;
}
