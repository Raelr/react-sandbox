import React from 'react'
import registerUser from '../../../services/users'
import Button from '../../../components/UI/Button/Button'
import Label from '../../../components/UI/Label/Label'
import Input from '../../../components/UI/Input/Input'
import Link from '../../../components/UI/Link'

const loginUser = (props) => {
  const loginUserhandler = (event) => {
    event.preventDefault()

    props.loginLoadingHandler(true, null)

    const { username, password } = props.loginState

    registerUser(username, password)
      .then((response) => {
        let message = ''

        switch (response.data.code) {
          case 200:
            message = 'User authenticated! Logging in...'
            break
          case 401:
            message = 'Username or Password are incorrect!'
            break
          default:
            message = 'Unknown error. Please try again later.'
            break
        }
        props.loginLoadingHandler(false, message)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <form>
        <Label label="username">Username:</Label>
        <Input type="text" id="username" name="username" onChange={props.updateUsernameHandler} />
        <Label label="password">Password:</Label>
        <Input type="password" id="password" name="password" onChange={props.passwordUpdateHandler} />
        <Button onClick={loginUserhandler} isDisabled={props.isDisabled}>
          Login
        </Button>
      </form>
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
