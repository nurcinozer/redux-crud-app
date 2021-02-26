import React from "react"
import logo from "./logo.png"
import './App.css'
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Users from "./views/Users"
import Register from "./views/Register"
import Signin from "./views/Signin"
import { logout } from "./actions/auth.actions"

import { FaRegKissWinkHeart } from "react-icons/fa"

function App() {
  const dispatch = useDispatch()
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <BrowserRouter>
      <div className="container">
        <header className="nav">
          <div className="brand">
            <a href="/"><img src={logo} alt="Advopass" /></a>
          </div>
          <div className="nav-links">
            {userInfo ? (
              <button type="button" onClick={handleLogout} className="btn-link">Logout</button>
            ) : (
                <Link to="/signin">Sign In</Link>
              )}
          </div>
        </header>
        <main className="main">
          <div className="content">
            {userInfo ? <Route path="/" exact={true} component={Users} /> : <Route path="/signin" component={Signin} />}
            <Route path="/register" component={Register} />
          </div>
        </main>
        <footer className="footer">for Advopass <FaRegKissWinkHeart /></footer>
      </div>
    </BrowserRouter>
  )
}

export default App;
