import { lazy } from '@loadable/component'
import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'
import { ExceptionEnum } from '@/enums/exceptionEnum'

// information module page
const TextEditorRoute: RouteObject = {
    path: '/news-flash',
    name: 'NewsFlash',
    element: <LayoutGuard />,
    meta: {
        title: '快讯管理',
        icon: 'form',
        orderNo: 3
    },
    children: [
        {
            path: 'news-flash-list',
            name: 'NewsFlashList',
            element: LazyLoad(lazy(() => import('@/views/news-flash/news-flash-list'))),
            meta: {
                title: '快讯列表',
                key: 'news-flash-list'
            }
        },
        {
            path: 'news-flash-label',
            name: 'NewsFlashLabel',
            element: LazyLoad(lazy(() => import('@/views/news-flash/news-flash-label'))),
            meta: {
                title: '快讯标签',
                key: 'news-flash-label'
            }
        },
        {
            path: 'news-flash-source',
            name: 'NewsFlashSource',
            element: LazyLoad(lazy(() => import('@/views/news-flash/news-flash-source'))),
            meta: {
                title: '快讯源列表',
                key: 'news-flash-source'
            }
        },
    ]
}

export default TextEditorRoute
