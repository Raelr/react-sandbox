import React, { useState } from 'react'
import { registerUser } from '../../../services/users'
import Link from '../../../components/UI/Link'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Form from '../../../components/UI/Form/Form'
import formConfig from './formConfig'

const RegisterUserForm = (props) => {
  const [registrationData, setRegistrationData] = useState({
    message: '',
    isLoading: false,
  })

  const registerUserhandler = (event, formData) => {
    event.preventDefault()

    const username = formData.formData['username'].value
    const password = formData.formData['password'].value

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
      isLoading: isLoading,
    }
    setRegistrationData(updatedRegistrationData)
  }

  return (
    <>
      <h1>REGISTER USER</h1>
      <Form
        formData={{ ...formConfig, submitHandler: registerUserhandler }}
        formEnabled={!registrationData.isLoading}
      />
      {registrationData.isLoading ? <Spinner /> : <p>{registrationData.message}</p>}
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

export default RegisterUserForm
