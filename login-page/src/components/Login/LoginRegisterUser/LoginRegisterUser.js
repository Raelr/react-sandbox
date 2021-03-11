import React from 'react'
import Button from '../../UI/Button/Button'
import Label from '../../UI/Label/Label'
import Input from '../../UI/Input/Input'

const loginRegisterUser = (props) => {
    return (
    <form>
            <Label label='username'>Username:</Label>
        <br/>
            <Input type='text' id='username' name='username' onChange={props.updateUsernameHandler}></Input>
        <br/>
            <Label label='password'>Password:</Label>
        <br/>
            <Input type='password' id='password' name='password' onChange={props.passwordUpdateHandler}></Input>
        <br/>
            <Label label='confirmPassword'>Confirm Password:</Label>
        <br/>
            <Input type='password' id='confirmPassword' name='password' onChange={props.confirmPasswordUpdateHandler}></Input>
        <br/>
            <Button onClick={props.registerHandler} isDisabled={props.isDisabled}>Register</Button>
    </form>
    );
}

export default loginRegisterUser