import { BASE_URL } from './https'
import { request } from './request'

// 请求方式,一般使用POST
const GET = 'GET'
const POST = 'POST'

// 登录
const login = (params) => {
  return request(POST, BASE_URL + '/login', params)
}


export {
  login
}
