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

// User list
export function getUserList(params: any) {
  return service({
    url: '/getUserList',
    method: 'get',
    params
  })
}

// home page data
export function getHomeAllList(params: any) {
  return service({
    url: '/home/getAllList',
    method: 'get',
    params
  })
}

// Information list
export function getInformationList(params: any) {
  return service({
    url: '/information/getInformationList',
    method: 'get',
    params
  })
}

// Information label list
export function getInformationLabelList(params: any) {
  return service({
    url: '/information/getInformationLabelList',
    method: 'get',
    params
  })
}

// Information special topic list
export function getInformationSpecialTopicList(params: any) {
  return service({
    url: '/information/getInformationSpecialTopicList',
    method: 'get',
    params
  })
}

// Information detail by id
export function getInformationDetailById(params: { id: number }) {
  return service({
    url: '/information/getInformationDetailById',
    method: 'get',
    params
  })
}

// News Flash label list
export function getNewsFlashLabelList(params: any) {
  return service({
    url: '/newsFlash/getNewsFlashLabelList',
    method: 'get',
    params
  })
}

// News Flash list
export function getNewsFlashList(params: any) {
  return service({
    url: '/newsFlash/getNewsFlashList',
    method: 'get',
    params
  })
}

// News Flash source list
export function getNewsFlashSourceList(params: any) {
  return service({
    url: '/newsFlash/getNewsFlashSourceList',
    method: 'get',
    params
  })
}
