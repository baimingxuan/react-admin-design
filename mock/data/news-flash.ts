import type { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'
import { resultPageSuccess, resultSuccess } from '../_utils'

const getNewsFlashLabelNameById = (id: number) => {
    const newsFlashLabel = ["News Flash Label 1", "News Flash Label 2", "News Flash Label 3", "News Flash Label 4", "News Flash Label 5", "News Flash Label 6", "News Flash Label 7", "News Flash Label 8", "News Flash Label 9", "News Flash Label 10"]
    return {
        id: id,
        label_name: newsFlashLabel[id],
        label_status: Random.boolean(),
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        create_user: Random.cname(),
        update_user: Random.cname(),
    }
}

const getNewsFlashLabelList = () => {
    const list: any[] = []
    for (let index = 0; index < 10; index++) {
        list.push(getNewsFlashLabelNameById(index))
    }
    return list
}

const getNewsFlashLabel = () => {
    const list: any[] = []
    const len = [1, 2][Number(Random.boolean())]
    for (let key = 0; key < len; key++) {
        const randomNum = Math.floor(Math.random() * 10)
        list.push(getNewsFlashLabelNameById(randomNum))
    }
    return list
}

const getNewsFlashList = () => {
    const list: any[] = []
    for (let index = 0; index < 100; index++) {
        const num = index < 10 ? '0' + index : index
        list.push({
            id: Number(`10${num}`) + 1,
            create_time: Random.datetime(),
            create_user: Random.cname(),
            update_time: Random.datetime(),
            update_user: Random.cname(),
            news_flash_title_en: Random.title(8, 10),
            news_flash_title_zh: Random.ctitle(8, 10),
            news_flash_content_en: Random.paragraph(5, 8),
            news_flash_content_zh: Random.cparagraph(5, 8),
            news_flash_status: Random.boolean(),
            news_flash_label: getNewsFlashLabel(),
            news_flash_source_url: Random.url(),
            news_flash_source_site: getNewsFlashSourceById(Random.integer(1, 20)),
        })
    }
    return list
}

const getNewsFlashSourceById = (id: number) => {
    return {
        id: id,
        last_collect_time: Random.datetime(),
        last_collect_num: Random.integer(1, 10),
        collect_total_num: Random.integer(10, 100),
        source_site_url: Random.url(),
        source_status: Random.boolean(),
    }
}

const getNewsFlashSourceList = () => {
    const list: any[] = []
    for (let index = 0; index < 20; index++) {
        list.push(getNewsFlashSourceById(index))
    }
    return list
}

export default [
    {
        url: '/api/newsFlash/getNewsFlashLabelList',
        timeout: 200,
        method: 'get',
        response: ({ query }) => {
            const { current = 1, pageSize = 10 } = query
            return resultPageSuccess(current, pageSize, getNewsFlashLabelList())
        }
    },
    {
        url: '/api/newsFlash/getNewsFlashList',
        timeout: 200,
        method: 'get',
        response: ({ query }) => {
            const { current = 1, pageSize = 10 } = query
            return resultPageSuccess(current, pageSize, getNewsFlashList())
        }
    },
    {
        url: '/api/newsFlash/getNewsFlashSourceList',
        timeout: 200,
        method: 'get',
        response: ({ query }) => {
            const { current = 1, pageSize = 10 } = query
            return resultPageSuccess(current, pageSize, getNewsFlashSourceList())
        }
    }
] as MockMethod[]
