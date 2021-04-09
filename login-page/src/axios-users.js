import Axios from 'axios'

const instance = Axios.create({
  baseURL: 'http://localhost:8080',
})

const source = Axios.CancelToken.source()

export default instance
export { source }
