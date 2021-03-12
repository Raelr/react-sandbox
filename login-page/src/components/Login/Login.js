import React, { useState } from 'react'
import classes from './Login.module.css'
import LoginUser from './LoginUser/LoginUser'
import LoginRegisterUser from './LoginRegisterUser/LoginRegisterUser'
import axios from '../../axios-users'
import Spinner from '../UI/Spinner/Spinner'

const Login = () => {

    const [userInfo, setUserInfo] = useState({username: "",password: "", isRegisteringUser: false})
    const [isMatchingPasswords, setIsMatchingPasswords] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [loginStyle, setLoginStyle] = useState([classes.Login, classes['Default']]);

    let loginClass = loginStyle;

    const loginUserHandler = (event) => {
        event.preventDefault()

        setIsLoading(true)

        axios({
            method: 'post',
            url: '/app/users/authentication',
            data: {
                username: userInfo.username,
                password: userInfo.password
            },
        }).then((response) => {
            setIsLoading(false)
            loginClass = loginStyle;

            loginClass.splice(loginClass.indexOf(classes['Loading']))
            setLoginStyle([...loginClass, classes['Close']])
                
            console.log(response.data)
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
                username: userInfo.username,
                password: userInfo.password
            },
        }).then((response) => {
            setIsLoading(false)
            loginClass.splice(loginClass.indexOf(classes['RegisterLoading']))
            setLoginStyle([...loginClass, classes['RegisterLoadingClose']])
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        });
    }

    const userNameUpdateHandler = (event) => {
        let input = event.target.value
        setUserInfo({username: input, password: userInfo.password, isRegisteringUser: userInfo.isRegisteringUser})
    }

    const passwordUpdateHandler = (event) => {
        let input = event.target.value
        setUserInfo({username: userInfo.username, password: input, isRegisteringUser: userInfo.isRegisteringUser})
    }

    const confirmPasswordUpdateHandler = (event) => {
        let input = event.target.value
        setIsMatchingPasswords(input === userInfo.password && (input.length > 0 && userInfo.password.length > 0))
    }

    const selectRegisterUserHandler = () => {
        setUserInfo({username: "", password: "", isRegisteringUser: !userInfo.isRegisteringUser})
    }

    let login = <LoginUser 
            loginHandler={loginUserHandler} 
            updateUsernameHandler={userNameUpdateHandler}
            passwordUpdateHandler={passwordUpdateHandler}
            isDisabled={isLoading}
        />
    
    let loginMessage = 'Don\'t have an account? Register ';

    if (userInfo.isRegisteringUser) {
        login = <LoginRegisterUser
            registerHandler={registerUserhander}
            updateUsernameHandler={userNameUpdateHandler}
            passwordUpdateHandler={passwordUpdateHandler}
            confirmPasswordUpdateHandler={confirmPasswordUpdateHandler}
            isDisabled={(!isMatchingPasswords || !userInfo.username.length > 0 || isLoading)}
        />
        loginMessage = 'Already have an account? Login '
    }

    if (userInfo.isRegisteringUser) {
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

    console.log(loginClass.join(' '))

    if (loginClass.join(' ') !== loginStyle.join(' ')) {
        setLoginStyle(loginClass)
    }

    return (
        <div className={loginStyle.join(' ')}>
            <h1>{userInfo.isRegisteringUser ? 'REGISTER USER' : 'LOGIN PAGE'}</h1>
            {login}
            {isLoading ? <Spinner/> : null}
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