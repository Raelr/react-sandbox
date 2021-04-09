import React, { useState } from 'react'
import './Login.css'
import LoginUser from './LoginUser/LoginUser'
import LoginRegisterUser from './LoginRegisterUser/LoginRegisterUser'
import Spinner from '../../components/UI/Spinner/Spinner'
import { registerUser, cancelRequest } from '../../services/users'

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
    username: '',
    password: '',
    isRegisteringUser: false,
  })

  const [isMatchingPasswords, setIsMatchingPasswords] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginStyle, setLoginStyle] = useState(loginStates.DEFAULT)
  const [loginStatus, setLoginStatus] = useState('')

  const registerUserhandler = (event) => {
    event.preventDefault()

    setIsLoading(true)

    const { username, password } = loginState

    setLoginStyle(loginStates.REGISTER_LOADING)

    registerUser(username, password)
      .then((response) => {
        setIsLoading(false)
        setLoginStyle(loginStates.REGISTER_LOADING_CLOSE)

        switch (response.data.code) {
          case 200:
            setLoginStatus('Account created!')
            break
          case 403:
            setLoginStatus('User already exists!')
            break
          default:
            setLoginStatus('Unknown error. Please try again later.')
            break
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const userNameUpdateHandler = ({ target }) => {
    let username = target.value
    setLoginState({
      ...loginState,
      username,
    })
  }

  const passwordUpdateHandler = ({ target }) => {
    let password = target.value
    setLoginState({
      ...loginState,
      password,
    })
  }

  const confirmPasswordUpdateHandler = ({ target }) => {
    let input = target.value
    setIsMatchingPasswords(input === loginState.password && input.length > 0 && loginState.password.length > 0)
  }

  const selectRegisterUserHandler = () => {
    setLoginState({
      username: '',
      password: '',
      isRegisteringUser: !loginState.isRegisteringUser,
    })
    setLoginStatus('')
    if (isLoading) cancelRequest()
    setIsLoading(false)
    setLoginStyle(loginState.isRegisteringUser ? loginStates.CLOSE_TO_LOGIN : loginStates.REGISTER)
  }

  const loginLoadingStateHandler = (loading, message) => {
    setLoginStyle(loading ? loginStates.LOADING : loginStates.CLOSE)
    setIsLoading(loading)
    setLoginStatus(message)
  }

  const loginComponent = loginState.isRegisteringUser ? (
    <LoginRegisterUser
      registerHandler={registerUserhandler}
      updateUsernameHandler={userNameUpdateHandler}
      passwordUpdateHandler={passwordUpdateHandler}
      confirmPasswordUpdateHandler={confirmPasswordUpdateHandler}
      isDisabled={!isMatchingPasswords || !loginState.username.length > 0 || isLoading}
      transitionHandler={selectRegisterUserHandler}
    />
  ) : (
    <LoginUser
      updateUsernameHandler={userNameUpdateHandler}
      passwordUpdateHandler={passwordUpdateHandler}
      isDisabled={isLoading}
      registrationSelectedHandler={selectRegisterUserHandler}
      transitionHandler={selectRegisterUserHandler}
      loginLoadingHandler={loginLoadingStateHandler}
      loginState={loginState}
    />
  )

  return (
    <div className={loginStyle}>
      <h1>{loginState.isRegisteringUser ? 'REGISTER USER' : 'LOGIN PAGE'}</h1>
      {loginComponent}
      {isLoading ? <Spinner /> : <p>{loginStatus}</p>}
    </div>
  )
}

export default Login
