import React from 'react'
import Button from '../../../components/UI/Button/Button'
import Label from '../../../components/UI/Label/Label'
import Input from '../../../components/UI/Input/Input'

const loginUser = (props) => (
  <form>
    <Label label="username">Username:</Label>
    <Input type="text" id="username" name="username" onChange={props.updateUsernameHandler} />
    <Label label="password">Password:</Label>
    <Input type="password" id="password" name="password" onChange={props.passwordUpdateHandler} />
    <Button onClick={props.loginHandler} isDisabled={props.isDisabled}>
      Login
    </Button>
  </form>
)

export default loginUser
