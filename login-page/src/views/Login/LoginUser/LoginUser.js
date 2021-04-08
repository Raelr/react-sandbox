import React from 'react'
import Button from '../../../components/UI/Button/Button'
import Label from '../../../components/UI/Label/Label'
import Input from '../../../components/UI/Input/Input'

const loginUser = (props) => (
  <form>
    <Label label="username">Username:</Label>
    <br />
    <Input type="text" id="username" name="username" onChange={props.updateUsernameHandler} />
    <br />
    <Label label="password">Password:</Label>
    <br />
    <Input type="password" id="password" name="password" onChange={props.passwordUpdateHandler} />
    <br />
    <Button onClick={props.loginHandler} isDisabled={props.isDisabled}>
      Login
    </Button>
  </form>
)

export default loginUser
