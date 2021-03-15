import React, { useState } from 'react'
import classes from './Login.module.css'
import LoginUser from './LoginUser/LoginUser'
import LoginRegisterUser from './LoginRegisterUser/LoginRegisterUser'
import axios from '../../axios-users'
import Spinner from '../UI/Spinner/Spinner'

const Login = () => {

    const [loginState, setLoginState] = useState(
        {
            username: "",
            password: "", 
            isRegisteringUser: false
        })
    const [isMatchingPasswords, setIsMatchingPasswords] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [loginStyle, setLoginStyle] = useState([classes.Login, classes['Default']]);
    const [loginStatus, setLoginStatus] = useState("")

    let loginClass = loginStyle;

    const loginUserHandler = (event) => {
        event.preventDefault()

        setIsLoading(true)

        axios({
            method: 'post',
            url: '/app/users/authentication',
            data: {
                username: loginState.username,
                password: loginState.password
            },
        }).then((response) => {
            setIsLoading(false)
            loginClass = loginStyle;

            loginClass.splice(loginClass.indexOf(classes['Loading']))
            setLoginStyle([...loginClass, classes['Close']])

            switch(response.data.code) {
                case 200:
                    setLoginStatus("User authenticated! Logging in...")
                    break
                case 401:
                    setLoginStatus("Username or Password are incorrect!")
                    break
                default: 
                    setLoginStatus("Unknown error. Please try again later.")
                    break
            }
        }).catch(error => {
            console.log(error)
        });
    }

    const registerUserhander = (event) => {
        event.preventDefault()

        setIsLoading(true)

        axios({
            method: 'post',
            url: '/app/users/register',
            data: {
                username: loginState.username,
                password: loginState.password
            },
        }).then((response) => {
            setIsLoading(false)
            loginClass.splice(loginClass.indexOf(classes['RegisterLoading']))
            setLoginStyle([...loginClass, classes['RegisterLoadingClose']])
            
            switch(response.data.code) {
                case 200:
                    setLoginStatus("Account created!")
                    break
                case 403:
                    setLoginStatus("User already exists!")
                    break
                default: 
                    setLoginStatus("Unknown error. Please try again later.")
                    break
            }

        }).catch(error => {
            console.log(error)
        });
    }

    const userNameUpdateHandler = (event) => {
        let input = event.target.value
        setLoginState({username: input, password: loginState.password, isRegisteringUser: loginState.isRegisteringUser})
    }

    const passwordUpdateHandler = (event) => {
        let input = event.target.value
        setLoginState({username: loginState.username, password: input, isRegisteringUser: loginState.isRegisteringUser})
    }

    const confirmPasswordUpdateHandler = (event) => {
        let input = event.target.value
        setIsMatchingPasswords(input === loginState.password && (input.length > 0 && loginState.password.length > 0))
    }

    const selectRegisterUserHandler = () => {
        setLoginState({username: "", password: "", isRegisteringUser: !loginState.isRegisteringUser})
        setLoginStatus("")
    }

    let login = <LoginUser 
            loginHandler={loginUserHandler} 
            updateUsernameHandler={userNameUpdateHandler}
            passwordUpdateHandler={passwordUpdateHandler}
            isDisabled={isLoading}
        />
    
    let loginMessage = 'Don\'t have an account? Register ';

    if (loginState.isRegisteringUser) {
        login = <LoginRegisterUser
            registerHandler={registerUserhander}
            updateUsernameHandler={userNameUpdateHandler}
            passwordUpdateHandler={passwordUpdateHandler}
            confirmPasswordUpdateHandler={confirmPasswordUpdateHandler}
            isDisabled={(!isMatchingPasswords || !loginState.username.length > 0 || isLoading)}
        />
        loginMessage = 'Already have an account? Login '
    }

    if (loginState.isRegisteringUser) {
        if (!loginClass.find((style) => style === classes['Register'])) {
            if (loginClass.indexOf(classes['Default']) !== -1 || loginClass.indexOf(classes['Close']) !== -1 || loginClass.indexOf(classes['CloseToLogin']) !== -1) {
                loginClass.splice(loginClass.indexOf(classes['Default']))
                loginClass.push(classes['Register'])
            }
        } 
        if (isLoading) {
            if (!loginClass.find((style) => style === classes['RegisterLoading'])) {
                loginClass.splice(loginClass.indexOf(classes['Register']))
                loginClass.push(classes['RegisterLoading'])
            } 
        }
    } else {
        if (loginClass.find((style) => style === classes['Register']) || loginClass.indexOf(classes['RegisterLoadingClose']) !== -1) {
            loginClass.splice(loginClass.indexOf(classes['Register']))
            if (loginClass.indexOf(classes['RegisterLoadingClose']) !== -1)
                loginClass.splice(loginClass.indexOf(classes['RegisterLoadingClose']))
            loginClass.push(classes['CloseToLogin'])
        }

        if (isLoading && !loginClass.find((style) => style === classes['Loading']) ) {
            loginClass.splice(loginClass.indexOf(classes['Default']))
            loginClass.push(classes["Loading"])
        }
    }

    if (loginClass.join(' ') !== loginStyle.join(' ')) {
        setLoginStyle(loginClass)
    }

    return (
        <div className={loginStyle.join(' ')}>
            <h1>{loginState.isRegisteringUser ? 'REGISTER USER' : 'LOGIN PAGE'}</h1>
            {login}
            {isLoading ? <Spinner/> : <p>{loginStatus}</p>}
            <div className={classes.RegisterDiv}>
                <p>
                    {loginMessage} 
                    <span className={classes.RegisterLink} onClick={selectRegisterUserHandler}>
                        Here!
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;