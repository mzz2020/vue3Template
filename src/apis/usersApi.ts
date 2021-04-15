import { ApisProp } from '../hooks/useCommon'

const USERS_API: ApisProp = [
  { name: 'addUser', url: '/adduser', method: 'post' },
  { name: 'verificationUser', url: '/verificationuser', method: 'get' },
  { name: 'Login', url: '/login', method: 'post' }
]

export default USERS_API
