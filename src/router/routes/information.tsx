import { lazy } from '@loadable/component'
import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'
import { ExceptionEnum } from '@/enums/exceptionEnum'

// information module page
const TextEditorRoute: RouteObject = {
    path: '/information',
    name: 'Information',
    element: <LayoutGuard />,
    meta: {
        title: '资讯管理',
        icon: 'editor',
        orderNo: 2
    },
    children: [
        {
            path: 'information-content',
            name: 'InformationContent',
            meta: {
                title: '资讯内容管理',
                key: 'information-content',
            },
            children: [
                {
                    path: 'information-list',
                    name: 'InformationList',
                    element: LazyLoad(lazy(() => import('@/views/information/information-content/information-list'))),
                    meta: {
                        title: '资讯列表',
                        key: 'information-list',
                    },
                },
                {
                    path: "information-detail",
                    name: "InformationDetail",
                    element: LazyLoad(lazy(() => import('@/views/information/information-content/information-detail'))),
                    meta: {
                        title: '资讯详情',
                        key: 'information-detail',
                    },
                },
                {
                    path: "information-edit",
                    name: "InformationEdit",
                    element: LazyLoad(lazy(() => import("@/views/information/information-content/information-edit"))),
                    loader: () => ({ id: 0 }),
                    meta: {
                        title: '修改资讯',
                        key: 'information-edit',
                    },
                },
                {
                    path: "information-add",
                    name: "InformationAdd",
                    element: LazyLoad(lazy(() => import("@/views/information/information-content/information-edit"))),
                    loader: () => ({ id: 'add' }),
                    meta: {
                        title: '新增资讯',
                        key: 'information-add',
                    },
                }
            ]
        },
        {
            path: 'information-label',
            name: 'InformationLabel',
            element: LazyLoad(lazy(() => import('@/views/information/information-lable'))),
            loader: () => ({ status: ExceptionEnum.PAGE_NOT_FOUND, withCard: true }),
            meta: {
                title: '资讯标签',
                key: 'information-label',
            },
        },
        {
            path: 'information-special-topic',
            name: 'InformationSpecialTopic',
            element: LazyLoad(lazy(() => import('@/views/information/information-special-topic'))),
            meta: {
                title: '资讯专题',
                key: 'information-special-topic'
            }
        },
    ]
}

export default TextEditorRoute
