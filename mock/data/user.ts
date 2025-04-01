import type { MockMethod } from 'vite-plugin-mock'
import { type requestParams, resultSuccess, resultError, getRequestToken, resultPageSuccess } from '../_utils'
import { Random } from 'mockjs'

export function createFakeUserList() {
  return [
    {
      userId: '10000',
      username: 'admin',
      realName: 'react admin design',
      avatar: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/avatar.jpeg',
      desc: 'super admin',
      password: '123456',
      token: 'fakeToken',
      homePath: '/home'
    }
  ]
}

const getUserList = () => {
  const list: any[] = []
  for (let index = 0; index < 30; index++) {
    const num = index < 10 ? '0' + index : index
    list.push({
      id: Number(`10${num}`) + 1,
      username: Random.cname(),
      wallet_address: Random.string(10, 20),
      email: Random.email(),
      create_time: Random.datetime(),
      update_time: Random.datetime(),
      like_num: Random.integer(0, 1000),
      collect_num: Random.integer(0, 1000),
      ai_interaction_num: Random.integer(0, 1000),
      user_status: Random.boolean()
    })
  }
  return list
}

// Mock user login
export default [
  {
    url: '/api/login',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = createFakeUserList().find(item => item.username === username && password === item.password)
      if (!checkUser) {
        return resultError('Incorrect account or password!')
      }
      const { userId, username: _username, token, realName, desc } = checkUser
      return resultSuccess({
        userId,
        username: _username,
        token,
        realName,
        desc
      })
    }
  },
  {
    url: '/api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token!')
      const checkUser = createFakeUserList().find(item => item.token === token)
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!')
      }
      return resultSuccess(checkUser)
    }
  },
  {
    url: '/api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token!')
      const checkUser = createFakeUserList().find(item => item.token === token)
      if (!checkUser) {
        return resultError('Invalid token!')
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed!' })
    }
  },
  {
    url: '/api/getUserList',
    method: 'get',
    response: ({ query }) => {
      const { current = 1, pageSize = 10 } = query
      return resultPageSuccess(current, pageSize, getUserList())
    }
  }
] as MockMethod[]
