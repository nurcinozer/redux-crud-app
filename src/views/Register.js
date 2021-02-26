import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../actions/auth.actions'

function Register(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const userRegister = useSelector(state => state.userRegister)
  const { loading, userInfo, error } = userRegister
  const dispatch = useDispatch()

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/'
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect)
    }
    return () => {
      //
    }
  }, [userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(register(email, password))
  }
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Create Account</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Register</button>
        </li>
        <li>
          Already have an account?
          </li>
        <li>
          <Link to="/signin" className="btn" style={{ color: '#004032', textDecoration: 'none' }}>Sign in your account</Link>
        </li>

      </ul>
    </form>
  </div>
}
export default Register