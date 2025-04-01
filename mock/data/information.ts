import type { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'
import { resultPageSuccess, resultSuccess } from '../_utils'

const getInformationLableNameById = (id: number) => {
    const informationLabel = ['ETH', 'BTC', 'SOL', 'BNB', 'ADA', 'USDT', 'USDC', 'XRP', 'DOT', 'LTC']
    return {
        id: id,
        label_name: informationLabel[id],
        label_status: Random.boolean(),
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        create_user: Random.cname(),
        update_user: Random.cname(),
    }
}

const getInformationLabel = () => {
    const list: any[] = []
    const len = [3, 4][Number(Random.boolean())]
    for (let key = 0; key < len; key++) {
        const randomNum = Math.floor(Math.random() * 10)
        list.push(getInformationLableNameById(randomNum))
    }
    return list
}

const getInformationSpecialTopicById = (id: number) => {
    return {
        id: id,
        special_topic_name_en: Random.word(10, 20),
        special_topic_name_zh: Random.cword(8, 10),
        special_topic_introduction_en: Random.paragraph(2, 4),
        special_topic_introduction_zh: Random.cparagraph(3, 5),
        special_topic_background_img: Random.image('200x100', '#531dab', '#FFF'),
        special_topic_status: Random.boolean(),
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        create_user: Random.cname(),
        update_user: Random.cname(),
    }
}

const getInformationDetailById = (id: number) => {
    return {
        id: Random.id(),
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        create_user: Random.cname(),
        update_user: Random.cname(),
        information_background_img: Random.image('200x100', '#0000FF', '#FFF'),
        information_title_en: Random.title(3, 5),
        information_title_zh: Random.ctitle(8, 10),
        information_content_en: '<h1 style="text-align: center;"><strong>hello</strong></h1><hr/><p><span style="font-size: 19px;">today is good time.</span></p>',
        information_content_zh: '<h1 style="text-align: center;"><strong>你好</strong></h1><hr/><p><span style="font-size: 19px;">今天是个好日子。</span></p>',
        information_introduction_en: Random.paragraph(2, 4),
        information_introduction_zh: Random.cparagraph(3, 5),
        information_special_topic: getInformationSpecialTopicById(id),
        information_status: Random.boolean(),
        information_label: getInformationLabel(),
    }
}

const getInformationList = () => {
    const list: any[] = []
    for (let index = 0; index < 150; index++) {
        list.push(getInformationDetailById(index))
    }
    return list
}

const getInformationLabelList = () => {
    const list: any[] = []
    for (let index = 0; index < 10; index++) {
        list.push(getInformationLableNameById(index))
    }
    return list
}

const getInformationSpecialTopicList = () => {
    const list: any[] = []
    for (let index = 0; index < 10; index++) {
        list.push(getInformationSpecialTopicById(index))
    }
    return list
}


export default [
    {
        url: '/api/information/getInformationList',
        timeout: 200,
        method: 'get',
        response: ({ query }) => {
            const { current = 1, pageSize = 10 } = query
            return resultPageSuccess(current, pageSize, getInformationList())
        }
    },
    {
        url: '/api/information/getInformationDetailById',
        timeout: 200,
        method: 'get',
        response: ({ query }) => {
            const { id } = query
            return resultSuccess(getInformationDetailById(id))
        }
    },
    {
        url: '/api/information/getInformationLabelList',
        timeout: 200,
        method: 'get',
        response: ({ query }) => {
            const { current = 1, pageSize = 10 } = query
            return resultPageSuccess(current, pageSize, getInformationLabelList())
        }
    },
    {
        url: '/api/information/getInformationSpecialTopicList',
        timeout: 200,
        method: 'get',
        response: ({ query }) => {
            const { current = 1, pageSize = 10 } = query
            return resultPageSuccess(current, pageSize, getInformationSpecialTopicList())
        }
    },
] as MockMethod[]
