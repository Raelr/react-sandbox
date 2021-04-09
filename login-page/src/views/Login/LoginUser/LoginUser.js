import React, { useState } from 'react'
import authenticateUser from '../../../services/users'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'
import Label from '../../../components/UI/Label/Label'
import Input from '../../../components/UI/Input/Input'
import Link from '../../../components/UI/Link'

const loginUser = (props) => {
  const [loginCredentials, setLoginCredentials] = useState({
    userData: {
      username: '',
      password: '',
    },
    message: '',
    isLoading: false,
  })

  const usernameChangedhandler = ({ target }) => {
    const username = target.value
    const updatedUserData = { ...loginCredentials.userData, username }
    setLoginCredentials({
      ...loginCredentials,
      userData: updatedUserData,
    })
  }

  const passwordChangedhandler = ({ target }) => {
    const password = target.value
    const updatedUserData = { ...loginCredentials.userData, password }
    setLoginCredentials({
      ...loginCredentials,
      userData: updatedUserData,
    })
  }

  const loginUserhandler = (event) => {
    event.preventDefault()

    props.loginLoadingHandler(true)
    setIsLoading(true)

    const {
      userData: { username, password },
    } = loginCredentials

    console.log(username)

    authenticateUser(username, password)
      .then((response) => {
        switch (response.data.code) {
          case 200:
            loginCredentials.message = 'User authenticated! Logging in...'
            break
          case 401:
            loginCredentials.message = 'Username or Password are incorrect!'
            break
          default:
            loginCredentials.message = 'Unknown error. Please try again later.'
            break
        }
        props.loginLoadingHandler(false)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const setIsLoading = (isLoading) => {
    const updatedLoginCredentials = {
      ...loginCredentials,
      userData: { ...loginCredentials.userData },
      isLoading,
    }
    setLoginCredentials(updatedLoginCredentials)
  }

  return (
    <>
      <h1>LOGIN PAGE</h1>
      <form>
        <Label label="username">Username:</Label>
        <Input type="text" id="username" name="username" onChange={usernameChangedhandler} />
        <Label label="password">Password:</Label>
        <Input type="password" id="password" name="password" onChange={passwordChangedhandler} />
        <Button onClick={loginUserhandler} isDisabled={loginCredentials.userData.isLoading}>
          Login
        </Button>
      </form>
      {loginCredentials.isLoading ? <Spinner /> : loginCredentials.message}
      <div className={'RegisterDiv'}>
        <Link
          preLinkText={"Don't have an account? Register "}
          linkText={'Here!'}
          postLinkText
          onClick={props.transitionHandler}
        />
      </div>
    </>
  )
}

export default loginUser
