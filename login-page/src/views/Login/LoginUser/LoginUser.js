import React, { useState } from 'react'
import authenticateUser from '../../../services/users'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Link from '../../../components/UI/Link'
import Form from '../../../components/UI/Form/Form'

const loginUser = (props) => {
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

  const formData = {
    formData: {
      username: {
        elementType: 'input',
        config: {
          type: 'text',
          placeholder: 'Username',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        config: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    submitHandler: onFormSubmitted,
  }

  return (
    <>
      <h1>LOGIN PAGE</h1>
      <Form formData={formData} formEnabeled={!loginCredentials.isLoading} />
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

export default loginUser
