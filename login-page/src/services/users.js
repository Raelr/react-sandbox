import axios, { source } from '../axios-users'

const endpoints = {
  AUTHENTICATION_ENDPOINT: '/app/users/authentication',
  RESGISTRATION_ENDPOINT: '/app/users/register',
}

const authenticateUser = async (username, password) => {
  return axios({
    method: 'post',
    url: endpoints.AUTHENTICATION_ENDPOINT,
    data: {
      username,
      password,
    },
    cancelToken: source.token,
  }).catch((error) => {
    console.log(error)
  })
}

const registerUser = async (username, password) => {
  return axios({
    method: 'post',
    url: endpoints.RESGISTRATION_ENDPOINT,
    data: {
      username,
      password,
    },
    cancelToken: source.token,
  })
}

const cancelRequest = () => {
  source.cancel('Request cancelled by user')
}

export default authenticateUser
export { registerUser, cancelRequest }
