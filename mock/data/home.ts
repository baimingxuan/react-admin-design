import type { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'
import { resultPageSuccess } from '../_utils'

const getRandom400 = () => {
    return Math.floor(Math.random() * 400)
}

const getAllList = () => {
    const list: any[] = []
    for (let index = 0; index < 100; index++) {
        const num = index < 10 ? '0' + index : index
        list.push({
            id: Number(`10${num}`) + 1,
            create_time: Random.datetime(),
            user_number: getRandom400(),
            information_number: getRandom400(),
            news_flash_number: getRandom400(),
            ai_number: getRandom400(),
        })
    }
    return list
}



export default [
    // get home page data
    {
        url: '/api/home/getAllList',
        timeout: 200,
        method: 'get',
        response: ({ query }) => {
            const { current = 1, pageSize = 10 } = query
            return resultPageSuccess(current, pageSize, getAllList())
        }
    }
] as MockMethod[]
