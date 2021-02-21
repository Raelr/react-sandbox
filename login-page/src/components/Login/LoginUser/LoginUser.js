import React from 'react'
import Button from '../../UI/Button/Button'
import Label from '../../UI/Label/Label'
import Input from '../../UI/Input/Input'

const loginUser = (props) => (
    <form>
        <Label for='username'>Username:</Label>
        <br/>
        <Input type='text' id='username' name='username' onChange={props.updateUsernameHandler}></Input><br/>
        <Label for='password'>Password:</Label>
        <br/>
        <Input type='password' id='password' name='password' onChange={props.passwordUpdateHandler}></Input>
        <br/>
        <Button onClick={props.loginHandler}>
            Login
        </Button>
    </form>
);

export default loginUser;