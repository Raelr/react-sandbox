import React from 'react'
import Button from '../../../components/UI/Button/Button'
import Label from '../../../components/UI/Label/Label'
import Input from '../../../components/UI/Input/Input'
import Link from '../../../components/UI/Link'

const loginRegisterUser = (props) => {
  return (
    <>
      <form>
        <Label label="username">Username:</Label>
        <Input type="text" id="username" name="username" onChange={props.updateUsernameHandler} />
        <Label label="password">Password:</Label>
        <Input type="password" id="password" name="password" onChange={props.passwordUpdateHandler} />
        <Label label="confirmPassword">Confirm Password:</Label>
        <Input type="password" id="confirmPassword" name="password" onChange={props.confirmPasswordUpdateHandler} />
        <Button onClick={props.registerHandler} isDisabled={props.isDisabled}>
          Register
        </Button>
      </form>
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
