import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  userListReducer,
  userSaveReducer,
  userDeleteReducer
} from "./reducers/userReducers";
import {
  userSigninReducer,
  userRegisterReducer,
} from './reducers/authReducers';
import cookie from "js-cookie";
const userInfo = cookie.getJSON('userInfo') || null;
const initialState = { userSignin: { userInfo } }
const reducer = combineReducers({
  userList: userListReducer,
  userSave: userSaveReducer,
  userDelete: userDeleteReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer
})
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
