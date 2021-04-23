import React, { useState } from 'react'
import authenticateUser from '../../../services/users'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Link from '../../../components/UI/Link'
import Form from '../../../components/UI/Form/Form'
import formConfig from './formConfig'

const LoginUserForm = (props) => {
  const [loginCredentials, setLoginCredentials] = useState({
    message: '',
    isLoading: false,
  })

  const setIsLoading = (isLoading) => {
    const updatedLoginCredentials = {
      ...loginCredentials,
      isLoading,
    }
    setLoginCredentials(updatedLoginCredentials)
  }

  const onFormSubmitted = (event, formData) => {
    event.preventDefault()

    const username = formData.formData['username'].value
    const password = formData.formData['password'].value

    props.loginLoadingHandler(true)
    setIsLoading(true)

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

  return (
    <>
      <h1>LOGIN PAGE</h1>
      <Form formData={{ ...formConfig, submitHandler: onFormSubmitted }} formEnabled={!loginCredentials.isLoading} />
      {loginCredentials.isLoading ? <Spinner /> : <p>{loginCredentials.message}</p>}
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

export default LoginUserForm
