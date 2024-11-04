import { service } from '@/utils/axios'

interface LoginParams {
  username: string
  password: string
}

// User login api
export function loginApi(data: LoginParams): Promise<any> {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}

// Get User info
export function getUserInfo(): Promise<any> {
  return service({
    url: '/getUserInfo',
    method: 'get'
  })
}

// User logout api
export function logoutApi() {
  return service({
    url: '/logout',
    method: 'get'
  })
}

// All Table list
export function getTableAllList(params: any) {
  return service({
    url: '/table/getAllTableList',
    method: 'get',
    params
  })
}

// Table list
export function getTableList(params: any) {
  return service({
    url: '/table/getTableList',
    method: 'get',
    params
  })
}
