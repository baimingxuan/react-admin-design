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
            path: 'list',
            name: 'List',
            element: LazyLoad(lazy(() => import('@/views/exception'))),
            loader: () => ({ status: ExceptionEnum.PAGE_NOT_FOUND, withCard: true }),
            meta: {
                title: '资讯列表',
                key: 'information-list',
            }
        },
        {
            path: 'label',
            name: 'Label',
            element: LazyLoad(lazy(() => import('@/views/exception'))),
            loader: () => ({ status: ExceptionEnum.PAGE_NOT_FOUND, withCard: true }),
            meta: {
                title: '资讯标签',
                key: 'information-label',
            },
        },
        {
            path: 'special-topic',
            name: 'SpecialTopic',
            element: LazyLoad(lazy(() => import('@/views/exception'))),
            loader: () => ({ status: ExceptionEnum.PAGE_NOT_FOUND, withCard: true }),
            meta: {
                title: '资讯专题',
                key: 'information-special-topic'
            }
        },
        {
            path: "detail",
            name: "Detail",
            element: LazyLoad(lazy(() => import('@/views/exception'))),
            loader: () => ({ status: ExceptionEnum.PAGE_NOT_FOUND, withCard: true }),
            meta: {
                title: '资讯详情',
                key: 'information-detail',
                hideMenu: true
            },
        },
        {
            path: "new",
            name: "New",
            element: LazyLoad(lazy(() => import('@/views/exception'))),
            loader: () => ({ status: ExceptionEnum.PAGE_NOT_FOUND, withCard: true }),
            meta: {
                title: '新增资讯',
                key: 'information-new',
                hideMenu: true
            },
        }
    ]
}

export default TextEditorRoute
