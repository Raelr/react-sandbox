import React, { useState } from 'react'
import { registerUser } from '../../../services/users'
import Button from '../../../components/UI/Button/Button'
import Label from '../../../components/UI/Label/Label'
import Input from '../../../components/UI/Input/Input'
import Link from '../../../components/UI/Link'
import Spinner from '../../../components/UI/Spinner/Spinner'

const loginRegisterUser = (props) => {
  const [registrationData, setRegistrationData] = useState({
    userData: {
      username: '',
      password: '',
    },
    message: '',
    isLoading: false,
    isMatchingPasswords: false,
  })

  const usernameChangedhandler = ({ target }) => {
    const username = target.value
    const updatedUserData = { ...registrationData.userData, username }
    setRegistrationData({
      ...registrationData,
      userData: updatedUserData,
    })
  }

  const passwordChangedhandler = ({ target }) => {
    const password = target.value
    const updatedUserData = { ...registrationData.userData, password }
    setRegistrationData({
      ...registrationData,
      userData: updatedUserData,
    })
  }

  const confirmPasswordUpdateHandler = ({ target }) => {
    const input = target.value
    const { password } = registrationData.userData
    const updatedRegistrationData = {
      ...registrationData,
      isMatchingPasswords: input === password && input.length > 0 && password.length > 0,
    }
    setRegistrationData(updatedRegistrationData)
  }

  const registerUserhandler = (event) => {
    event.preventDefault()

    const { username, password } = registrationData.userData

    props.registerLoadingHandler(true)
    setIsLoading(true)

    registerUser(username, password)
      .then((response) => {
        switch (response.data.code) {
          case 200:
            registrationData.message = 'Account created!'
            break
          case 403:
            registrationData.message = 'User already exists!'
            break
          default:
            registrationData.message = 'Unknown error. Please try again later.'
            break
        }
        props.registerLoadingHandler(false)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const setIsLoading = (isLoading) => {
    const updatedRegistrationData = {
      ...registrationData,
      userData: { ...registrationData.userData },
      isLoading,
    }
    setRegistrationData(updatedRegistrationData)
  }

  return (
    <>
      <h1>REGISTER USER</h1>
      <form>
        <Label label="username">Username:</Label>
        <Input type="text" id="username" name="username" onChange={usernameChangedhandler} />
        <Label label="password">Password:</Label>
        <Input type="password" id="password" name="password" onChange={passwordChangedhandler} />
        <Label label="confirmPassword">Confirm Password:</Label>
        <Input type="password" id="confirmPassword" name="password" onChange={confirmPasswordUpdateHandler} />
        <Button
          onClick={registerUserhandler}
          isDisabled={
            !registrationData.isMatchingPasswords ||
            !registrationData.userData.username.length > 0 ||
            registrationData.userData.isLoading
          }
        >
          Register
        </Button>
      </form>
      {registrationData.isLoading ? <Spinner /> : registrationData.message}
      <div className={'RegisterDiv'}>
        <Link
          preLinkText={'Already have an account? Login '}
          linkText={'Here!'}
          postLinkText
          onClick={props.transitionHandler}
        />
      </div>
    </>
  )
}

export default loginRegisterUser
