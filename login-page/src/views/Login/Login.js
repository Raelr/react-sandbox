import React, { useState } from 'react'
import './Login.css'
import LoginUser from './LoginUser/LoginUser'
import LoginRegisterUser from './LoginRegisterUser/LoginRegisterUser'

const Login = () => {
  const loginStates = {
    DEFAULT: 'Login Default',
    LOADING: 'Login Loading',
    CLOSE: 'Login Close',
    REGISTER: 'Login Register',
    REGISTER_LOADING: 'Login RegisterLoading',
    REGISTER_LOADING_CLOSE: 'Login RegisterLoadingClose',
    CLOSE_TO_LOGIN: 'Login CloseToLogin',
  }

  const [loginState, setLoginState] = useState({
    isRegisteringUser: false,
  })

  const [loginStyle, setLoginStyle] = useState(loginStates.DEFAULT)

  const selectRegisterUserHandler = () => {
    setLoginState({
      isRegisteringUser: !loginState.isRegisteringUser,
    })
    setLoginStyle(loginState.isRegisteringUser ? loginStates.CLOSE_TO_LOGIN : loginStates.REGISTER)
  }

  const loginLoadingStateHandler = (loading) => {
    setLoginStyle(loading ? loginStates.LOADING : loginStates.CLOSE)
  }

  const registerLoadingStateHandler = (loading) => {
    setLoginStyle(loading ? loginStates.REGISTER_LOADING : loginStates.REGISTER_LOADING_CLOSE)
  }

  return (
    <div className={loginStyle}>
      {loginState.isRegisteringUser ? (
        <LoginRegisterUser
          transitionHandler={selectRegisterUserHandler}
          registerLoadingHandler={registerLoadingStateHandler}
          loginState={loginState}
        />
      ) : (
        <LoginUser
          registrationSelectedHandler={selectRegisterUserHandler}
          transitionHandler={selectRegisterUserHandler}
          loginLoadingHandler={loginLoadingStateHandler}
          loginState={loginState}
        />
      )}
    </div>
  )
}

export default Login
