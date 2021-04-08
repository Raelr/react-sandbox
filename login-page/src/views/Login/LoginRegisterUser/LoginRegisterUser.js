import React from 'react'
import Button from '../../../components/UI/Button/Button'
import Label from '../../../components/UI/Label/Label'
import Input from '../../../components/UI/Input/Input'

const loginRegisterUser = (props) => {
  return (
    <form>
      <Label label="username">Username:</Label>
      <br />
      <Input type="text" id="username" name="username" onChange={props.updateUsernameHandler} />
      <br />
      <Label label="password">Password:</Label>
      <br />
      <Input type="password" id="password" name="password" onChange={props.passwordUpdateHandler} />
      <br />
      <Label label="confirmPassword">Confirm Password:</Label>
      <br />
      <Input type="password" id="confirmPassword" name="password" onChange={props.confirmPasswordUpdateHandler} />
      <br />
      <Button onClick={props.registerHandler} isDisabled={props.isDisabled}>
        Register
      </Button>
    </form>
  )
}

export default loginRegisterUser
