import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import style from './login.module.css'
import app from '../../constants/ApiKeys'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleOnChangeLogin = (event) => {
    setEmail(event.target.value)
  }
  const handleOnChangePassword = (event) => {
    setPassword(event.target.value)
  }
  const navigate = useNavigate()
  const login = async () => {
    try {
      const doLogin = await app
        .auth()
        .signInWithEmailAndPassword(email, password)

      if (doLogin.user) {
        return navigate('/panel/')
      }
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className={style.container}>
      <div className={style.box}>
        <h1 className={style.heading}>SportsBoost</h1>
        <div className={style.form}>
          <input
            autoComplete="off"
            value={email}
            className={style.input}
            placeholder="Login "
            type="text"
            onChange={handleOnChangeLogin}
          />
          <input
            autoComplete="off"
            value={password}
            className={style.input}
            placeholder="Password"
            type="password"
            onChange={handleOnChangePassword}
          />
          <button
            className={style.buttonStyle}
            type="password"
            onClick={() => login()}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
